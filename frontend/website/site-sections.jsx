/* ============================================================
   Website UI kit — Pipeline, Gallery, Manifesto, DreamModal
   ============================================================ */

const STEPS = [
  { n: '01', name: 'Capture',  detail: 'récit · voix',     c: 'var(--blob-peach)' },
  { n: '02', name: 'Analyse',  detail: 'vecteur d\'émotion', c: 'var(--blob-sky)' },
  { n: '03', name: 'Mapping',  detail: 'couleur · forme',  c: 'var(--blob-lavender)' },
  { n: '04', name: 'Synthèse', detail: 'image · son · 3D',  c: 'var(--blob-yellow)' },
  { n: '05', name: 'Restitution', detail: 'expérience',     c: 'var(--blob-coral)' },
];

const DREAMS = [
  { title: 'Vol au-dessus des toits', author: '@lune_b', emotion: 'joie',
    glow: 'radial-gradient(circle, #e8c870, #e8a880)',
    bars: [['joie', 72, '#e8c870'], ['énergie', 40, '#e8a880'], ['calme', 18, '#a8c8e8']] },
  { title: 'La maison qui respire', author: '@orphée', emotion: 'mystère',
    glow: 'radial-gradient(circle, #c898d0, #8050a0)',
    bars: [['mystère', 80, '#c898d0'], ['calme', 30, '#a8c8e8'], ['joie', 12, '#e8c870']] },
  { title: 'L\'océan silencieux', author: '@maya.r', emotion: 'calme',
    glow: 'radial-gradient(circle, #a8c8e8, #5070b0)',
    bars: [['calme', 88, '#a8c8e8'], ['sérénité', 54, '#c8d8a0'], ['mystère', 20, '#c898d0']] },
  { title: 'Forêt de verre', author: '@sven', emotion: 'sérénité',
    glow: 'radial-gradient(circle, #c8d8a0, #a8c8e8)',
    bars: [['sérénité', 76, '#c8d8a0'], ['calme', 44, '#a8c8e8'], ['mystère', 22, '#c898d0']] },
  { title: 'Course sans fin', author: '@dario', emotion: 'énergie',
    glow: 'radial-gradient(circle, #e8a880, #f0a890)',
    bars: [['énergie', 84, '#e8a880'], ['joie', 38, '#e8c870'], ['warmth', 26, '#f0a890']] },
  { title: 'Le visage flou', author: '@inès.k', emotion: 'mystère',
    glow: 'radial-gradient(circle, #c898d0, #5070b0)',
    bars: [['mystère', 70, '#c898d0'], ['calme', 36, '#a8c8e8'], ['énergie', 16, '#e8a880']] },
];

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
          <h2>Explorez les rêves de la <em>communauté</em>.</h2>
        </div>
        {(!dreams || dreams.length === 0) && <p className="ds-label" style={{ marginBottom: 20 }}>Chargement des rêves...</p>}
        <div className="gallery-grid">
          {(dreams || []).map((d, i) => (
            <button className="dream-card" key={i} onClick={() => onOpen(d)}>
              <div className="thumb"><div className="glow" style={{ background: d.glow }} /></div>
              <div className="meta">
                <p className="title">{d.title}</p>
                <div className="row">
                  <span className="ds-pill">{d.emotion}</span>
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
          Deep inside, you know what you want — <em>let no one decide that for you</em>.
          Not even your mind.
        </p>
        <div className="by ds-label">Pour les rêveurs · Keep on dreaming</div>
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
                <span className="name">{b[0]}</span>
                <span className="track"><span className="fill" style={{ width: b[1] + '%', background: b[2] }} /></span>
                <span className="pct">{b[1]}%</span>
              </div>
            ))}
          </div>
          <button className="play"><Icon name="play" /> Écouter la restitution</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Pipeline, Gallery, Manifesto, DreamModal, DREAMS, STEPS });
