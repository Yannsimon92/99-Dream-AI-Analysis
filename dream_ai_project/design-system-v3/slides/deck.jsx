/* ============================================================
   Dream AI — Deck app: scaling, nav, keyboard
   ============================================================ */
const { useState, useEffect, useCallback, useRef } = React;

const SLIDES = [
  { C: TitleSlide,    label: 'cartographie des rêves' },
  { C: SectionSlide,  label: '01 — intention' },
  { C: PipelineSlide, label: '02 — pipeline' },
  { C: ApproachSlide, label: '03 — approche' },
  { C: MoodboardSlide,label: '04 — moodboard' },
  { C: QuoteSlide,    label: 'épilogue' },
];

function useScale() {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    function fit() {
      const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
      canvas.style.transform = `translate(-50%, -50%) scale(${s})`;
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
}

function Deck() {
  const total = SLIDES.length;
  const [i, setI] = useState(() => {
    const n = parseInt(new URLSearchParams(location.search).get('s'), 10);
    return Number.isFinite(n) && n >= 0 && n < SLIDES.length ? n : 0;
  });
  useScale();

  const go = useCallback((n) => {
    setI((cur) => {
      const next = Math.max(0, Math.min(total - 1, n));
      const u = new URL(location);
      u.searchParams.set('s', next);
      history.replaceState(null, '', u);
      return next;
    });
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go]);

  return (
    <React.Fragment>
      <div id="stage">
        <div id="canvas">
          <div id="nav">
            <span className="nav-label">{SLIDES[i].label}</span>
            <div id="dots">
              {SLIDES.map((_, n) => (
                <button key={n} className={"dot" + (n === i ? " active" : "")}
                  onClick={() => go(n)} aria-label={`slide ${n + 1}`} />
              ))}
            </div>
            <span className="nav-counter">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>
          <div id="track" style={{ transform: `translateX(-${i * 1280}px)` }}>
            {SLIDES.map((s, n) => {
              const C = s.C;
              return <C key={n} index={n} total={total} active={n === i} />;
            })}
          </div>
        </div>
      </div>
      <button className="arrow prev" onClick={() => go(i - 1)} disabled={i === 0}>‹</button>
      <button className="arrow next" onClick={() => go(i + 1)} disabled={i === total - 1}>›</button>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Deck />);
