/* Pipeline — animated named progress steps during analysis. */

const PIPELINE_STEPS = ['Saisie', 'Embedding', 'Classification', 'Interprétation', 'Rêves voisins'];

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

/* Hook: drives the pipeline forward, calls onDone when finished. */
function usePipeline(active, onDone) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) { setStep(0); return; }
    let i = 0;
    setStep(0);
    const id = setInterval(() => {
      i += 1;
      if (i >= PIPELINE_STEPS.length) {
        clearInterval(id);
        setTimeout(onDone, 500);
      } else {
        setStep(i);
      }
    }, 620);
    return () => clearInterval(id);
  }, [active]);
  return step;
}

Object.assign(window, { PIPELINE_STEPS, Pipeline, usePipeline });
