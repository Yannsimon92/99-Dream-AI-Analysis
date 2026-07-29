/* ============================================================
   Dream AI — Slide archetypes, set B
   ApproachSlide (section blocks) · MoodboardSlide · QuoteSlide
   ============================================================ */

/* 04 — APPROACH (section blocks) */
function ApproachSlide({ index, total, active }) {
  return (
    <SlideFrame index={index} total={total} label="03 — approche" active={active}
      blobs={[
        { color: 'var(--blob-lavender)', size: 340, bottom: -150, left: 60, opacity: 0.4 },
      ]}>
      <Label delay="d1">Approche ML</Label>
      <h2 className="ds-section-title ds-up d2" style={{ margin: '14px 0 6px' }}>
        Trois <span className="ds-em">familles</span> de modèles
      </h2>
      <Divider delay="d3" />
      <div className="ds-up d5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 22 }}>
        <div className="ds-card ds-section-block">
          <span className="ds-block-label is-supervised">Supervisé</span>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink)', margin: '0 0 10px' }}>Classification d'émotion</p>
          <p className="ds-body" style={{ margin: 0, fontSize: 12 }}>Rêves annotés → tags d'émotion et couleur dominante.</p>
        </div>
        <div className="ds-card ds-section-block">
          <span className="ds-block-label is-unsupervised">Non supervisé</span>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink)', margin: '0 0 10px' }}>Clustering de thèmes</p>
          <p className="ds-body" style={{ margin: 0, fontSize: 12 }}>Motifs latents récurrents à travers le corpus.</p>
        </div>
        <div className="ds-card ds-section-block">
          <span className="ds-block-label is-deep">Deep learning</span>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink)', margin: '0 0 10px' }}>Synthèse d'image</p>
          <p className="ds-body" style={{ margin: 0, fontSize: 12 }}>Rêve → visuel génératif et forme 3D.</p>
        </div>
      </div>
    </SlideFrame>
  );
}

/* 05 — MOODBOARD */
function MoodboardSlide({ index, total, active }) {
  const cells = [
    { label: 'chaleur',  grad: 'linear-gradient(150deg,#f0a890,#e8a880)', tall: true },
    { label: 'calme',    grad: 'linear-gradient(150deg,#a8c8e8,#5070b0)' },
    { label: 'mystère',  grad: 'linear-gradient(150deg,#c898d0,#8050a0)' },
    { label: 'joie',     grad: 'linear-gradient(150deg,#e8c870,#e8a880)' },
    { label: 'sérénité', grad: 'linear-gradient(150deg,#c8d8a0,#a8c8e8)' },
  ];
  return (
    <SlideFrame index={index} total={total} label="04 — moodboard" active={active}
      blobs={[
        { color: 'var(--blob-coral)', size: 280, top: -120, right: -40, opacity: 0.4 },
      ]}>
      <Label delay="d1">Émotion → couleur</Label>
      <h2 className="ds-section-title ds-up d2" style={{ margin: '14px 0 18px' }}>
        Le <span className="ds-em">spectre</span> émotionnel
      </h2>
      <div className="ds-moodboard ds-up d5" style={{ maxWidth: 760, gridAutoRows: 130 }}>
        {cells.map((c, i) => (
          <div key={i} className={"ds-mood-item" + (c.tall ? " is-tall" : "")} style={{ background: c.grad }}>
            <span className="ds-mood-label">{c.label}</span>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* 06 — BIG QUOTE */
function QuoteSlide({ index, total, active }) {
  return (
    <SlideFrame index={index} total={total} label="épilogue" active={active}
      blobs={[
        { color: 'var(--blob-sky)',      size: 460, top: -160, left: -120, opacity: 0.45 },
        { color: 'var(--blob-lavender)', size: 360, bottom: -180, right: -60, opacity: 0.4 },
      ]}>
      <div style={{ maxWidth: 820 }}>
        <span className="ds-up d1" style={{ fontFamily: 'var(--serif)', fontSize: 60, color: 'var(--terracotta)', lineHeight: 0.4, display: 'block' }}>“</span>
        <p className="ds-up d2" style={{
          fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 40, lineHeight: 1.25,
          letterSpacing: '-0.01em', color: 'var(--ink)', margin: '14px 0 0',
        }}>
          Deep inside, you know what you want — let no one decide that for you.
          Not even <span className="ds-em">your mind</span>.
        </p>
        <div className="ds-up d5 ds-detail" style={{ marginTop: 34 }}>POUR LES RÊVEURS · KEEP ON DREAMING</div>
      </div>
    </SlideFrame>
  );
}

Object.assign(window, { ApproachSlide, MoodboardSlide, QuoteSlide });
