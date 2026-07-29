/* App — orchestrates compose → analyzing → results, plus a history view. */

/* Fake analyzer: picks a type + interpretation from the text. */
function analyze(text) {
  const t = text.toLowerCase();
  let type = 'lucid', interp;
  if (/(volai|vol |contrôl|conscient|je décidais|lucid)/.test(t)) type = 'lucid';
  else if (/(tomb|poursui|noir|piég|angoiss|cauchemar|monstre)/.test(t)) type = 'nightmare';
  else if (/(enfance|maison|grand-mère|ancien|souvenir|train)/.test(t)) type = 'nostalgic';
  else if (/(absurde|bizarre|sucre|escalier|impossible|étrange)/.test(t)) type = 'absurd';
  else if (/(lumière|joie|calme|douce|heureux|sourire|jardin)/.test(t)) type = 'positive';

  const INTERPS = {
    nightmare: ['Le rêve rejoue une ', 'perte de contrôle', " que la veille n'a pas tout à fait digérée."],
    lucid: ['Tu sembles chercher un ', 'contrôle', " sur une situation qui t'échappe — le vol évoque un désir de prise de hauteur."],
    nostalgic: ['Le rêve te ramène vers un ', 'lieu sûr', ', et ses espaces familiers qui se transforment disent un deuil doux du passé.'],
    absurd: ['La logique se relâche pour laisser passer une ', 'vérité oblique', " que l'absurde protège autant qu'il révèle."],
    positive: ['Une ', 'légèreté', ' traverse la scène : le rêve consolide un sentiment de sécurité retrouvé.'],
  };
  const [pre, accent, post] = INTERPS[type];
  const confidence = 74 + (text.length % 21);
  return {
    type,
    confidence: Math.min(confidence, 96),
    interp: <React.Fragment>{pre}<span className="accent">{accent}</span>{post}</React.Fragment>,
    latent: { x: 52, y: 44, label: '« ' + (text.trim().split(/\s+/).slice(0, 5).join(' ')) + '… »', type },
  };
}

function HistoryView({ onBack }) {
  return (
    <React.Fragment>
      <header className="hdr">
        <Logo onClick={onBack} />
        <div className="hdr__nav"><Button variant="ghost" icon="arrow-left" onClick={onBack}>Retour</Button></div>
      </header>
      <h2 className="hero__title" style={{ fontSize: 40, margin: '28px 0 6px' }}>Tes rêves récents</h2>
      <div className="section-label">7 derniers jours</div>
      <div className="histlist">
        {NEIGHBOURS.concat([{ title: 'Le jardin sous la pluie', when: 'hier', type: 'positive' }]).map((d, i) => (
          <div className="histitem" key={i}>
            <span className="histitem__dot" style={{ background: DREAM_TYPES[d.type].color }} />
            <span className="histitem__t">{d.title}</span>
            <span className="histitem__d">{d.when}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function App() {
  const [view, setView] = useState('compose'); // compose | analyzing | results | history
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const pipeStep = usePipeline(view === 'analyzing', () => {
    setResult(analyze(text));
    setView('results');
  });

  const reset = () => { setView('compose'); setResult(null); setText(''); };

  return (
    <div className="app">
      <AuroraBg />
      <main className={`app__main ${view === 'results' ? 'app__main--wide' : ''}`}>

        {view === 'compose' && (
          <Composer
            value={text}
            onChange={setText}
            onAnalyze={() => setView('analyzing')}
            onHistory={() => setView('history')}
          />
        )}

        {view === 'analyzing' && (
          <React.Fragment>
            <header className="hdr"><Logo /></header>
            <section className="hero" style={{ paddingBottom: 12 }}>
              <div className="hero__eyebrow">Lecture en cours</div>
              <h1 className="hero__title" style={{ fontSize: 'clamp(30px,5vw,46px)' }}>On écoute ton rêve…</h1>
            </section>
            <div className="card" style={{ background: 'var(--surface)' }}>
              <Pipeline current={pipeStep} />
            </div>
          </React.Fragment>
        )}

        {view === 'results' && result && (
          <React.Fragment>
            <header className="hdr">
              <Logo onClick={reset} />
              <div className="hdr__nav">
                <Button variant="secondary" icon="plus" onClick={reset}>Nouveau rêve</Button>
              </div>
            </header>

            <div className="section-label">Ton rêve</div>
            <p className="result__interp fade-in" style={{ fontSize: 22, color: 'var(--ink-2)', margin: 0 }}>
              « {text.trim()} »
            </p>

            <div className="section-label">Analyse</div>
            <AnalysisResult result={result} />

            <div className="section-label">Classification</div>
            <div className="chips" style={{ justifyContent: 'flex-start' }}>
              {Object.keys(DREAM_TYPES).map((k) => (
                <span key={k} style={{ opacity: k === result.type ? 1 : 0.4 }}>
                  <DreamBadge type={k} />
                </span>
              ))}
            </div>

            <div className="section-label">Espace latent · rêves voisins</div>
            <LatentSpace active={result.latent} />

            <div className="section-label">Rêves les plus proches</div>
            <SimilarDreams dreams={NEIGHBOURS} />
          </React.Fragment>
        )}

        {view === 'history' && <HistoryView onBack={reset} />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
