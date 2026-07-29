/* ============================================================
   Dream AI — Slide archetypes, set A
   TitleSlide · SectionSlide · PipelineSlide
   ============================================================ */

/* 01 — COVER / TITLE */
function TitleSlide({ index, total, active }) {
  return (
    <SlideFrame index={index} total={total} label="cartographie des rêves" active={active}
      blobs={[
        { color: 'var(--blob-peach)',    size: 420, top: -140, right: -60, opacity: 0.5 },
        { color: 'var(--blob-lavender)', size: 360, bottom: -180, left: -40, opacity: 0.45 },
        { color: 'var(--blob-sky)',      size: 260, top: 220, right: 260, opacity: 0.4 },
      ]}>
      <Label delay="d1">Data Science · IA · Dreamcore</Label>
      <h1 className="ds-display ds-up d2" style={{ margin: '18px 0 0', maxWidth: 880 }}>
        Cartographie<br/>des <span className="ds-em">rêves</span>
      </h1>
      <p className="ds-subtitle ds-up d3" style={{ margin: '24px 0 0', maxWidth: 460 }}>
        Analyser un récit de rêve et le transformer en expérience sensorielle — émotion, couleur, son, forme.
      </p>
      <div className="ds-up d5" style={{ display: 'flex', gap: 10, marginTop: 38 }}>
        <span className="ds-pill">#dreamcore</span>
        <span className="ds-pill">#liminalspaces</span>
        <span className="ds-pill">#constellation</span>
      </div>
    </SlideFrame>
  );
}

/* 02 — SECTION HEADER */
function SectionSlide({ index, total, active }) {
  return (
    <SlideFrame index={index} total={total} label="01 — intention" active={active}
      blobs={[
        { color: 'var(--blob-sky)',   size: 380, top: -120, left: -80, opacity: 0.45 },
        { color: 'var(--blob-coral)', size: 300, bottom: -140, right: -40, opacity: 0.4 },
      ]}>
      <Label delay="d1">Section 01</Label>
      <h2 className="ds-section-title ds-up d2" style={{ margin: '16px 0 0', maxWidth: 760 }}>
        Une expérience,<br/>pas un <span className="ds-em">outil</span>.
      </h2>
      <Divider delay="d4" />
      <p className="ds-body ds-up d5" style={{ margin: 0, maxWidth: 520 }}>
        Chaque émotion détectée devient une forme organique floue — un blob de couleur qui respire.
        L'interface doit ressembler à une revue de design onirique, lumineuse et posée.
      </p>
    </SlideFrame>
  );
}

/* 03 — PIPELINE */
function PipelineSlide({ index, total, active }) {
  const steps = [
    { n: '01', name: 'Capture',  detail: 'récit · voix · prompt', c: 'var(--blob-peach)' },
    { n: '02', name: 'Analyse',  detail: 'vecteur d\'émotion',    c: 'var(--blob-sky)' },
    { n: '03', name: 'Mapping',  detail: 'couleur · forme',       c: 'var(--blob-lavender)' },
    { n: '04', name: 'Synthèse', detail: 'image · son · 3D',      c: 'var(--blob-yellow)' },
    { n: '05', name: 'Restitution', detail: 'expérience',         c: 'var(--blob-coral)' },
  ];
  return (
    <SlideFrame index={index} total={total} label="02 — pipeline" active={active}
      blobs={[
        { color: 'var(--blob-sage)', size: 320, top: -130, right: 120, opacity: 0.4 },
      ]}>
      <Label delay="d1">Le pipeline</Label>
      <h2 className="ds-section-title ds-up d2" style={{ margin: '14px 0 6px' }}>
        Du <span className="ds-em">récit</span> au ressenti
      </h2>
      <Divider delay="d3" />
      <div className="ds-pipeline ds-up d5" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginTop: 20 }}>
        {steps.map((s) => (
          <div className="ds-step" key={s.n}>
            <span className="ds-step-num">{s.n}</span>
            <div className="ds-step-blob" style={{ '--c': s.c }} />
            <div className="ds-step-name">{s.name}</div>
            <div className="ds-step-detail">{s.detail}</div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

Object.assign(window, { TitleSlide, SectionSlide, PipelineSlide });
