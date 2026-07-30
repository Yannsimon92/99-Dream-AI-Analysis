/* ============================================================
   App UI kit — shared icons, data, tab bar
   ============================================================ */

function AppIcon({ name, style }) {
  const p = {
    mic: <g><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></g>,
    keyboard: <g><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></g>,
    file: <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></g>,
    home: <g><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g>,
    book: <g><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/></g>,
    plus: <g><path d="M12 5v14M5 12h14"/></g>,
    user: <g><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></g>,
    play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>,
    pause: <g><rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/></g>,
    back: <path d="M15 5l-7 7 7 7"/>,
    close: <g><path d="M6 6l12 12M18 6L6 18"/></g>,
    share: <g><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></g>,
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor" stroke="none"/>,
    sound: <g><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></g>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" style={style}>{p[name]}</svg>
  );
}

// emotion → blob colour (les 7 émotions réelles du modèle, palette Dream AI)
const EMO = {
  joy: '#F7CFA8', sadness: '#6F5FA6', fear: '#AEC0F2',
  anger: '#A8442A', disgust: '#5E8467', surprise: '#C9B6E8', neutral: '#B9AF9F',
};

// emotion → libellé affiché (les clés restent en anglais, pour EMO et le tri)
const EMO_FR = {
  joy: 'joie', sadness: 'tristesse', fear: 'peur',
  anger: 'colère', disgust: 'dégoût', surprise: 'surprise', neutral: 'neutre',
};

const ENTRIES = [
  { title: 'La maison qui respire', date: '28 mai', emo: 'fear', dom: 62,
    bars: [['fear', 62], ['surprise', 34], ['neutral', 18]] },
  { title: 'L\'océan silencieux', date: '26 mai', emo: 'neutral', dom: 70,
    bars: [['neutral', 70], ['joy', 40], ['sadness', 20]] },
  { title: 'Forêt de verre', date: '24 mai', emo: 'surprise', dom: 58,
    bars: [['surprise', 58], ['joy', 44], ['fear', 22]] },
  { title: 'Vol au-dessus des toits', date: '21 mai', emo: 'joy', dom: 72,
    bars: [['joy', 72], ['surprise', 46], ['neutral', 18]] },
  { title: 'Course sans fin', date: '19 mai', emo: 'fear', dom: 84,
    bars: [['fear', 84], ['anger', 30], ['sadness', 22]] },
];

const TABS = [
  { id: 'home', icon: 'home' },
  { id: 'journal', icon: 'book' },
  { id: 'add', icon: 'plus' },
  { id: 'profil', icon: 'user' },
];

function TabBar({ active, onNav }) {
  return (
    <div className="tab-bar">
      {TABS.map(t => (
        <button key={t.id}
          className={"tab" + (t.id === 'add' ? ' add' : '') + (active === t.id ? ' active' : '')}
          onClick={() => onNav(t.id)} aria-label={t.id}>
          <AppIcon name={t.icon} />
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { AppIcon, EMO, EMO_FR, ENTRIES, TABS, TabBar });
