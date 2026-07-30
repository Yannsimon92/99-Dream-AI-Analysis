/* ============================================================
   App UI kit — screens B: Cartographie · Lecture · Journal · Profil
   ============================================================ */

/* ---- CARTOGRAPHIE (result, with variation) --------------------- */
// blob constellation positions for up to 3 emotions
const POS = [
  { top: 70,  left: '32%' },  // dominant (center)
  { top: 18,  left: '64%' },  // upper right
  { top: 170, left: '14%' },  // lower left
];

function ResultScreen({ dream, onBack, onPlay, accent, variant, similarDreams }) {
  const d = dream || ENTRIES[0];
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="app-topbar">
        <div className="app-iconbtn" onClick={onBack}><AppIcon name="back" /></div>
        <span className="app-label">Cartographie</span>
        <div className="app-iconbtn"><AppIcon name="share" /></div>
      </div>
      <div className="app-body has-tabbar" style={{ paddingTop: 12 }}>
        <div className="app-label">{d.date} · ton rêve</div>
        <h1 className="app-title" style={{ marginTop: 8, fontSize: 26 }}>{d.title}</h1>

        {variant === 'bars' ? (
          <div className="map-bars">
            {d.bars.map((b, i) => (
              <div className="eb" key={i}>
                <span className="name">{EMO_FR[b[0]]}</span>
                <span className="track"><span className="fill" style={{ width: b[1] + '%', background: EMO[b[0]] }} /></span>
                <span className="pct">{b[1]}%</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="map-canvas">
            {d.bars.map((b, i) => {
              const size = 80 + b[1] * 1.25;
              return (
                <div className="eb" key={i} style={{
                  width: size, height: size, background: EMO[b[0]],
                  opacity: 0.55, top: POS[i].top, left: POS[i].left,
                  transform: 'translateX(-50%)',
                }}>
                  <span className="lbl">{EMO_FR[b[0]]} {b[1]}%</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="map-dom">
          <div className="app-label">Émotion dominante</div>
          <div className="name" style={{ color: accent }}>{EMO_FR[d.bars[0][0]]}</div>
          <div className="pct">{d.bars[0][1]}% du rêve</div>
        </div>

        {similarDreams && similarDreams.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <div className="app-label" style={{ marginBottom: 8 }}>Rêves similaires</div>
            {similarDreams.map((s, i) => (
              <div className="recent-row" key={i}>
                <div style={{ flex: 1 }}>
                  <div className="t">{s.length > 90 ? s.slice(0, 90) + "…" : s}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- LECTURE --------------------------------------------------- */
function PlayScreen({ dream, onBack, accent }) {
  const d = dream || ENTRIES[0];
  const grad = `radial-gradient(120% 90% at 60% 25%, ${EMO[d.bars[0][0]]}, ${EMO[d.bars[1] ? d.bars[1][0] : d.bars[0][0]]} 55%, #d8c9b8 100%)`;
  const [playing, setPlaying] = React.useState(true);
  return (
    <div className="app-screen">
      <div className="play-hero">
        <div className="img" style={{ background: grad }} />
        <div className="app-blob" style={{ width: 220, height: 220, top: 80, left: -40, background: '#fff', opacity: 0.25, filter: 'blur(60px)' }} />
      </div>
      <div className="play-veil" />
      <div className="app-topbar" style={{ zIndex: 3 }}>
        <div className="app-iconbtn" onClick={onBack}><AppIcon name="back" /></div>
        <div className="app-iconbtn"><AppIcon name="share" /></div>
      </div>
      <div className="play-content">
        <div className="play-tags">
          {d.bars.map((b, i) => <span className="ds-pill" key={i}>{EMO_FR[b[0]]}</span>)}
        </div>
        <h1 className="app-title" style={{ fontSize: 30 }}><em>{d.title}</em></h1>
        <p className="app-sub" style={{ marginTop: 8, fontSize: 14 }}>Restitution sonore · 1 min 24</p>
        <div className="play-controls">
          <div className="play-btn" style={{ background: accent }} onClick={() => setPlaying(p => !p)}>
            <AppIcon name={playing ? 'pause' : 'play'} style={{ width: 22, height: 22, color: 'var(--cream)' }} />
          </div>
          <div className="play-scrub">
            <div className="bar"><i style={{ background: accent }} /></div>
            <div className="time"><span>0:32</span><span>1:24</span></div>
          </div>
          <div className="app-iconbtn" style={{ background: 'transparent', border: 0 }}><AppIcon name="sound" /></div>
        </div>
      </div>
    </div>
  );
}

/* ---- JOURNAL --------------------------------------------------- */
function JournalScreen({ onOpen, accent }) {
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="app-blob" style={{ width: 200, height: 200, top: -60, right: -60, background: 'var(--blob-lavender)' }} />
      <div className="app-topbar">
        <span className="app-label">Journal</span>
        <div className="app-iconbtn"><AppIcon name="sparkle" style={{ stroke: 'none', fill: accent, width: 18, height: 18 }} /></div>
      </div>
      <div className="app-body has-tabbar">
        <h1 className="app-title" style={{ marginTop: 10, marginBottom: 18 }}>Tes <em>rêves</em></h1>
        <div className="journal-month">Mai 2026 · {ENTRIES.length} rêves</div>
        {ENTRIES.map((e, i) => (
          <div className="journal-item" key={i} onClick={() => onOpen(e)}>
            <div className="orb" style={{ background: EMO[e.emo] }} />
            <div style={{ flex: 1 }}>
              <div className="t">{e.title}</div>
              <div className="meta"><span>{e.date}</span><span>·</span><span>{EMO_FR[e.emo]} {e.dom}%</span></div>
            </div>
            <AppIcon name="back" style={{ width: 16, height: 16, stroke: 'var(--ink-35)', transform: 'rotate(180deg)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- PROFIL ---------------------------------------------------- */
function ProfilScreen({ accent }) {
  return (
    <div className="app-screen">
      <div className="grid-bg" />
      <div className="app-blob" style={{ width: 220, height: 220, top: 40, left: '50%', marginLeft: -110, background: 'var(--blob-peach)' }} />
      <div className="app-topbar"><span className="app-label">Profil</span></div>
      <div className="app-body has-tabbar" style={{ textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', margin: '20px auto 0',
          background: 'radial-gradient(circle at 35% 30%, var(--blob-lavender), var(--blob-sky))', filter: 'blur(2px)' }} />
        <h1 className="app-title" style={{ marginTop: 18 }}>Maya R.</h1>
        <p className="app-sub" style={{ marginTop: 6 }}>Rêveuse depuis 142 nuits</p>

        <div style={{ display: 'flex', gap: 12, margin: '26px 0 8px' }}>
          {[['142', 'rêves'], ['calme', 'dominante'], ['68%', 'sérénité']].map((s, i) => (
            <div className="ds-card" key={i} style={{ flex: 1, textAlign: 'center', padding: 16 }}>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: accent }}>{s[0]}</div>
              <div className="app-label" style={{ marginTop: 6, fontSize: 9 }}>{s[1]}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, textAlign: 'left' }}>
          {[
            { label: 'Rappels du matin' },
            { label: 'Confidentialité' },
            { label: 'Exporter mes rêves' },
            { label: 'À propos', href: '../website/index.html' },
          ].map((row, i) => {
            const Tag = row.href ? 'a' : 'div';
            return (
              <Tag className="recent-row" key={i} href={row.href} style={{ justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 300, color: 'var(--ink)' }}>{row.label}</span>
                <AppIcon name="back" style={{ width: 15, height: 15, stroke: 'var(--ink-35)', transform: 'rotate(180deg)' }} />
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ResultScreen, PlayScreen, JournalScreen, ProfilScreen, POS });
