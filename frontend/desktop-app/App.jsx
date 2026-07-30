/* App — orchestrates compose → analyzing → results, plus a history view. */

/* Correspondance entre les types renvoyés par l'API (/analyze) et les clés du kit. */
const TYPE_MAP = {
  cauchemar: 'nightmare',
  lucide: 'lucid',
  nostalgique: 'nostalgic',
  absurde: 'absurd',
  normal: 'positive',
};

const INTERPS = {
  nightmare: ['Le rêve rejoue une ', 'perte de contrôle', " que la veille n'a pas tout à fait digérée."],
  lucid: ['Tu sembles chercher un ', 'contrôle', " sur une situation qui t'échappe — le vol évoque un désir de prise de hauteur."],
  nostalgic: ['Le rêve te ramène vers un ', 'lieu sûr', ', et ses espaces familiers qui se transforment disent un deuil doux du passé.'],
  absurd: ['La logique se relâche pour laisser passer une ', 'vérité oblique', " que l'absurde protège autant qu'il révèle."],
  positive: ['Rien ne s\'y ', 'détache', " particulièrement : ce rêve n'a pas assez de relief pour rentrer dans les autres catégories."],
};

const BLOB_PAIRS = [['rose', 'violet'], ['periwinkle', 'peach'], ['violet', 'rose'], ['peach', 'periwinkle'], ['rose', 'periwinkle']];

/* Appelle la vraie API d'analyse et met la réponse en forme pour l'UI du kit. */
async function analyzeReal(text) {
  const response = await fetch(window.API_BASE + '/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    let message = "Erreur lors de l'analyse.";
    try {
      const err = await response.json();
      message = err.detail || message;
    } catch (e) { /* réponse non-JSON, on garde le message par défaut */ }
    throw new Error(message);
  }

  const data = await response.json();
  const type = TYPE_MAP[data.type] || 'positive';
  const confidence = Math.round(Math.max(...Object.values(data.emotions)) * 100);
  const [pre, accent, post] = INTERPS[type];

  const neighbours = (data.similar_dreams || []).map((t, i) => ({
    title: t.length > 60 ? t.slice(0, 60) + '…' : t,
    when: 'DreamBank',
    blobs: BLOB_PAIRS[i % BLOB_PAIRS.length],
  }));

  return {
    result: {
      type,
      confidence: Math.min(Math.max(confidence, 1), 99),
      interp: <React.Fragment>{pre}<span className="accent">{accent}</span>{post}</React.Fragment>,
      latent: {
        x: 50 + (text.length % 20) - 10,
        y: 50 + ((text.length * 7) % 20) - 10,
        label: '« ' + text.trim().split(/\s+/).slice(0, 5).join(' ') + '… »',
        type,
      },
    },
    neighbours,
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
      <div className="section-label">Derniers rêves</div>
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
  const [neighbours, setNeighbours] = useState(NEIGHBOURS);
  const [analyseError, setAnalyseError] = useState(null);

  const pipeStep = usePipeline(view === 'analyzing');

  useEffect(() => {
    if (view !== 'analyzing') return;
    let cancelled = false;
    analyzeReal(text)
      .then(({ result, neighbours }) => {
        if (cancelled) return;
        setResult(result);
        setNeighbours(neighbours);
        setView('results');
      })
      .catch((err) => {
        if (cancelled) return;
        setAnalyseError(err.message || "Erreur lors de l'analyse.");
        setView('compose');
      });
    return () => { cancelled = true; };
  }, [view]);

  const reset = () => { setView('compose'); setResult(null); setText(''); };

  return (
    <div className="app">
      <AuroraBg />
      <main className={`app__main ${view === 'results' ? 'app__main--wide' : ''}`}>

        {view === 'compose' && (
          <React.Fragment>
            {analyseError && (
              <p style={{ color: 'var(--dream-nightmare)', fontSize: 14, margin: '0 0 12px' }}>{analyseError}</p>
            )}
            <Composer
              value={text}
              onChange={setText}
              onAnalyze={() => { setAnalyseError(null); setView('analyzing'); }}
              onHistory={() => setView('history')}
            />
          </React.Fragment>
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
            <SimilarDreams dreams={neighbours} />
          </React.Fragment>
        )}

        {view === 'history' && <HistoryView onBack={reset} />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
