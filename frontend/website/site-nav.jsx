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
  { id: 'histoire', label: 'Histoire' },
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
          <a className="brand" href="../desktop-app/index.html">
            <span className="mono-mark" />
            <span className="word">Dream <em>AI</em></span>
          </a>
          <div className="nav-links">
            {NAV.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
            <a href="dataset-analysis.html">Données</a>
          </div>
          <a className="nav-cta" href="../desktop-app/index.html">Analyser un rêve</a>
          <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="menu">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>
      <div className={"mobile-drawer" + (open ? " open" : "")}>
        {NAV.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a href="dataset-analysis.html" onClick={() => setOpen(false)}>Données</a>
        <a href="../desktop-app/index.html" onClick={() => setOpen(false)} style={{ color: accent }}>Analyser un rêve →</a>
      </div>
    </React.Fragment>
  );
}

function Hero({ accent }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-orb">
          <div className="b" style={{ width: 240, height: 240, top: 60, left: 120, background: 'var(--blob-peach)' }} />
          <div className="b" style={{ width: 200, height: 200, top: 160, left: 30, background: 'var(--blob-lavender)', animationDelay: '-4s' }} />
        </div>
        <div className="hero-label ds-label">À propos · Science des données · IA</div>
        <h1>L'histoire d'un <em>rêve</em> devenu produit.</h1>
        <p className="sub">
          Ce site raconte comment un corpus de recherche sur les rêves est devenu
          un pipeline d'analyse, puis trois applications. Le produit lui-même
          est ailleurs — ici, on explique comment il a été construit.
        </p>
        <div className="actions">
          <a className="btn-ghost" href="#histoire">Lire l'histoire</a>
          <a className="btn-primary" style={{ background: accent }} href="../desktop-app/index.html">Essayer l'app</a>
          <a className="btn-ghost" href="../app/index.html">Voir la maquette mobile</a>
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
            <span className="word">Dream <em>AI</em></span>
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
            <a href="../desktop-app/index.html">Analyser un rêve</a>
          </div>
          <div className="col">
            <h4>À propos</h4>
            <a href="#histoire">Histoire</a>
            <a href="#manifeste">Manifeste</a>
            <a href="dataset-analysis.html">Données</a>
          </div>
          <div className="col">
            <h4>Projet</h4>
            <a href="https://github.com/Yannsimon92/99-Dream-AI-Analysis" target="_blank" rel="noopener">Code source</a>
            <a href="../app/index.html">Maquette mobile</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Nav, Hero, Footer, NAV });
