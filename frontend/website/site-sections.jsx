/* ============================================================
   Website UI kit — Pipeline, Gallery, Manifesto, DreamModal
   ============================================================ */

// emotion (clé API, anglais) → libellé affiché
const EMO_FR = {
  joy: 'joie', sadness: 'tristesse', fear: 'peur',
  anger: 'colère', disgust: 'dégoût', surprise: 'surprise', neutral: 'neutre',
};

const STEPS = [
  { n: '01', name: 'Capture',  detail: 'récit · voix',     c: 'var(--blob-peach)' },
  { n: '02', name: 'Analyse',  detail: 'vecteur d\'émotion', c: 'var(--blob-sky)' },
  { n: '03', name: 'Cartographie', detail: 'couleur · forme', c: 'var(--blob-lavender)' },
  { n: '04', name: 'Synthèse', detail: 'image · son · 3D',  c: 'var(--blob-yellow)' },
  { n: '05', name: 'Restitution', detail: 'expérience',     c: 'var(--blob-coral)' },
];

const STORY = [
  {
    n: '01',
    t: 'Un corpus, pas une idée en l\'air',
    p: 'Le projet est né pendant un bootcamp Data Science du Wagon, autour d\'une question simple : peut-on transformer le texte brut d\'un rêve en quelque chose de sensible — un type, une émotion, une couleur ? Le point de départ a été DreamBank, un corpus de recherche de plus de 22 000 récits de rêves rassemblés depuis 1897 par des chercheurs de UC Santa Cruz.',
  },
  {
    n: '02',
    t: 'Un pipeline construit couche par couche',
    p: 'Le nettoyage et l\'exploration du dataset sont venus en premier, puis des embeddings sémantiques pour situer chaque rêve dans un espace vectoriel, une classification zero-shot pour identifier son type, et une détection d\'émotions pour en capter la tonalité. Chaque brique a été testée et mesurée avant de passer à la suivante.',
  },
  {
    n: '03',
    t: 'Le local a montré ses limites',
    p: 'Faire tourner trois modèles en mémoire a vite posé un problème très concret : plusieurs gigaoctets de RAM, un frein réel pour un déploiement léger. Le pipeline a été repensé pour appeler les modèles via une API d\'inférence plutôt que de les charger localement — l\'empreinte du service est passée de 1,6 Go à environ 140 Mo.',
  },
  {
    n: '04',
    t: 'Trois interfaces, une seule voix',
    p: 'Une maquette mobile, une application desktop et ce site ont vu le jour en parallèle, avant d\'être unifiés sous une identité visuelle et un vocabulaire communs. Ce que vous voyez ici est la version actuelle d\'un projet qui continue de s\'affiner.',
  },
];

function Story() {
  return (
    <section id="histoire" className="pipeline-sec">
      <div className="container">
        <div className="sec-head">
          <div className="lab ds-label">Histoire</div>
          <h2>Comment le projet a <em>pris forme</em>.</h2>
        </div>
        <div style={{ display: 'grid', gap: 36, maxWidth: 760 }}>
          {STORY.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 20 }}>
              <span className="ds-label" style={{ color: 'var(--terracotta)', flexShrink: 0 }}>{s.n}</span>
              <div>
                <h3 className="ds-feature" style={{ fontSize: 19, marginBottom: 8 }}>{s.t}</h3>
                <p className="ds-body" style={{ maxWidth: '62ch' }}>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DatasetCallout() {
  return (
    <section className="pipeline-sec" style={{ paddingTop: 0 }}>
      <div className="container">
        <a href="dataset-analysis.html" className="hl-card" style={{
          display: 'block', textDecoration: 'none', color: 'inherit',
          border: '1px solid var(--ink-12)', borderRadius: 'var(--radius-card)',
          padding: '32px 36px', background: 'var(--surface)',
        }}>
          <div className="lab ds-label" style={{ marginBottom: 10 }}>Les données derrière le projet</div>
          <h3 className="ds-feature" style={{ fontSize: 22, marginBottom: 8 }}>
            22 400 rêves, 90 séries, un siècle de collecte — explorez le dataset DreamBank →
          </h3>
          <p className="ds-body">
            Statistiques, qualité des données, séries de rêveurs à prioriser : le détail complet
            de l'analyse qui a précédé la construction du pipeline.
          </p>
        </a>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section id="pipeline" className="pipeline-sec">
      <div className="container">
        <div className="sec-head">
          <div className="lab ds-label">Comment ça marche</div>
          <h2>Du <em>récit</em> au ressenti, en cinq temps.</h2>
        </div>
        <div className="pipeline-row">
          {STEPS.map(s => (
            <div className="ds-step" key={s.n}>
              <span className="ds-step-num">{s.n}</span>
              <div className="ds-step-blob" style={{ '--c': s.c }} />
              <div className="ds-step-name">{s.name}</div>
              <div className="ds-step-detail">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpen, dreams }) {
  return (
    <section id="galerie" className="gallery-sec">
      <div className="container">
        <div className="sec-head">
          <div className="lab ds-label">Galerie</div>
          <h2>Le pipeline, appliqué à de <em>vrais</em> rêves.</h2>
        </div>
        {(!dreams || dreams.length === 0) && <p className="ds-label" style={{ marginBottom: 20 }}>Chargement des rêves...</p>}
        <div className="gallery-grid">
          {(dreams || []).map((d, i) => (
            <button className="dream-card" key={i} onClick={() => onOpen(d)}>
              <div className="thumb"><div className="glow" style={{ background: d.glow }} /></div>
              <div className="meta">
                <p className="title">{d.title}</p>
                <div className="row">
                  <span className="ds-pill">{EMO_FR[d.emotion] || d.emotion}</span>
                  <span className="author">{d.author}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifeste" className="manifesto-sec">
      <div className="container">
        <p className="quote">
          Au fond de toi, tu sais ce que tu veux — <em>ne laisse personne d'autre en décider</em>.
          Pas même ton esprit.
        </p>
        <div className="by ds-label">Pour les rêveurs · Continue de rêver</div>
      </div>
    </section>
  );
}

function DreamModal({ dream, onClose }) {
  if (!dream) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="fermer"><Icon name="x" /></button>
        <div className="modal-orb"><div className="glow" style={{ background: dream.glow }} /></div>
        <div className="body">
          <div className="ds-label" style={{ marginBottom: 10 }}>{dream.author}</div>
          <h3>{dream.title}</h3>
          <div className="emotion-bars">
            {dream.bars.map((b, i) => (
              <div className="eb" key={i}>
                <span className="name">{EMO_FR[b[0]] || b[0]}</span>
                <span className="track"><span className="fill" style={{ width: b[1] + '%', background: b[2] }} /></span>
                <span className="pct">{b[1]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Story, DatasetCallout, Pipeline, Gallery, Manifesto, DreamModal, STEPS });
