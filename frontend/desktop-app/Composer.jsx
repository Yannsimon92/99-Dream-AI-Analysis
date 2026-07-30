/* Composer — header + dream textarea + sample chips + CTA. */

function Composer({ value, onChange, onAnalyze, onHistory }) {
  const MAX = 2000;
  return (
    <React.Fragment>
      <header className="hdr">
        <Logo />
        <div className="hdr__nav">
          <a className="btn btn--ghost" href="../website/index.html">
            <Icon name="info" className="ico" />
            À propos
          </a>
          <Button variant="ghost" icon="history" onClick={onHistory}>Historique</Button>
        </div>
      </header>

      <section className="hero">
        <div className="hero__eyebrow">Analyse onirique · espace latent</div>
        <h1 className="hero__title">Les rêves parlent<br/>en images</h1>
        <p className="hero__sub">Raconte ton rêve. On en lit l'émotion, on le situe parmi des milliers d'autres.</p>
      </section>

      <section className="composer">
        <div className="field">
          <textarea
            placeholder="Raconte-moi ton rêve, sans filtre…"
            value={value}
            maxLength={MAX}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="field__bar">
            <span className="field__count">{value.length} / {MAX}</span>
            <Button variant="primary" icon="sparkles" disabled={value.trim().length < 12} onClick={onAnalyze}>
              Analyser mon rêve
            </Button>
          </div>
        </div>

        <div className="chips">
          {SAMPLE_DREAMS.map((d, i) => (
            <button key={i} className="chip" onClick={() => onChange(d.text)}>
              <em>«</em> {d.teaser} <em>»</em>
            </button>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}

window.Composer = Composer;
