/* AnalysisResult — emotion badge, confidence bar, editorial interpretation. */

function AnalysisResult({ result }) {
  return (
    <div className="card fade-in">
      <div className="result__top">
        <DreamBadge type={result.type} />
        <span className="result__conf">confiance · {result.confidence}%</span>
      </div>
      <div className="bartrack">
        <div className="barfill" style={{ width: result.confidence + '%' }} />
      </div>
      <p className="result__interp">{result.interp}</p>
    </div>
  );
}

window.AnalysisResult = AnalysisResult;
