/* Shared primitives, data, and helpers for the Dream AI UI kit. */

const { useState, useEffect, useRef } = React;

/* ---- Dream-type taxonomy (mirrors tokens) ---------------------------- */
const DREAM_TYPES = {
  nightmare:  { label: 'Cauchemar',   color: 'var(--dream-nightmare)',  bg: 'var(--dream-nightmare-bg)',  ink: 'var(--dream-nightmare-ink)' },
  lucid:      { label: 'Rêve lucide', color: 'var(--dream-lucid)',      bg: 'var(--dream-lucid-bg)',      ink: 'var(--dream-lucid-ink)' },
  nostalgic:  { label: 'Nostalgique', color: 'var(--dream-nostalgic)',  bg: 'var(--dream-nostalgic-bg)',  ink: 'var(--dream-nostalgic-ink)' },
  absurd:     { label: 'Absurde',     color: 'var(--dream-absurd)',     bg: 'var(--dream-absurd-bg)',     ink: 'var(--dream-absurd-ink)' },
  positive:   { label: 'Positif',     color: 'var(--dream-positive)',   bg: 'var(--dream-positive-bg)',   ink: 'var(--dream-positive-ink)' },
};

const AURORA = ['var(--aurora-rose)', 'var(--aurora-violet)', 'var(--aurora-periwinkle)', 'var(--aurora-peach)'];

/* Sample dream prompts shown as chips */
const SAMPLE_DREAMS = [
  { teaser: 'Je volais au-dessus de la ville', text: "Je volais au-dessus de ma ville, sans peur. Les rues étaient désertes et la lumière dorée. Quand je voulais descendre, je remontais aussitôt." },
  { teaser: 'Une maison qui change de pièces', text: "J'ouvrais une porte familière mais la pièce derrière n'était jamais la même. Chaque retour révélait un couloir nouveau, calme et un peu inquiétant." },
  { teaser: 'Un escalier sans fin', text: "Je montais un escalier qui ne finissait pas. Plus je montais, plus l'air devenait léger, comme du sucre." },
];

/* Fake corpus of neighbouring dreams */
const NEIGHBOURS = [
  { title: 'La maison qui respire', when: '12 mars', sim: 92, type: 'lucid',     blobs: ['violet', 'rose'] },
  { title: 'Escalier sans fin',     when: '4 févr.', sim: 87, type: 'absurd',    blobs: ['periwinkle', 'peach'] },
  { title: 'Le train de minuit',    when: '22 janv.', sim: 81, type: 'nostalgic', blobs: ['peach', 'rose'] },
];

/* ---- Logo ------------------------------------------------------------ */
function Logo({ onClick }) {
  return (
    <div className="logo" onClick={onClick}>
      <span className="logo__mark" />
      <span className="logo__word">Dream <b>AI</b></span>
    </div>
  );
}

/* ---- Button ---------------------------------------------------------- */
function Button({ variant = 'primary', icon, children, ...props }) {
  return (
    <button className={`btn btn--${variant}`} {...props}>
      {icon && <Icon name={icon} className="ico" />}
      {children}
    </button>
  );
}

/* ---- Icon (Lucide) --------------------------------------------------- */
function Icon({ name, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 }, nameAttr: 'data-lucide' });
    }
  }, [name]);
  return <span ref={ref} className={className} style={{ display: 'inline-flex' }} />;
}

/* ---- Badge ----------------------------------------------------------- */
function DreamBadge({ type }) {
  const t = DREAM_TYPES[type];
  return (
    <span className="badge" style={{ background: t.bg, color: t.ink }}>
      <span className="badge__dot" style={{ background: t.color }} />
      {t.label}
    </span>
  );
}

/* ---- Aurora background ----------------------------------------------- */
function AuroraBg() {
  return (
    <div className="app__aurora">
      <div className="aurora-blob aurora-blob--rose" style={{ width: 380, height: 380, left: -120, top: -80 }} />
      <div className="aurora-blob aurora-blob--periwinkle" style={{ width: 420, height: 420, right: -140, top: 120 }} />
      <div className="aurora-blob aurora-blob--peach" style={{ width: 260, height: 260, left: '40%', bottom: -120, opacity: .4 }} />
    </div>
  );
}

Object.assign(window, { useState, useEffect, useRef, DREAM_TYPES, AURORA, SAMPLE_DREAMS, NEIGHBOURS, Logo, Button, Icon, DreamBadge, AuroraBg });
