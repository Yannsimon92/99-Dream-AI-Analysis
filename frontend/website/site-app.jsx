/* ============================================================
   Website UI kit — App mount + Tweaks
   ============================================================ */
const { useState: useS } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b85040",
  "heroAlign": "left"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [dream, setDream] = useS(null);
  const [dreams, setDreams] = useS([]);

  // drive the global accent so every --terracotta use follows the tweak
  React.useEffect(() => {
    document.documentElement.style.setProperty('--terracotta', t.accent);
  }, [t.accent]);

  React.useEffect(() => {
    fetch("sample-dreams.json")
      .then((r) => r.json())
      .then(setDreams)
      .catch(() => setDreams([]));
  }, []);

  return (
    <div data-hero-align={t.heroAlign}>
      <Nav accent={t.accent} />
      <Hero accent={t.accent} />
      <Pipeline />
      <Gallery onOpen={setDream} dreams={dreams} />
      <Manifesto />
      <Footer accent={t.accent} />
      <DreamModal dream={dream} onClose={() => setDream(null)} />

      <TweaksPanel>
        <TweakSection label="Marque" />
        <TweakColor label="Accent" value={t.accent}
          options={['#b85040', '#5070b0', '#8050a0', '#3f7a63']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Hero" />
        <TweakRadio label="Alignement" value={t.heroAlign}
          options={['left', 'center']}
          onChange={(v) => setTweak('heroAlign', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
