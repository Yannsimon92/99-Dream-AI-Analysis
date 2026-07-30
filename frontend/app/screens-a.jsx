/* ============================================================
   App UI kit — screens A: Accueil · Saisie · Analyse
   ============================================================ */
const { useState: useSt, useEffect: useEf } = React;

/* ---- ACCUEIL --------------------------------------------------- */
function HomeScreen({ onCompose, onOpen, accent }) {
  const today = ENTRIES[0];
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="app-blob" style={{ width: 240, height: 240, top: -70, right: -50, background: EMO[today.emo] }} />
      <div className="app-blob" style={{ width: 180, height: 180, top: 120, left: -60, background: 'var(--blob-peach)' }} />
      <div className="app-topbar">
        <span className="app-label">Mercredi 29 mai</span>
        <div className="app-iconbtn"><AppIcon name="sparkle" style={{ stroke: 'none', fill: accent, width: 18, height: 18 }} /></div>
      </div>
      <div className="app-body has-tabbar">
        <h1 className="app-title" style={{ marginTop: 14 }}>Bonjour, Maya.<br/>Qu'as-tu <em>rêvé</em> ?</h1>

        <div className="home-aura">
          <div className="ring" style={{ width: 210, height: 210 }} />
          <div className="ring" style={{ width: 168, height: 168 }} />
          <div className="core" style={{ background: EMO[today.emo] }} />
          <div className="feel">
            <div className="lab">Aujourd'hui</div>
            <div className="name">{today.emo}</div>
            <div className="pct">{today.dom}%</div>
          </div>
        </div>

        <button className="app-cta" style={{ background: accent, marginTop: 8 }} onClick={onCompose}>
          Raconter un rêve
        </button>

        <div style={{ marginTop: 28 }}>
          <div className="app-label" style={{ marginBottom: 8 }}>Récents</div>
          {ENTRIES.slice(1, 3).map((e, i) => (
            <div className="recent-row" key={i} onClick={() => onOpen(e)}>
              <div className="mini" style={{ background: EMO[e.emo] }} />
              <div style={{ flex: 1 }}>
                <div className="t">{e.title}</div>
                <div className="d">{e.date} · {e.emo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- SAISIE ---------------------------------------------------- */
const SAMPLE = "J'étais dans une maison que je ne connaissais pas. Les murs respiraient lentement, comme vivants. Une porte au fond menait à une pièce remplie de lumière bleue…";

function ComposeScreen({ onBack, onAnalyse, accent, error }) {
  const [text, setText] = useSt("");
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="app-blob" style={{ width: 200, height: 200, bottom: 80, right: -60, background: 'var(--blob-sky)' }} />
      <div className="app-topbar">
        <div className="app-iconbtn" onClick={onBack}><AppIcon name="back" /></div>
        <span className="app-label">Nouveau rêve</span>
        <div className="app-iconbtn" onClick={onBack}><AppIcon name="close" /></div>
      </div>
      <div className="app-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="app-label" style={{ marginTop: 6 }}>Au réveil</div>
        <textarea className="compose-field" value={text} onChange={(e) => setText(e.target.value)} placeholder="Raconte ton rêve, librement…" />
        <div className="compose-tools" style={{ margin: '10px 0 18px' }}>
          <div className="app-iconbtn"><AppIcon name="mic" /></div>
          <div className="app-iconbtn"><AppIcon name="keyboard" /></div>
          <span className="app-label" style={{ marginLeft: 4 }}>ou dicte à voix haute</span>
        </div>
        {error && <div style={{ color: "var(--terracotta)", fontSize: 13, marginBottom: 8 }}>{error}</div>}
        <button className="app-cta" style={{ background: accent, opacity: text.trim() ? 1 : 0.5 }} disabled={!text.trim()} onClick={() => { if (text.trim()) onAnalyse(text); }}>
          Analyser ce rêve
        </button>
      </div>
    </div>
  );
}

/* ---- ANALYSE (loading) ----------------------------------------- */
const STEPS_TXT = ['Capture du récit', 'Extraction des émotions', 'Mapping des couleurs', 'Synthèse sensorielle'];

function AnalyseScreen({ text, onDone, onError }) {
  const [step, setStep] = useSt(0);
  useEf(() => {
    const t1 = setInterval(() => setStep(s => Math.min(s + 1, STEPS_TXT.length - 1)), 700);
    fetch(window.API_BASE + "/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(
            (err) => { onError(err.detail || "Erreur lors de l'analyse."); },
            () => { onError("Erreur lors de l'analyse."); }
          );
        }
        return response.json().then((data) => onDone(data));
      })
      .catch(() => { onError("Impossible de contacter le serveur d'analyse."); });
    return () => { clearInterval(t1); };
  }, []);
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="analyse-wrap">
        <div className="analyse-orb">
          <div className="b" style={{ background: 'var(--blob-lavender)', animationDelay: '0s' }} />
          <div className="b" style={{ background: 'var(--blob-peach)', animationDelay: '-0.8s', opacity: 0.7 }} />
          <div className="b" style={{ background: 'var(--blob-sky)', animationDelay: '-1.6s', opacity: 0.6 }} />
        </div>
        <div>
          <div className="app-sub" style={{ fontSize: 19 }}>Analyse en cours…</div>
          <div className="analyse-step" style={{ marginTop: 12 }}>{STEPS_TXT[step]}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ComposeScreen, AnalyseScreen });
