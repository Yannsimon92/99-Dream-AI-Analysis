/* ============================================================
   App UI kit — main flow controller + Tweaks
   ============================================================ */
const { useState: useState_, useEffect: useEffect_ } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b85040",
  "resultVariant": "blobs"
}/*EDITMODE-END*/;

function apiResultToDream(apiResult) {
  const entries = Object.entries(apiResult.emotions).sort((a, b) => b[1] - a[1]);
  const top3 = entries.slice(0, 3).map(([label, score]) => [label, Math.round(score * 100)]);
  return {
    title: "Rêve " + apiResult.type,
    date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" }),
    emo: top3[0][0],
    dom: top3[0][1],
    bars: top3,
    similarDreams: apiResult.similar_dreams || [],
  };
}

function AppMain() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState_('home');
  const [tab, setTab] = useState_('home');     // last visited tab (for highlight)
  const [dream, setDream] = useState_(ENTRIES[0]);
  const [composedText, setComposedText] = useState_("");
  const [analyseError, setAnalyseError] = useState_(null);

  useEffect_(() => {
    document.documentElement.style.setProperty('--terracotta', t.accent);
  }, [t.accent]);

  const goTab = (id) => {
    if (id === 'add') { setScreen('compose'); return; }
    setTab(id); setScreen(id);
  };
  const open = (e) => { setDream(e); setScreen('result'); };

  const TABBED = ['home', 'journal', 'profil'];
  const showTab = TABBED.includes(screen);

  let view;
  switch (screen) {
    case 'compose':
      view = <ComposeScreen accent={t.accent} error={analyseError} onBack={() => setScreen('home')}
        onAnalyse={(text) => { setComposedText(text); setAnalyseError(null); setScreen('analyse'); }} />; break;
    case 'analyse':
      view = <AnalyseScreen text={composedText}
        onDone={(apiResult) => { setDream(apiResultToDream(apiResult)); setScreen('result'); }}
        onError={(msg) => { setAnalyseError(msg); setScreen('compose'); }} />; break;
    case 'result':
      view = <ResultScreen dream={dream} similarDreams={dream.similarDreams} accent={t.accent} variant={t.resultVariant}
        onBack={() => setScreen(tab)} onPlay={() => setScreen('play')} />; break;
    case 'play':
      view = <PlayScreen dream={dream} accent={t.accent} onBack={() => setScreen('result')} />; break;
    case 'journal':
      view = <JournalScreen accent={t.accent} onOpen={open} />; break;
    case 'profil':
      view = <ProfilScreen accent={t.accent} />; break;
    default:
      view = <HomeScreen accent={t.accent} onCompose={() => setScreen('compose')} onOpen={open} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 28, background: 'var(--cream-bright)' }}>
      <IOSDevice>
        <div style={{ position: 'relative', height: '100%' }}>
          <div key={screen} style={{ position: 'absolute', inset: 0 }}>{view}</div>
          {showTab && <TabBar active={tab} onNav={goTab} />}
        </div>
      </IOSDevice>

      <TweaksPanel>
        <TweakSection label="Marque" />
        <TweakColor label="Accent" value={t.accent}
          options={['#b85040', '#5070b0', '#8050a0', '#3f7a63']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Écran résultat" />
        <TweakRadio label="Cartographie" value={t.resultVariant}
          options={['blobs', 'bars']}
          onChange={(v) => setTweak('resultVariant', v)} />
        <TweakButton label="Revenir à l'accueil" onClick={() => setScreen('home')} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppMain />);
