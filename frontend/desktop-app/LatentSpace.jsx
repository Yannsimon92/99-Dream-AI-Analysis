/* LatentSpace — organic scatter of dream nodes with a floating label on the active one. */

const LATENT_NODES = [
  { x: 38, y: 32, r: 14, type: 'lucid' },
  { x: 62, y: 58, r: 10, type: 'positive' },
  { x: 30, y: 66, r: 11, type: 'absurd' },
  { x: 74, y: 38, r: 9,  type: 'nostalgic' },
  { x: 80, y: 70, r: 8,  type: 'nightmare' },
  { x: 46, y: 78, r: 9,  type: 'positive' },
  { x: 20, y: 44, r: 8,  type: 'lucid' },
];

function LatentSpace({ active }) {
  // active = { x, y, label, type } for the user's dream
  return (
    <div className="latent">
      <div className="latent__ring" style={{ width: 250, height: 250 }} />
      <div className="latent__ring" style={{ width: 150, height: 150 }} />
      <div className="latent__ring" style={{ width: 60, height: 60 }} />
      {LATENT_NODES.map((n, i) => (
        <span key={i} className="lnode"
          style={{ width: n.r, height: n.r, left: n.x + '%', top: n.y + '%', background: DREAM_TYPES[n.type].color }} />
      ))}
      <span className="lnode lnode--active"
        style={{ width: 22, height: 22, left: active.x + '%', top: active.y + '%', background: 'var(--coral-500)' }}>
        <span className="lnode__pop">{active.label}</span>
      </span>
    </div>
  );
}

Object.assign(window, { LATENT_NODES, LatentSpace });
