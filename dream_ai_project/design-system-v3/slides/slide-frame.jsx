/* ============================================================
   Dream AI — Slide frame & shared primitives (JSX)
   Exports SlideFrame, Blob, Footer, Nav helpers to window.
   ============================================================ */
const { useState, useEffect, useCallback } = React;

/* A single decorative blob. Pass color, size, and position. */
function Blob({ color, size, top, left, right, bottom, opacity = 0.45, blur = 80 }) {
  return (
    <div style={{
      position: 'absolute',
      width: size, height: size,
      top, left, right, bottom,
      background: color,
      borderRadius: '50%',
      filter: `blur(${blur}px)`,
      opacity,
      pointerEvents: 'none',
      zIndex: 1,
    }} />
  );
}

/* The slide shell: dot-grid bg (z0) + blobs (z1) + content (z2) + footer. */
function SlideFrame({ children, blobs = [], index, total, label, active }) {
  return (
    <section className="slide" data-screen-label={String(index + 1).padStart(2, '0')}>
      {/* grid bg */}
      <div className="slide-grid" />
      {/* blobs */}
      {blobs.map((b, i) => <Blob key={i} {...b} />)}
      {/* content */}
      <div className={"slide-inner" + (active ? " is-active" : "")}>
        {children}
      </div>
      {/* footer */}
      <div className="slide-footer">
        <span>{label}</span>
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </section>
  );
}

/* Small reusable bits */
function Label({ children, className = "", delay = "d1" }) {
  return <div className={`ds-label ds-up ${delay} ${className}`}>{children}</div>;
}
function Divider({ delay = "d4" }) {
  return <hr className={`ds-divider ds-up ${delay}`} />;
}

Object.assign(window, { Blob, SlideFrame, Label, Divider });
