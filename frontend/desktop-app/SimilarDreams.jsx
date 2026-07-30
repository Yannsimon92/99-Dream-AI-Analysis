/* SimilarDreams — grid of neighbouring dreams with aurora thumbnails. */

function blobColor(name) {
  return { rose: 'var(--aurora-rose)', violet: 'var(--aurora-violet)', periwinkle: 'var(--aurora-periwinkle)', peach: 'var(--aurora-peach)' }[name];
}

function SimilarCard({ dream }) {
  return (
    <div className="simcard">
      <div className="simcard__thumb">
        <div className="simcard__blob" style={{ width: 78, height: 78, left: -10, top: 8, background: blobColor(dream.blobs[0]) }} />
        <div className="simcard__blob" style={{ width: 60, height: 60, right: -8, bottom: -6, background: blobColor(dream.blobs[1]) }} />
      </div>
      <div className="simcard__title">{dream.title}</div>
      <div className="simcard__meta">
        <span className="simcard__when">{dream.when}</span>
        <span className="simcard__sim">{dream.sim}% proche</span>
      </div>
    </div>
  );
}

function SimilarDreams({ dreams }) {
  return (
    <div className="simgrid">
      {dreams.map((d, i) => <SimilarCard key={i} dream={d} />)}
    </div>
  );
}

Object.assign(window, { SimilarCard, SimilarDreams });
