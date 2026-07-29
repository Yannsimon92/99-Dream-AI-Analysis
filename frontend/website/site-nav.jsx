/* ============================================================
   Website UI kit — Nav, Hero, Footer
   ============================================================ */
const { useState, useEffect } = React;

function Icon({ name }) {
  // tiny inline hairline icons (Lucide-style) to stay offline-safe
  const paths = {
    menu: <g><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></g>,
    x: <g><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></g>,
    play: <polygon points="6 4 20 12 6 20 6 4"/>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
  );
}

const NAV = [
  { id: 'pipeline', label: 'Le pipeline' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'manifeste', label: 'Manifeste' },
];

function Nav({ accent }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <nav className="site-nav">
        <div className="inner">
          <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="mono-mark" />
            <span className="word">Cartographie <em>des rêves</em></span>
          </div>
          <div className="nav-links">
            {NAV.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          </div>
          <a className="nav-cta" href="../app/index.html">Analyser un rêve</a>
          <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="menu">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>
      <div className={"mobile-drawer" + (open ? " open" : "")}>
        {NAV.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a href="../app/index.html" onClick={() => setOpen(false)} style={{ color: accent }}>Analyser un rêve →</a>
      </div>
    </React.Fragment>
  );
}

function Hero({ accent }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-orb">
          <div className="b" style={{ width: 300, height: 300, top: 40, left: 90, background: 'var(--blob-peach)' }} />
          <div className="b" style={{ width: 260, height: 260, top: 150, left: 10, background: 'var(--blob-lavender)', animationDelay: '-4s' }} />
          <div className="b" style={{ width: 220, height: 220, top: 0, left: 200, background: 'var(--blob-sky)', animationDelay: '-8s' }} />
        </div>
        <div className="hero-label ds-label">Data Science · IA · Dreamcore</div>
        <h1>Vos rêves, <em>cartographiés</em>.</h1>
        <p className="sub">
          Racontez un rêve. Notre modèle en extrait les émotions et les transforme
          en une expérience sensorielle — couleur, forme, son.
        </p>
        <div className="actions">
          <a className="btn-primary" style={{ background: accent }} href="../app/index.html">Analyser un rêve</a>
          <a className="btn-ghost" href="#pipeline">Voir comment ça marche</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ accent }) {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          <div className="brand" style={{ marginBottom: 14 }}>
            <span className="mono-mark" />
            <span className="word">Cartographie <em>des rêves</em></span>
          </div>
          <div className="ds-detail" style={{ maxWidth: 280, lineHeight: 1.7 }}>
            Une expérience onirique, pas un outil. © 2026
          </div>
        </div>
        <div className="cols">
          <div className="col">
            <h4>Produit</h4>
            <a href="#pipeline">Le pipeline</a>
            <a href="#galerie">Galerie</a>
            <a href="#">Web app</a>
          </div>
          <div className="col">
            <h4>À propos</h4>
            <a href="#manifeste">Manifeste</a>
            <a href="#">Équipe</a>
            <a href="#">Recherche</a>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <a href="#">hello@reves.ai</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Nav, Hero, Footer, NAV });
