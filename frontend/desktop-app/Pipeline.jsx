/* Pipeline — animated named progress steps during analysis. */

const PIPELINE_STEPS = ['Saisie', 'Vectorisation', 'Classification', 'Interprétation', 'Rêves voisins'];

function Pipeline({ current }) {
  // current = index of active step; steps before it are done.
  return (
    <div className="pipe">
      {PIPELINE_STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : '';
        return (
          <React.Fragment key={label}>
            {i > 0 && <div className={`plink ${i <= current ? 'plink--done' : ''}`} />}
            <div className={`pstep ${state ? 'pstep--' + state : ''}`}>
              <span className="pstep__node" />
              <span className="pstep__lbl">{label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* Hook: cycles the visual pipeline step while `active`, holds on the last
   step until `active` turns false. Completion is driven by the real API
   call in App.jsx, not by this timer. */
function usePipeline(active) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    let i = 0;
    setStep(0);
    const id = setInterval(() => {
      i = Math.min(i + 1, PIPELINE_STEPS.length - 1);
      setStep(i);
    }, 620);
    return () => clearInterval(id);
  }, [active]);
  return step;
}

Object.assign(window, { PIPELINE_STEPS, Pipeline, usePipeline });
