# CLAUDE.md — Règles d'orchestration du projet

## Contexte du projet

Ce projet fait partie d'un workflow de développement agentique next-gen
combinant :
- **Claude Code** (toi) comme orchestrateur principal, abonnement Claude Pro
- **OpenCode** comme agent délégué pour les tâches d'implémentation lourdes,
  routé vers des modèles open-weight (GLM, DeepSeek) via deux providers
  distincts : **OpenCode Go** (forfait) et **OpenCode Zen** (pay-as-you-go)
- Un sous-projet sensible, **alpha-lab** (pipeline de recherche de signaux
  de trading en paper trading), qui suit des règles de routage renforcées

## Rôle de Claude Code dans ce projet

Tu es l'orchestrateur, pas nécessairement l'exécutant. Pour toute tâche
d'implémentation non-triviale (>50 lignes, nouveau module, refactor),
suis cette boucle :

1. Réfléchis et établis un plan clair et précis (specs, contraintes,
   fichiers concernés)
2. Délègue l'implémentation à OpenCode (voir règles de routage ci-dessous)
3. Relis systématiquement le résultat produit avant de le considérer terminé
4. Si le résultat est insatisfaisant, précise le correctif et relance une
   délégation ciblée plutôt que de tout réécrire toi-même

Tu restes seul responsable :
- des tâches nécessitant une fiabilité d'exécution stricte (commandes
  shell, opérations destructives, git)
- des revues finales et de la décision "c'est bon" ou "on relance"
- de tout ce qui touche à la logique de trading propriétaire (voir
  routage sensible ci-dessous)

## Protection contre les boucles infinies

**Maximum 2 tentatives de correction par tâche déléguée.**

- Tentative 1 : délégation initiale
- Tentative 2 : une seule relance avec correctif précis si le résultat
  est insatisfaisant
- Après 2 échecs : **STOP**. N'insiste pas une 3e fois. Résume le
  problème rencontré, ce que les deux tentatives ont produit, et demande
  une décision humaine avant de continuer. Ne jamais relancer
  indéfiniment en espérant un meilleur résultat.

## Règles de routage vers OpenCode

### Syntaxe obligatoire : heredoc

Utilise systématiquement la syntaxe heredoc pour transmettre un prompt à
OpenCode, jamais de guillemets simples/doubles imbriqués (source
fréquente de crash bash sur les prompts multi-lignes ou contenant des
caractères spéciaux).

### Cas standard (code générique, scaffolding, non sensible)

```bash
opencode run --model opencode-go/glm-5.2 <<'EOF'
<spec précise et autonome, peut être multi-ligne sans risque>
EOF
```

Utilise `opencode-go/deepseek-v4-flash` pour les tâches légères
(résumés, petits fichiers, formatage), avec la même syntaxe heredoc.

### Cas sensible — projet alpha-lab (logique de trading, signaux, stratégies)

**Ne jamais utiliser Go pour ce projet.** Route exclusivement via Zen :

```bash
opencode run --model opencode/glm-5.2 <<'EOF'
<spec précise et autonome>
EOF
```

Raison : Go route parfois GLM-5.2 via des upstreams hors zero-retention.
Zen garantit un hébergement US et une politique zero-retention sur ses
modèles payants. Ne jamais contourner cette règle même si Go semble
disponible ou moins cher.

### Comportement en cas de dépassement du forfait Go

**Si Go renvoie une erreur de quota dépassé : NE JAMAIS basculer vers
Zen automatiquement.** Ce basculement doit toujours être une décision
humaine explicite, jamais une action silencieuse de ta part.

En cas de quota Go dépassé :

1. Arrête la délégation en cours
2. Signale clairement la situation : "Quota OpenCode Go atteint, tâche
   non déléguée"
3. Propose les options possibles (attendre le mois suivant, utiliser un
   modèle gratuit du panier Go, ou basculer manuellement sur Zen si
   l'utilisateur le décide) sans en activer aucune de ta propre initiative
4. N'utilise en aucun cas Zen comme fallback implicite, même si l'option
   technique "Use balance" est activée au niveau du compte

### Comment rédiger une délégation

- Donne à OpenCode une spec autonome et complète : il ne voit pas
  l'historique de la conversation, contrairement à toi
- Précise les fichiers concernés, les contraintes de style, les tests
  attendus
- Une délégation = une tâche bien scopée, pas un enchaînement de
  sous-tâches implicites

## Boucle de session longue (éviter le cold-start)

Si plusieurs délégations sont prévues dans la même session, démarre un
serveur headless une fois :

```bash
opencode serve --port 4096 &
```

puis attache chaque appel (toujours en heredoc) :

```bash
opencode run --attach http://localhost:4096 <<'EOF'
<spec>
EOF
```

## Budget et coûts

- **Go** : 10$/mois, plafonné — si le plafond est atteint, les modèles
  premium ne sont plus disponibles jusqu'au mois suivant. Voir règle de
  dépassement ci-dessus : jamais de bascule automatique vers Zen.
- **Zen** : payé au token ($1.40/1M input, $4.40/1M output sur GLM-5.2)
  — utilisé par défaut pour l'alpha-lab uniquement. Surveille les coûts
  si le volume de délégations augmente sur ce projet.

## Ce qui ne doit jamais être commité sur GitHub

- Clés API (Claude, Go, Zen, OpenRouter) — via `auth.json` ou variables
  d'environnement uniquement
- Le code de génération de signaux de l'alpha-lab si ce dépôt est public
  (voir `.gitignore` du projet)