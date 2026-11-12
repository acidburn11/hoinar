'use strict';

const DEFAULT_API = 'https://hoinar-api.acidburn11.workers.dev';
const K_TRIPS = 'hoinar.trips';
const K_SETTINGS = 'hoinar.settings';
const INTERESTS = ['istorie', 'arhitectura', 'arta', 'natura', 'religie', 'familie'];
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter'];

const STR = {
  ro: {
    tagline: 'Atractii, program pe zile si harta pentru orice oras.',
    settings: 'Setari', back: 'Inapoi', newTrip: 'Calatorie noua',
    emptyTitle: 'Nicio calatorie salvata.', emptyText: 'Alege un oras si perioada, iar planul pe zile apare aici.',
    needToken: 'Ca sa poti genera planuri, adauga cheia de acces.', openSettings: 'Deschide setarile',
    city: 'Oras', cityPh: 'ex. Gdansk', from: 'De la', to: 'Pana la',
    stay: 'Unde stai', stayPh: 'Adresa sau zona, optional', stayHint: 'Programul fiecarei zile porneste de aici.',
    pace: 'Ritm', relaxed: 'Relaxat', normal: 'Normal', intense: 'Intens', interests: 'Ce te intereseaza',
    i_istorie: 'Istorie', i_arhitectura: 'Arhitectura', i_arta: 'Arta si muzee', i_natura: 'Natura', i_religie: 'Biserici', i_familie: 'Cu copiii',
    generate: 'Genereaza planul', generating: 'Caut atractiile si fac programul...',
    errCity: 'Scrie orasul.', errDates: 'Data de sfarsit e inaintea celei de inceput.', errLong: 'Planul poate avea cel mult 14 zile.',
    errToken: 'Lipseste cheia de acces. Adaug-o in setari.', errBadToken: 'Cheia de acces nu e corecta. Verific-o in setari.',
    errNotFound: 'Nu am gasit orasul sau atractii in jurul lui. Verifica numele orasului.',
    errNetwork: 'Serverul nu raspunde. Verifica conexiunea si incearca din nou.',
    delete: 'Sterge', confirmDelete: 'Stergi calatoria in {city}?',
    stayLabel: 'Cazare', cityCenter: 'Centrul orasului',
    lunch: 'Pauza de pranz', walk: '{n} min pe jos', transit: '{n} min cu transportul',
    rain: 'ploaie {n}%', sunset: 'apus {t}',
    extras: 'Daca mai ai timp', tips: 'Sfaturi', aiPending: 'Se scriu titlurile si sfaturile...',
    closed: 'Inchis in aceasta zi', hours: 'Program', hoursUnknown: 'Necunoscut',
    entry: 'Intrare', paid: 'Cu plata', free: 'Gratuita', likelyPaid: 'Probabil cu plata', unknown: 'Necunoscut',
    navigate: 'Navigheaza', site: 'Site oficial', wikipedia: 'Wikipedia', close: 'Inchide',
    api: 'Adresa serverului', token: 'Cheie de acces', language: 'Limba', save: 'Salveaza', saved: 'Salvat.',
    c_museum: 'Muzeu', c_castle: 'Castel', c_palace: 'Palat', c_gallery: 'Galerie', c_zoo: 'Gradina zoologica',
    c_aquarium: 'Acvariu', c_theme_park: 'Parc de distractii', c_viewpoint: 'Punct de belvedere', c_attraction: 'Atractie',
    c_historic: 'Obiectiv istoric', c_park: 'Parc', c_church: 'Biserica', c_monument: 'Monument',
    theme: 'Tema', themeAuto: 'Automata', themeLight: 'Luminoasa', themeDark: 'Intunecata',
    backup: 'Backup', exportBtn: 'Exporta calatoriile', importBtn: 'Importa din fisier', backupHint: 'Fisierul contine calatoriile si setarile, fara cheia de acces.',
    imported: 'Am importat {n} calatorii.', importErr: 'Fisierul nu e un backup Hoinar valid.',
    steps: '~{n} pasi, {km} pe jos', stepsReal: '{n} pasi, {km} pe jos',
    stepsSaved: 'Am salvat {n} pasi pentru {d}.', stepsNoTrip: 'Nu am gasit nicio calatorie activa pentru ziua asta.',
    countryInfo: 'Info utile: {country}', countryHint: 'Urgente, bani, priza, fraze', emergency: 'Urgente', call: 'Suna la {n}',
    embassy: 'Ambasada Romaniei', embassyHint: 'Vezi pe harta', money: 'Bani', rate: '1 {cur} = {ron} lei', convert: 'Convertor',
    localTime: 'Ora locala', sameTime: 'Aceeasi ora ca in Romania', timeDiff: '{h} h fata de Romania', plugs: 'Priza',
    plugOk: 'Tip {p}. Incarcatoarele din Romania merg fara adaptor.', plugNeed: 'Tip {p}. Ai nevoie de adaptor.',
    langLabel: 'Limba', tipping: 'Bacsis', phrases: 'Fraze utile', goodToKnow: 'Bun de stiut', lei: 'lei',
    moreActions: 'Mai multe', schedule: 'Programul zilei', nearStayHint: 'Celebre si cele mai apreciate', offlineHint: 'Traseul si harta fara internet', offlineSaved: 'Salvata pe telefon',
    calHint: 'Fiecare vizita, cu ora si locul', shareHint: 'Un link pe care il poate deschide oricine', deleteTrip: 'Sterge calatoria',
    edit: 'Editeaza', done: 'Gata', remove: 'Scoate', moveTo: 'Muta in...', addHere: 'Adauga in ziua asta', regen: 'Regenereaza ziua',
    didntFit: '{name} nu a incaput in program, l-am pus la Daca mai ai timp.', noAlternatives: 'Nu mai am alte atractii in zona pentru ziua asta.',
    todayIn: 'Azi in {city}', todayDay: 'ziua {n} din {total}', nextAt: 'Urmeaza la {t}', locate: 'Cat am de mers?', locating: 'Caut locatia...',
    distance: 'Esti la {d}, cam {m} min pe jos.', locErr: 'Nu am putut afla locatia. Verifica permisiunea de localizare pentru Hoinar.', dayDone: 'Programul de azi s-a incheiat.',
    howTo: 'Cum ajung', peron: 'Adresa Peron', peronHint: 'Optional. Daca o completezi, Cum ajung deschide Peron; altfel deschide Apple Maps.',
    offline: 'Salveaza harta pentru offline', offlineProgress: 'Descarc harta: {n} din {total}', offlineDone: 'Harta e salvata pentru offline.', offlineErr: 'Nu am putut descarca toata harta. Incearca din nou cu internet.',
    calendar: 'Adauga in Calendar', calReady: 'Evenimentele sunt gata.', calOpen: 'Deschide in Calendar',
    share: 'Trimite planul', shareReady: 'Linkul e gata. Cine il deschide primeste planul in Hoinar.', shareSend: 'Trimite linkul', copy: 'Copiaza linkul', copied: 'Copiat.',
    preparing: 'Pregatesc...', loadingShared: 'Deschid planul primit...', sharedErr: 'Linkul a expirat sau nu s-a putut deschide.',
    dayN: 'Ziua {n}', dinner: 'Cina', lunchHint: 'Vezi restaurante in apropiere', nearStay: 'Restaurante langa cazare', restNear: 'Restaurante langa {place}',
    famousIn: 'Celebre in {city}', topNear: 'Cele mai apreciate in zona', inArea: 'In zona',
    searching: 'Caut restaurante...', noRest: 'Nu am gasit restaurante in zona.', restSources: 'Surse: {s}',
    price1: 'ieftin', price2: 'pret mediu', price3: 'scump', price4: 'foarte scump',
  },
  en: {
    tagline: 'Sights, a day-by-day plan and a map for any city.',
    settings: 'Settings', back: 'Back', newTrip: 'New trip',
    emptyTitle: 'No saved trips.', emptyText: 'Pick a city and dates, and your day-by-day plan shows up here.',
    needToken: 'Add your access key to create plans.', openSettings: 'Open settings',
    city: 'City', cityPh: 'e.g. Gdansk', from: 'From', to: 'To',
    stay: 'Where you stay', stayPh: 'Address or area, optional', stayHint: 'Each day starts from here.',
    pace: 'Pace', relaxed: 'Relaxed', normal: 'Normal', intense: 'Packed', interests: 'Interests',
    i_istorie: 'History', i_arhitectura: 'Architecture', i_arta: 'Art and museums', i_natura: 'Nature', i_religie: 'Churches', i_familie: 'With kids',
    generate: 'Create plan', generating: 'Finding sights and building your days...',
    errCity: 'Enter a city.', errDates: 'The end date is before the start date.', errLong: 'A plan can cover up to 14 days.',
    errToken: 'Access key missing. Add it in settings.', errBadToken: 'The access key is wrong. Check it in settings.',
    errNotFound: 'Couldn\u2019t find the city or sights around it. Check the city name.',
    errNetwork: 'The server isn\u2019t responding. Check your connection and try again.',
    delete: 'Delete', confirmDelete: 'Delete the {city} trip?',
    stayLabel: 'Your stay', cityCenter: 'City centre',
    lunch: 'Lunch break', walk: '{n} min walk', transit: '{n} min by transit',
    rain: 'rain {n}%', sunset: 'sunset {t}',
    extras: 'If you have time', tips: 'Tips', aiPending: 'Writing titles and tips...',
    closed: 'Closed this day', hours: 'Opening hours', hoursUnknown: 'Unknown',
    entry: 'Entry', paid: 'Paid', free: 'Free', likelyPaid: 'Probably paid', unknown: 'Unknown',
    navigate: 'Directions', site: 'Official site', wikipedia: 'Wikipedia', close: 'Close',
    api: 'Server address', token: 'Access key', language: 'Language', save: 'Save', saved: 'Saved.',
    c_museum: 'Museum', c_castle: 'Castle', c_palace: 'Palace', c_gallery: 'Gallery', c_zoo: 'Zoo',
    c_aquarium: 'Aquarium', c_theme_park: 'Theme park', c_viewpoint: 'Viewpoint', c_attraction: 'Attraction',
    c_historic: 'Historic site', c_park: 'Park', c_church: 'Church', c_monument: 'Monument',
    theme: 'Theme', themeAuto: 'Automatic', themeLight: 'Light', themeDark: 'Dark',
    backup: 'Backup', exportBtn: 'Export trips', importBtn: 'Import from file', backupHint: 'The file contains your trips and settings, without the access key.',
    imported: 'Imported {n} trips.', importErr: 'This file isn\u2019t a valid Hoinar backup.',
    steps: '~{n} steps, {km} on foot', stepsReal: '{n} steps, {km} on foot',
    stepsSaved: 'Saved {n} steps for {d}.', stepsNoTrip: 'No active trip found for that day.',
    countryInfo: 'Useful info: {country}', countryHint: 'Emergency, money, plugs, phrases', emergency: 'Emergency', call: 'Call {n}',
    embassy: 'Embassy of Romania', embassyHint: 'See on map', money: 'Money', rate: '1 {cur} = {ron} RON', convert: 'Converter',
    localTime: 'Local time', sameTime: 'Same time as Romania', timeDiff: '{h} h vs Romania', plugs: 'Plugs',
    plugOk: 'Type {p}. Romanian chargers work without an adapter.', plugNeed: 'Type {p}. You need an adapter.',
    langLabel: 'Language', tipping: 'Tipping', phrases: 'Useful phrases', goodToKnow: 'Good to know', lei: 'RON',
    moreActions: 'More', schedule: 'Schedule', nearStayHint: 'Famous and top rated', offlineHint: 'Your route and map without internet', offlineSaved: 'Saved on this phone',
    calHint: 'Each visit with time and place', shareHint: 'A link anyone can open', deleteTrip: 'Delete trip',
    edit: 'Edit', done: 'Done', remove: 'Remove', moveTo: 'Move to...', addHere: 'Add to this day', regen: 'Rebuild this day',
    didntFit: '{name} didn\u2019t fit the day and moved to If you have time.', noAlternatives: 'No other sights nearby for this day.',
    todayIn: 'Today in {city}', todayDay: 'day {n} of {total}', nextAt: 'Next at {t}', locate: 'How far is it?', locating: 'Getting your location...',
    distance: 'You\u2019re {d} away, about {m} min on foot.', locErr: 'Couldn\u2019t get your location. Check Hoinar\u2019s location permission.', dayDone: 'Today\u2019s plan is done.',
    howTo: 'How to get there', peron: 'Peron address', peronHint: 'Optional. If set, How to get there opens Peron; otherwise Apple Maps.',
    offline: 'Save map for offline', offlineProgress: 'Downloading map: {n} of {total}', offlineDone: 'Map saved for offline.', offlineErr: 'Couldn\u2019t download the whole map. Try again with internet.',
    calendar: 'Add to Calendar', calReady: 'Your events are ready.', calOpen: 'Open in Calendar',
    share: 'Share plan', shareReady: 'The link is ready. Anyone who opens it gets the plan in Hoinar.', shareSend: 'Send link', copy: 'Copy link', copied: 'Copied.',
    preparing: 'Preparing...', loadingShared: 'Opening shared plan...', sharedErr: 'This link has expired or couldn\u2019t be opened.',
    dayN: 'Day {n}', dinner: 'Dinner', lunchHint: 'See nearby restaurants', nearStay: 'Restaurants near your stay', restNear: 'Restaurants near {place}',
    famousIn: 'Famous in {city}', topNear: 'Top rated nearby', inArea: 'Nearby',
    searching: 'Finding restaurants...', noRest: 'No restaurants found nearby.', restSources: 'Sources: {s}',
    price1: 'cheap', price2: 'mid-range', price3: 'pricey', price4: 'very pricey',
  },
};

const load = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
const store = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

const settings = Object.assign(
  { api: DEFAULT_API, token: '', theme: 'auto', peron: 'https://acidburn11.github.io/peron/', lang: (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : 'en' },
  load(K_SETTINGS, {})
);
const trips = load(K_TRIPS, {});
const saveTrips = () => store(K_TRIPS, trips);
const saveSettings = () => store(K_SETTINGS, settings);

if (location.hash.startsWith('#key=')) {
  settings.token = decodeURIComponent(location.hash.slice(5));
  saveSettings();
  history.replaceState(null, '', location.pathname + '#/');
}

const app = document.getElementById('app');
const sheet = document.getElementById('sheet');
const state = { tripId: null, day: 0, edit: false };
let map = null;

const t = (k, v = {}) => (STR[settings.lang]?.[k] ?? STR.en[k] ?? k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? '');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const noDia = (s) => s.replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, (c) => ({ ă: 'a', â: 'a', î: 'i', ș: 's', ş: 's', ț: 't', ţ: 't', Ă: 'A', Â: 'A', Î: 'I', Ș: 'S', Ş: 'S', Ț: 'T', Ţ: 'T' })[c]);
const locale = () => (settings.lang === 'ro' ? 'ro-RO' : 'en-GB');
const fmt = (date, opts) => noDia(new Intl.DateTimeFormat(locale(), { timeZone: 'UTC', ...opts }).format(new Date(`${date}T00:00:00Z`)));
const fmtRange = (a, b) =>
  a === b
    ? fmt(a, { day: 'numeric', month: 'short', year: 'numeric' })
    : `${fmt(a, { day: 'numeric', month: 'short' })} \u2013 ${fmt(b, { day: 'numeric', month: 'short', year: 'numeric' })}`;
const today = () => new Date().toLocaleDateString('sv');
const addDays = (d, n) => {
  const x = new Date(`${d}T00:00:00Z`);
  x.setUTCDate(x.getUTCDate() + n);
  return x.toISOString().slice(0, 10);
};
const dayCount = (a, b) => Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 864e5) + 1;

async function api(path, body, timeout = 60000) {
  if (!settings.token) throw new Error(t('errToken'));
  let r;
  try {
    r = await fetch(settings.api.replace(/\/+$/, '') + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Token': settings.token },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeout),
    });
  } catch {
    throw new Error(t('errNetwork'));
  }
  const data = await r.json().catch(() => ({}));
  if (r.status === 401) throw new Error(t('errBadToken'));
  if (r.status === 404) throw new Error(t('errNotFound'));
  if (!r.ok) throw new Error(data.error || t('errNetwork'));
  return data;
}

async function fetchOsm(plan) {
  const ids = plan.attractions.map((a) => a.id).join('|');
  const q = `[out:json][timeout:20];nwr(around:15000,${plan.geo.lat},${plan.geo.lon})["wikidata"~"^(${ids})$"];out tags;`;
  for (const host of OVERPASS) {
    try {
      const r = await fetch(`${host}?data=${encodeURIComponent(q)}`, { signal: AbortSignal.timeout(25000) });
      if (!r.ok) continue;
      const tags = {};
      for (const e of (await r.json()).elements || []) if (e.tags?.wikidata && !tags[e.tags.wikidata]) tags[e.tags.wikidata] = e.tags;
      return tags;
    } catch {}
  }
  return null;
}

async function createTrip(input) {
  const plan = await api('/plan', { ...input, lang: settings.lang }, 90000);
  const trip = { id: crypto.randomUUID(), created: Date.now(), input: { ...input, lang: settings.lang }, plan, aiByLang: {}, osm: null };
  trips[trip.id] = trip;
  saveTrips();
  state.day = 0;
  location.hash = `#/trip/${trip.id}`;
}

function aiFor(trip) {
  trip.aiByLang ||= {};
  if (trip.ai) {
    trip.aiByLang[trip.input.lang] ||= trip.ai;
    delete trip.ai;
  }
  return trip.aiByLang[settings.lang] || null;
}

const enriching = new Set();
function enrich(trip) {
  const lang = settings.lang;
  const key = `${trip.id}:${lang}`;
  if (enriching.has(key)) return;
  enriching.add(key);
  const p = trip.plan;
  const ai = aiFor(trip);
  const jobs = [];
  if (!ai || !ai.names) {
    const attractions = lang === trip.input.lang ? p.attractions : p.attractions.map((a) => ({ ...a, description: '' }));
    jobs.push(
      api('/enhance', { city: `${p.city}, ${p.country}`, days: p.days, attractions, lang }, 90000)
        .then((res) => (trip.aiByLang[lang] = res))
        .catch(() => {})
    );
  }
  if (!trip.osm) jobs.push(fetchOsm(p).then((osm) => osm && (trip.osm = osm)));
  if (p.attractions.some((a) => a.wikipedia && a.image === undefined)) jobs.push(pageImages(p.attractions));
  for (const j of jobs) {
    j.then(() => {
      saveTrips();
      if (state.tripId === trip.id && location.hash === `#/trip/${trip.id}` && settings.lang === lang) renderTrip(trip, true);
    });
  }
  Promise.allSettled(jobs).then(() => enriching.delete(key));
}

function info(trip, id) {
  const a = trip.plan.attractions.find((x) => x.id === id);
  if (!a) return null;
  const tags = trip.osm?.[id] || {};
  const ai = aiFor(trip);
  return {
    ...a,
    name: ai?.names?.[id] || a.name,
    tags,
    desc: (settings.lang === trip.input.lang ? a.description : '') || ai?.descriptions?.[id] || a.description || '',
    hours: tags.opening_hours || a.openingHours || null,
    site: tags.website || tags['contact:website'] || a.ticket?.officialUrl || null,
  };
}

function entryText(a) {
  const fee = a.tags.fee;
  let s = fee === 'yes' ? t('paid') : fee === 'no' ? t('free') : a.ticket?.likely ? t('likelyPaid') : t('unknown');
  if (a.tags.charge) s += `, ${a.tags.charge}`;
  return s;
}

function hoursText(oh) {
  if (!oh) return t('hoursUnknown');
  if (settings.lang !== 'ro') return oh;
  const map = { Mo: 'Lu', Tu: 'Ma', We: 'Mi', Th: 'Jo', Fr: 'Vi', Sa: 'Sa', Su: 'Du', PH: 'sarbatori', off: 'inchis', closed: 'inchis' };
  return oh.replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su|PH|off|closed)\b/g, (m) => map[m]);
}

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
function hoursOn(oh, date) {
  if (!oh) return undefined;
  if (oh.trim() === '24/7') return [0, 1440];
  const wd = (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7;
  let res;
  let matched = false;
  for (const rule of oh.split(';').map((s) => s.trim()).filter(Boolean)) {
    if (/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|PH|SH|week)\b/.test(rule)) continue;
    const m = rule.match(/^((?:Mo|Tu|We|Th|Fr|Sa|Su)(?:\s*[-,]\s*(?:Mo|Tu|We|Th|Fr|Sa|Su))*)?\s*(.*)$/);
    if (!m) continue;
    const [, spec, rest] = m;
    if (spec && !inDays(spec, wd)) continue;
    if (/^(off|closed)$/i.test(rest.trim())) {
      res = null;
      matched = true;
      continue;
    }
    const times = [...rest.matchAll(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/g)];
    if (!times.length) continue;
    res = [+times[0][1] * 60 + +times[0][2], Math.max(...times.map((x) => +x[3] * 60 + +x[4]))];
    matched = true;
  }
  return matched ? res : undefined;
}
function inDays(spec, wd) {
  return spec
    .replace(/\s/g, '')
    .split(',')
    .some((part) => {
      const [a, b] = part.split('-').map((d) => DAYS.indexOf(d));
      if (b === undefined) return a === wd;
      return a <= b ? wd >= a && wd <= b : wd >= a || wd <= b;
    });
}

const DAY_END = { relaxed: 17 * 60 + 30, normal: 19 * 60, intense: 20 * 60 + 30 };
const toMin = (s) => +s.slice(0, 2) * 60 + +s.slice(3, 5);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const uniq = (a) => [...new Set(a)];
function dist(a, b) {
  const rad = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * rad) / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(((b.lon - a.lon) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
const travelFor = (km) => (km <= 2 ? { min: Math.max(5, Math.round((km / 4.5) * 60)), mode: 'walk' } : { min: Math.round(15 + km * 3), mode: 'transit' });
const fmtKm = (km) => (km < 1 ? `${Math.round(km * 100) * 10}\u00A0m` : `${new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(km)}\u00A0km`);

function tzNow(tz) {
  const d = new Date();
  try {
    return {
      date: d.toLocaleDateString('sv', { timeZone: tz }),
      min: toMin(d.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false })),
    };
  } catch {
    return { date: d.toLocaleDateString('sv'), min: d.getHours() * 60 + d.getMinutes() };
  }
}
const todayIndex = (trip) => trip.plan.days.findIndex((d) => d.date === tzNow(trip.plan.geo?.timezone).date);
const dayIds = (trip, d) => trip.plan.days[d].items.filter((i) => i.type === 'visit').map((i) => i.attractionId);

function buildDay(trip, d, ids) {
  const p = trip.plan;
  const { date, weather } = p.days[d];
  const end = DAY_END[p.pace || trip.input.prefs?.pace] || DAY_END.normal;
  const sunset = weather?.sunset ? toMin(weather.sunset) : null;
  const day = { items: [], t: 9 * 60 + 30, pos: p.stay, lunch: false };
  const left = ids.map((id) => info(trip, id)).filter(Boolean);
  const dropped = [];
  while (left.length) {
    left.sort((a, b) => dist(day.pos, a) - dist(day.pos, b));
    const it = left.shift();
    const tr = travelFor(dist(day.pos, it));
    let arrive = day.t + tr.min;
    const needLunch = !day.lunch && arrive >= 13 * 60;
    if (needLunch) arrive += 60;
    const oh = hoursOn(it.hours, date);
    if (oh && arrive < oh[0]) arrive = oh[0];
    const leave = arrive + it.durationMin;
    if (oh === null || (oh && leave > oh[1]) || leave > end || (!it.indoor && sunset && leave > sunset)) {
      dropped.push(it.id);
      continue;
    }
    if (needLunch) {
      day.items.push({ time: hhmm(day.t), type: 'lunch', durationMin: 60 });
      day.lunch = true;
    }
    day.items.push({ time: hhmm(arrive), type: 'visit', attractionId: it.id, travelMin: tr.min, travelMode: tr.mode });
    day.t = leave;
    day.pos = it;
  }
  if (!day.lunch && day.items.length && day.t >= 12 * 60) {
    day.items.push({ time: hhmm(day.t), type: 'lunch', durationMin: 60 });
    day.t += 60;
  }
  if (day.items.length) day.items.push({ time: hhmm(Math.max(day.t + 15, 18 * 60 + 30)), type: 'dinner', durationMin: 90 });
  p.days[d].items = day.items;
  for (const ai of Object.values(trip.aiByLang || {})) if (ai?.dayTitles) delete ai.dayTitles[date];
  return dropped;
}

function afterEdit(trip, dropped = [], moved = null) {
  const p = trip.plan;
  const scheduled = new Set(p.days.flatMap((_, i) => dayIds(trip, i)));
  p.extras = uniq([...dropped, ...p.extras]).filter((id) => !scheduled.has(id));
  saveTrips();
  renderTrip(trip, true);
  if (moved && dropped.includes(moved)) toast(t('didntFit', { name: info(trip, moved).name }));
}

function removeFromDay(trip, d, id) {
  const dropped = buildDay(trip, d, dayIds(trip, d).filter((x) => x !== id));
  afterEdit(trip, [id, ...dropped]);
}

function moveToDay(trip, from, to, id) {
  let dropped = [];
  if (from != null) dropped = buildDay(trip, from, dayIds(trip, from).filter((x) => x !== id));
  trip.plan.extras = trip.plan.extras.filter((x) => x !== id);
  dropped.push(...buildDay(trip, to, [...dayIds(trip, to), id]));
  afterEdit(trip, dropped, id);
}

function regenerateDay(trip, d) {
  const p = trip.plan;
  const current = dayIds(trip, d);
  const used = new Set(p.days.flatMap((_, i) => (i === d ? [] : dayIds(trip, i))));
  const pts = current.map((id) => info(trip, id)).filter(Boolean);
  const center = pts.length ? { lat: pts.reduce((s, a) => s + a.lat, 0) / pts.length, lon: pts.reduce((s, a) => s + a.lon, 0) / pts.length } : p.stay;
  const n = Math.max(current.length, 4);
  const pool = uniq([...p.extras, ...(p.alternates || [])])
    .filter((id) => !used.has(id) && !current.includes(id))
    .map((id) => info(trip, id))
    .filter((a) => a && dist(center, a) < 3)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, n)
    .map((a) => a.id);
  if (!pool.length) return toast(t('noAlternatives'));
  const pick = [...pool, ...current].slice(0, n);
  const dropped = buildDay(trip, d, pick);
  p.alternates = (p.alternates || []).filter((id) => !pick.includes(id));
  afterEdit(trip, [...dropped, ...current.filter((id) => !pick.includes(id))]);
}

function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 4000);
}

function howToUrl(from, to, toName) {
  if (settings.peron) {
    const u = new URL(settings.peron, location.href);
    u.searchParams.set('from', `${from.lat},${from.lon}`);
    u.searchParams.set('fromName', from.name || '');
    u.searchParams.set('to', `${to.lat},${to.lon}`);
    u.searchParams.set('name', toName);
    return u.href;
  }
  return `https://maps.apple.com/?saddr=${from.lat},${from.lon}&daddr=${to.lat},${to.lon}&dirflg=r`;
}

function tileList(trip) {
  const lon2x = (lon, z) => Math.floor(((lon + 180) / 360) * 2 ** z);
  const lat2y = (lat, z) => {
    const r = (lat * Math.PI) / 180;
    return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z);
  };
  const build = (maxZ) => {
    const set = new Set();
    for (const d of trip.plan.days) {
      const pts = [trip.plan.stay, ...d.items.filter((i) => i.type === 'visit').map((i) => info(trip, i.attractionId)).filter(Boolean)];
      const s = Math.min(...pts.map((x) => x.lat)) - 0.004;
      const n = Math.max(...pts.map((x) => x.lat)) + 0.004;
      const w = Math.min(...pts.map((x) => x.lon)) - 0.006;
      const e = Math.max(...pts.map((x) => x.lon)) + 0.006;
      for (let z = 12; z <= maxZ; z++) {
        for (let x = lon2x(w, z); x <= lon2x(e, z); x++) for (let y = lat2y(n, z); y <= lat2y(s, z); y++) set.add(`${z}/${x}/${y}`);
      }
    }
    return [...set];
  };
  const list = build(16);
  return list.length > 900 ? build(15) : list;
}

async function saveOffline(trip) {
  const tiles = tileList(trip);
  showSheet(`<h2 id="sheet-title" class="sheet-top">${t('offline')}</h2><p class="sub" id="op">${t('offlineProgress', { n: 0, total: tiles.length })}</p>`);
  const cache = await caches.open('hoinar-tiles');
  let done = 0;
  let failed = 0;
  const queue = [...tiles];
  const worker = async () => {
    while (queue.length) {
      const url = `https://tile.openstreetmap.org/${queue.shift()}.png`;
      try {
        if (!(await cache.match(url))) {
          const r = await fetch(url, { mode: 'cors' });
          if (r.ok) await cache.put(url, r);
          else failed++;
        }
      } catch {
        failed++;
      }
      done++;
      const el = document.getElementById('op');
      if (el && done % 10 === 0) el.textContent = t('offlineProgress', { n: done, total: tiles.length });
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (!failed) {
    trip.offline = Date.now();
    saveTrips();
  }
  const el = document.getElementById('op');
  if (el) el.textContent = failed ? t('offlineErr') : t('offlineDone');
}

function buildIcs(trip) {
  const p = trip.plan;
  const tz = p.geo?.timezone;
  const esc2 = (x) => String(x || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const fold = (line) => {
    const out = [];
    for (let i = 0; i < line.length; i += 70) out.push((i ? ' ' : '') + line.slice(i, i + 70));
    return out.join('\r\n');
  };
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const dt = (date, m) => `${date.replace(/-/g, '')}T${hhmm(m).replace(':', '')}00`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hoinar//EN', 'CALSCALE:GREGORIAN', `X-WR-CALNAME:Hoinar ${p.city}`];
  for (const d of p.days) {
    for (const it of d.items) {
      if (it.type !== 'visit') continue;
      const a = info(trip, it.attractionId);
      if (!a) continue;
      const start = toMin(it.time);
      const tzp = tz ? `;TZID=${tz}` : '';
      lines.push(
        'BEGIN:VEVENT',
        `UID:${trip.id}-${d.date}-${a.id}@hoinar`,
        `DTSTAMP:${stamp}`,
        `DTSTART${tzp}:${dt(d.date, start)}`,
        `DTEND${tzp}:${dt(d.date, start + a.durationMin)}`,
        `SUMMARY:${esc2(a.name)}`,
        `LOCATION:${esc2(`${a.name}, ${p.city}`)}`,
        `GEO:${a.lat};${a.lon}`,
        `DESCRIPTION:${esc2(`${a.desc ? a.desc + '\n\n' : ''}https://maps.apple.com/?daddr=${a.lat},${a.lon}`)}`,
        'END:VEVENT'
      );
    }
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n');
}

async function exportCalendar(trip) {
  showSheet(`<h2 id="sheet-title" class="sheet-top">${t('calendar')}</h2><p class="sub">${t('preparing')}</p>`);
  try {
    const r = await api('/ics', { ics: buildIcs(trip) }, 20000);
    showSheet(`<h2 id="sheet-title" class="sheet-top">${t('calendar')}</h2><p class="sub">${t('calReady')}</p><div class="actions"><a class="btn primary" href="${esc(r.url)}" target="_blank" rel="noopener">${t('calOpen')}</a></div>`);
  } catch (e) {
    showSheet(`<h2 id="sheet-title" class="sheet-top">${t('calendar')}</h2><p class="error">${esc(e.message)}</p>`);
  }
}

async function shareTrip(trip) {
  showSheet(`<h2 id="sheet-title" class="sheet-top">${t('share')}</h2><p class="sub">${t('preparing')}</p>`);
  try {
    if (!trip.shareId) {
      const { input, plan, aiByLang, osm } = trip;
      trip.shareId = (await api('/share', { input, plan, aiByLang, osm }, 20000)).id;
      saveTrips();
    }
    const url = `${location.origin}${location.pathname}#share=${trip.shareId}`;
    showSheet(
      `<h2 id="sheet-title" class="sheet-top">${t('share')}</h2><p class="sub">${t('shareReady')}</p><div class="actions">${
        navigator.share ? `<button class="btn primary" id="sh-send" type="button">${t('shareSend')}</button>` : ''
      }<button class="btn" id="sh-copy" type="button">${t('copy')}</button></div>`
    );
    document.getElementById('sh-send')?.addEventListener('click', () => navigator.share({ title: `Hoinar: ${trip.plan.city}`, url }).catch(() => {}));
    document.getElementById('sh-copy').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        toast(t('copied'));
      } catch {
        prompt('', url);
      }
    });
  } catch (e) {
    showSheet(`<h2 id="sheet-title" class="sheet-top">${t('share')}</h2><p class="error">${esc(e.message)}</p>`);
  }
}

async function importShared(id) {
  app.innerHTML = `<header class="bar"><a class="link-btn" href="#/">${t('back')}</a></header><p class="lead">${t('loadingShared')}</p>`;
  try {
    const r = await fetch(`${settings.api.replace(/\/+$/, '')}/share/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error();
    const data = await r.json();
    const existing = Object.values(trips).find((x) => x.sharedFrom === id);
    const trip = existing || { id: crypto.randomUUID(), created: Date.now(), sharedFrom: id, ...data, aiByLang: data.aiByLang || {} };
    trips[trip.id] = trip;
    saveTrips();
    history.replaceState(null, '', `${location.pathname}#/trip/${trip.id}`);
    route();
  } catch {
    app.innerHTML = `<header class="bar"><a class="link-btn" href="#/">${t('back')}</a></header><p class="error">${t('sharedErr')}</p>`;
  }
}

function locate(trip, a) {
  const out = document.getElementById('now-dist');
  if (!navigator.geolocation || !out) return;
  out.textContent = t('locating');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const km = dist({ lat: pos.coords.latitude, lon: pos.coords.longitude }, a);
      out.textContent = t('distance', { d: fmtKm(km), m: Math.max(1, Math.round((km / 4.5) * 60)) });
    },
    () => (out.textContent = t('locErr')),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
  );
}

function route() {
  closeSheet();
  if (map) {
    map.remove();
    map = null;
  }
  document.body.classList.remove('hero-page', 'scrolled');
  const h = location.hash.slice(1) || '/';
  if (h.startsWith('steps=')) return importSteps(h);
  if (h.startsWith('share=')) return importShared(h.slice(6));
  if (h.startsWith('/trip/')) {
    const trip = trips[h.slice(6)];
    if (trip) {
      if (state.tripId !== trip.id) {
        state.day = Math.max(0, todayIndex(trip));
        state.edit = false;
      }
      renderTrip(trip);
      enrich(trip);
      return;
    }
  }
  state.tripId = null;
  if (h === '/new') return renderNew();
  if (h === '/settings') return renderSettings();
  renderHome();
}

const ICON = {
  back: '<path d="m15 18-6-6 6-6"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  edit: '<path d="M12 20h9"/><path d="M16.38 3.62a2.12 2.12 0 0 1 3 3L7.38 18.62a2 2 0 0 1-.85.5l-3.53 1 1-3.53a2 2 0 0 1 .5-.85z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  settings: '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
  walk: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>',
  transit: '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/>',
  food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  nav: '<path d="M3 11 22 2l-9 19-2-8z"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M12 14v4"/><path d="M10 16h4"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  locate: '<path d="M2 12h3"/><path d="M19 12h3"/><path d="M12 2v3"/><path d="M12 19v3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
  tree: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  move: '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
  add: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  remove: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  cloudsun: '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.95 12.65a4 4 0 0 0-5.93-4.13"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  rain: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
  snow: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/>',
  fog: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 17H7"/><path d="M17 21H9"/>',
  storm: '<path d="M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97"/><path d="m13 12-3 5h4l-3 5"/>',
  sunset: '<path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  money: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
};
const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
const CAT_ICON = { park: 'tree', viewpoint: 'mountain', zoo: 'tree' };
const placeholder = (cat) => `<span class="ph">${icon(CAT_ICON[cat] || 'landmark')}</span>`;
const pic = (src, cat, cls = '') => (src ? `<img class="${cls}" src="${esc(src)}" alt="" loading="lazy" decoding="async">` : placeholder(cat));
const daysLabel = (n) => (settings.lang === 'ro' ? (n === 1 ? '1 zi' : `${n} zile`) : n === 1 ? '1 day' : `${n} days`);

function wxIcon(code) {
  if (code === 0) return icon('sun');
  if (code <= 2) return icon('cloudsun');
  if (code === 3) return icon('cloud');
  if (code === 45 || code === 48) return icon('fog');
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return icon('snow');
  if (code >= 95) return icon('storm');
  return icon('rain');
}

async function pageImages(items, size = 640) {
  const byHost = {};
  for (const a of items) {
    if (!a.wikipedia || a.image !== undefined) continue;
    try {
      const u = new URL(a.wikipedia);
      const title = decodeURIComponent(u.pathname.split('/wiki/')[1] || '').replace(/_/g, ' ');
      if (title) (byHost[u.origin] ||= []).push([a, title]);
    } catch {}
  }
  let changed = false;
  for (const [origin, list] of Object.entries(byHost)) {
    for (let i = 0; i < list.length; i += 40) {
      const chunk = list.slice(i, i + 40);
      const p = new URLSearchParams({
        action: 'query', format: 'json', origin: '*', prop: 'pageimages', piprop: 'thumbnail',
        pithumbsize: String(size), pilimit: '50', redirects: '1', titles: chunk.map((x) => x[1]).join('|'),
      });
      try {
        const r = await fetch(`${origin}/w/api.php?${p}`, { signal: AbortSignal.timeout(15000) });
        const q = (await r.json()).query || {};
        const alias = {};
        for (const n of [...(q.normalized || []), ...(q.redirects || [])]) alias[n.from] = n.to;
        const pages = Object.values(q.pages || {});
        for (const [a, title] of chunk) {
          let tt = title;
          for (let k = 0; k < 3 && alias[tt]; k++) tt = alias[tt];
          a.image = pages.find((x) => x.title === tt)?.thumbnail?.source || null;
          changed = true;
        }
      } catch {}
    }
  }
  return changed;
}
const heroImage = (trip) => trip.plan.attractions.find((a) => a.image)?.image || null;

function dayWalkKm(trip, day) {
  let km = 0;
  let any = false;
  for (const it of day.items) {
    if (it.type !== 'visit') continue;
    const a = info(trip, it.attractionId);
    any = true;
    km += it.travelMode === 'walk' ? (it.travelMin * 4.5) / 60 : 0.6;
    if (a) km += a.durationMin * (a.indoor ? 0.012 : 0.02);
  }
  return any ? km + 1 : 0;
}

function applyTheme() {
  const th = settings.theme;
  if (th === 'light' || th === 'dark') document.documentElement.dataset.theme = th;
  else delete document.documentElement.dataset.theme;
}

const tzOffset = (tz) => {
  const d = new Date();
  try {
    return Math.round((new Date(d.toLocaleString('en-US', { timeZone: tz })) - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000);
  } catch {
    return null;
  }
};

function curName(c) {
  try {
    const n = new Intl.DisplayNames([locale()], { type: 'currency' }).of(c.currency);
    if (n && n !== c.currency) return noDia(n);
  } catch {}
  return c.currencyName || c.currency;
}

async function openCountry(trip) {
  const p = trip.plan;
  const head = `<h2 id="sheet-title" class="sheet-top">${esc(t('countryInfo', { country: p.country }))}</h2>`;
  const load = () => api('/country', { code: p.geo?.countryCode, name: p.country, lang: trip.input.lang }, 40000);
  let c = trip.country;
  if (!c) {
    showSheet(`${head}<p class="pending"><span class="spinner"></span>${t('preparing')}</p>`);
    try {
      c = trip.country = { ...(await load()), fetched: Date.now() };
      saveTrips();
    } catch (e) {
      return showSheet(`${head}<p class="error">${esc(e.message)}</p>`);
    }
    if (sheet.hidden) return;
  } else if (Date.now() - (c.fetched || 0) > 12 * 3600e3) {
    load()
      .then((n) => {
        trip.country = { ...n, fetched: Date.now() };
        saveTrips();
      })
      .catch(() => {});
  }

  const nf = new Intl.NumberFormat(locale(), { maximumFractionDigits: 2 });
  const tel = c.emergency.split(/[\s/]+/)[0];
  const facts = [
    `<a class="fact link" href="tel:${esc(tel)}">${icon('phone')}<span><small>${t('emergency')}</small><strong>${esc(c.emergency)}</strong></span>${icon('chev', 'go')}</a>`,
    `<a class="fact link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings.lang === 'ro' ? 'Ambasada Romaniei' : 'Embassy of Romania'} ${c.capital || p.country}`)}" target="_blank" rel="noopener">${icon(
      'landmark'
    )}<span><small>${t('embassy')}</small>${t('embassyHint')}</span>${icon('chev', 'go')}</a>`,
  ];
  if (c.currency) {
    facts.push(
      `<div class="fact">${icon('money')}<span><small>${t('money')}</small>${esc(curName(c))}${c.currencySymbol ? ` (${esc(c.currencySymbol)})` : ''}${
        c.rate && c.currency !== 'RON' ? `<br>${t('rate', { cur: c.currency, ron: nf.format(c.rate) })}` : ''
      }${
        c.rate && c.currency !== 'RON'
          ? `<span class="conv"><input id="conv" type="number" inputmode="decimal" value="100" aria-label="${t('convert')}"> ${esc(c.currency)} = <strong id="conv-out">${nf.format(100 * c.rate)}</strong> ${t('lei')}</span>`
          : ''
      }</span></div>`
    );
  }
  const off = p.geo?.timezone ? tzOffset(p.geo.timezone) : null;
  const ro = tzOffset('Europe/Bucharest');
  if (off != null && ro != null) {
    const h = (off - ro) / 60;
    facts.push(`<div class="fact">${icon('clock')}<span><small>${t('localTime')}</small>${h === 0 ? t('sameTime') : t('timeDiff', { h: (h > 0 ? '+' : '\u2212') + nf.format(Math.abs(h)) })}</span></div>`);
  }
  if (c.plugs) {
    const ok = /\b(C|E|F|H|J|K|L|N)\b/.test(c.plugs);
    facts.push(`<div class="fact">${icon('plug')}<span><small>${t('plugs')}</small>${t(ok ? 'plugOk' : 'plugNeed', { p: esc(c.plugs) })}</span></div>`);
  }
  if (c.language) facts.push(`<div class="fact">${icon('chat')}<span><small>${t('langLabel')}</small>${esc(c.language)}</span></div>`);
  if (c.tipping) facts.push(`<div class="fact">${icon('money')}<span><small>${t('tipping')}</small>${esc(c.tipping)}</span></div>`);

  const phrases = c.phrases?.length
    ? `<h3 class="rhead">${t('phrases')}</h3><ul class="phrases">${c.phrases
        .map((x) => `<li><span class="ph-mean">${esc(x.meaning)}</span><strong>${esc(x.local)}</strong>${x.say ? `<small>${esc(x.say)}</small>` : ''}</li>`)
        .join('')}</ul>`
    : '';
  const notes = c.notes?.length ? `<h3 class="rhead">${t('goodToKnow')}</h3><ul class="notes">${c.notes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
  showSheet(`${head}<div class="facts">${facts.join('')}</div>${phrases}${notes}`);
  document.getElementById('conv')?.addEventListener('input', (e) => {
    const v = parseFloat(String(e.target.value).replace(',', '.'));
    document.getElementById('conv-out').textContent = Number.isFinite(v) ? nf.format(v * c.rate) : '\u2013';
  });
}

function importSteps(h) {
  const q = new URLSearchParams(h.replace('steps=', 'n='));
  const n = parseInt(q.get('n'), 10);
  const date = q.get('date');
  if (!Number.isFinite(n) || !date) {
    history.replaceState(null, '', `${location.pathname}#/`);
    return route();
  }
  const trip = Object.values(trips).find((tr) => tr.plan.days.some((d) => d.date === date));
  if (!trip) {
    history.replaceState(null, '', `${location.pathname}#/`);
    route();
    return toast(t('stepsNoTrip'));
  }
  trip.steps ||= {};
  trip.steps[date] = n;
  saveTrips();
  state.day = trip.plan.days.findIndex((d) => d.date === date);
  history.replaceState(null, '', `${location.pathname}#/trip/${trip.id}`);
  route();
  toast(t('stepsSaved', { n: new Intl.NumberFormat(locale()).format(n), d: fmt(date, { day: 'numeric', month: 'short' }) }));
}

function exportBackup() {
  const data = { app: 'hoinar', version: 1, exported: new Date().toISOString(), settings: { lang: settings.lang, peron: settings.peron, theme: settings.theme }, trips };
  const name = `hoinar-backup-${today()}.json`;
  const file = new File([JSON.stringify(data)], name, { type: 'application/json' });
  if (navigator.canShare?.({ files: [file] })) return navigator.share({ files: [file], title: name }).catch(() => {});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

async function importBackup(file) {
  try {
    const d = JSON.parse(await file.text());
    if (d.app !== 'hoinar' || !d.trips || typeof d.trips !== 'object') throw new Error();
    let n = 0;
    for (const [id, tr] of Object.entries(d.trips)) {
      if (tr?.plan?.days && tr.input) {
        trips[id] = tr;
        n++;
      }
    }
    if (d.settings) {
      for (const k of ['lang', 'peron', 'theme']) if (d.settings[k] != null) settings[k] = d.settings[k];
      saveSettings();
      applyTheme();
    }
    saveTrips();
    renderSettings();
    toast(t('imported', { n }));
  } catch {
    toast(t('importErr'));
  }
}

function renderHome() {
  const list = Object.values(trips).sort((a, b) => b.input.start.localeCompare(a.input.start));
  app.innerHTML = `
    <header class="home-head">
      <h1 class="wordmark">Hoinar</h1>
      <a class="icon-btn" href="#/settings" aria-label="${t('settings')}">${icon('settings')}</a>
    </header>
    <p class="lead">${t('tagline')}</p>
    ${settings.token ? '' : `<a class="notice" href="#/settings">${t('needToken')} <strong>${t('openSettings')}</strong></a>`}
    ${list
      .map((tr) => ({ tr, i: todayIndex(tr) }))
      .filter((x) => x.i >= 0)
      .map(
        ({ tr, i }) =>
          `<a class="today" href="#/trip/${tr.id}">${icon('locate')}<span><strong>${esc(t('todayIn', { city: tr.plan.city }))}</strong><small>${t('todayDay', { n: i + 1, total: tr.plan.days.length })}</small></span>${icon('chev')}</a>`
      )
      .join('')}
    ${
      list.length
        ? `<div class="trip-grid">${list
            .map((tr) => {
              const img = heroImage(tr);
              return `<div class="trip-wrap"><button class="round del" type="button" data-del="${tr.id}" aria-label="${esc(t('deleteTrip'))}">${icon('trash')}</button><a class="trip-card" href="#/trip/${tr.id}">${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : '<span class="tc-fill"></span>'}<span class="tc-text"><strong>${esc(
                tr.plan.city
              )}</strong><small>${fmtRange(tr.input.start, tr.input.end)}, ${daysLabel(tr.plan.days.length)}</small></span></a></div>`;
            })
            .join('')}</div>`
        : `<div class="empty">${icon('globe')}<p><strong>${t('emptyTitle')}</strong></p><p>${t('emptyText')}</p></div>`
    }
    <div class="cta"><a class="btn primary pill" href="#/new">${icon('plus')}${t('newTrip')}</a></div>`;
  app.querySelectorAll('[data-del]').forEach((b) =>
    b.addEventListener('click', () => {
      const tr = trips[b.dataset.del];
      if (!tr || !confirm(t('confirmDelete', { city: tr.plan.city }))) return;
      delete trips[tr.id];
      saveTrips();
      renderHome();
    })
  );
  list.filter((tr) => !heroImage(tr)).forEach((tr) => pageImages(tr.plan.attractions.slice(0, 6)).then((c) => c && (saveTrips(), location.hash.length < 3 && renderHome())));
}

function pageHead(title) {
  return `<header class="page-head"><a class="icon-btn" href="#/" aria-label="${t('back')}">${icon('back')}</a></header><h1 class="page-title">${title}</h1>`;
}

function renderNew() {
  const start = addDays(today(), 1);
  app.innerHTML = `
    ${pageHead(t('newTrip'))}
    <form id="f" novalidate>
      <div class="card form-card">
        <div class="field"><label for="city">${t('city')}</label><input id="city" type="text" autocomplete="off" autocapitalize="words" placeholder="${t('cityPh')}"></div>
        <div class="field row">
          <div><label for="start">${t('from')}</label><input id="start" type="date" value="${start}"></div>
          <div><label for="end">${t('to')}</label><input id="end" type="date" value="${addDays(start, 2)}"></div>
        </div>
        <div class="field last"><label for="stay">${t('stay')}</label><input id="stay" type="text" autocomplete="off" placeholder="${t('stayPh')}"><p class="hint">${t('stayHint')}</p></div>
      </div>
      <fieldset class="field"><legend class="label">${t('pace')}</legend><div class="seg">${['relaxed', 'normal', 'intense']
        .map((p) => `<label><input type="radio" name="pace" value="${p}"${p === 'normal' ? ' checked' : ''}><span>${t(p)}</span></label>`)
        .join('')}</div></fieldset>
      <fieldset class="field"><legend class="label">${t('interests')}</legend><div class="chips">${INTERESTS.map(
        (i) => `<label><input type="checkbox" name="int" value="${i}"><span>${t('i_' + i)}</span></label>`
      ).join('')}</div></fieldset>
      <p class="error" id="err" role="alert"></p>
      <div class="cta"><button class="btn primary pill" id="go" type="submit">${t('generate')}</button></div>
    </form>`;

  const f = document.getElementById('f');
  const err = document.getElementById('err');
  const go = document.getElementById('go');
  document.getElementById('start').addEventListener('change', (e) => {
    const end = document.getElementById('end');
    if (end.value < e.target.value) end.value = e.target.value;
  });
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = {
      city: f.city.value.trim(),
      start: f.start.value,
      end: f.end.value,
      stay: f.stay.value.trim(),
      prefs: { pace: f.pace.value, interests: [...f.querySelectorAll('[name=int]:checked')].map((x) => x.value) },
    };
    err.textContent = '';
    if (!input.city) return (err.textContent = t('errCity'));
    if (!input.start || !input.end || input.end < input.start) return (err.textContent = t('errDates'));
    if (dayCount(input.start, input.end) > 14) return (err.textContent = t('errLong'));
    go.disabled = true;
    go.innerHTML = `<span class="spinner"></span>${t('generating')}`;
    try {
      await createTrip(input);
    } catch (x) {
      err.textContent = x.message;
      go.disabled = false;
      go.textContent = t('generate');
    }
  });
}

function renderTrip(trip, keepScroll = false) {
  const y = window.scrollY;
  state.tripId = trip.id;
  const p = trip.plan;
  if (state.day >= p.days.length) state.day = 0;
  const day = p.days[state.day];
  const ai = aiFor(trip);
  const title = ai?.dayTitles?.[day.date] || (settings.lang === trip.input.lang ? day.title : t('dayN', { n: state.day + 1 }));
  const w = day.weather;
  const stayName = trip.input.stay ? p.stay.label.split(',').slice(0, 2).join(',') : t('cityCenter');
  const hero = heroImage(trip);

  const now = tzNow(p.geo?.timezone);
  const isToday = day.date === now.date;
  const visits = day.items.filter((i) => i.type === 'visit' && info(trip, i.attractionId));
  const next = isToday ? visits.find((i) => toMin(i.time) + info(trip, i.attractionId).durationMin > now.min) : null;
  const moveOpts = (id) =>
    `<label class="chip-btn select">${icon('move')}<select data-move="${id}" aria-label="${t('moveTo')}"><option value="">${t('moveTo')}</option>${p.days
      .map((d, i) => (i === state.day ? '' : `<option value="${i}">${fmt(d.date, { weekday: 'short', day: 'numeric' })}</option>`))
      .join('')}</select></label>`;

  let n = 0;
  let last = { lat: p.stay.lat, lon: p.stay.lon, name: t('stayLabel') };
  const slides = [];
  const rows = [
    `<li class="start"><span></span><span class="rail"><span class="dot">${icon('home')}</span></span><div class="stop-body"><span class="txt"><strong>${t('stayLabel')}</strong><small>${esc(stayName)}</small></span></div></li>`,
  ];
  for (const it of day.items) {
    if (it.type === 'lunch' || it.type === 'dinner') {
      rows.push(
        `<li class="meal"><time>${it.time}</time><span class="rail"><span class="dot">${icon('food')}</span></span><button class="stop-body" type="button" data-near="${last.lat},${last.lon}" data-place="${esc(
          last.name
        )}"><span class="txt"><strong>${t(it.type)}</strong><small class="link">${t('lunchHint')}</small></span>${icon('chev', 'go')}</button></li>`
      );
      continue;
    }
    const a = info(trip, it.attractionId);
    if (!a) continue;
    n++;
    const from = last;
    last = { lat: a.lat, lon: a.lon, name: a.name };
    const closed = hoursOn(a.hours, day.date) === null;
    const how = it.travelMode === 'transit' ? `<a class="leg-link" href="${esc(howToUrl(from, a, a.name))}" target="_blank" rel="noopener">${t('howTo')}</a>` : '';
    rows.push(
      `<li class="leg"><span></span><span class="rail"></span><span class="note">${icon(it.travelMode === 'walk' ? 'walk' : 'transit')}${t(it.travelMode === 'walk' ? 'walk' : 'transit', { n: it.travelMin })}${how}</span></li>`,
      `<li class="stop${next === it ? ' next' : ''}"><time>${it.time}</time><span class="rail"><span class="dot">${n}</span></span><button class="stop-body" type="button" data-id="${a.id}"><span class="thumb">${pic(
        a.image,
        a.category
      )}</span><span class="txt"><strong>${esc(a.name)}</strong><small>${t('c_' + a.category)}, ${a.durationMin} min</small>${closed ? `<em class="warn">${t('closed')}</em>` : ''}</span></button>${
        state.edit
          ? `<span></span><span class="rail"></span><div class="edit-row"><button class="chip-btn" type="button" data-remove="${a.id}">${icon('remove')}${t('remove')}</button>${p.days.length > 1 ? moveOpts(a.id) : ''}</div>`
          : ''
      }</li>`
    );
    slides.push(
      `<button class="slide${next === it ? ' next' : ''}" type="button" data-id="${a.id}"><span class="slide-img">${pic(a.image, a.category)}<span class="badge">${n}</span><span class="time">${icon('clock')}${it.time}</span></span><span class="slide-body"><strong>${esc(
        a.name
      )}</strong><small>${t('c_' + a.category)}, ${a.durationMin} min</small></span></button>`
    );
  }

  const extras = p.extras.map((id) => info(trip, id)).filter(Boolean);
  const tips = ai?.tips || [];
  const nextA = next && info(trip, next.attractionId);

  document.body.classList.add('hero-page');
  app.innerHTML = `
    <header class="hero${hero ? '' : ' no-img'}">
      ${hero ? `<img src="${esc(hero)}" alt="">` : ''}
      <div class="hero-bar">
        <a class="round" href="#/" aria-label="${t('back')}">${icon('back')}</a>
        <span class="hero-actions">
          <button class="round${state.edit ? ' on' : ''}" id="edit" type="button" aria-label="${state.edit ? t('done') : t('edit')}">${icon(state.edit ? 'check' : 'edit')}</button>
          <button class="round" id="more" type="button" aria-label="${t('moreActions')}">${icon('more')}</button>
        </span>
      </div>
      <div class="hero-text"><h1>${esc(p.city)}</h1><p>${fmtRange(trip.input.start, trip.input.end)}, ${esc(p.country)}</p></div>
    </header>
    ${ai?.summary ? `<p class="summary">${esc(ai.summary)}</p>` : ai ? '' : `<p class="pending"><span class="spinner"></span>${t('aiPending')}</p>`}
    <nav class="days" role="tablist">${p.days
      .map(
        (d, i) =>
          `<button role="tab" type="button" aria-selected="${i === state.day}" data-day="${i}"><span class="wd">${fmt(d.date, { weekday: 'short' })}</span><span class="dn">${fmt(d.date, { day: 'numeric' })}</span>${
            d.weather ? `<span class="wx">${wxIcon(d.weather.code)}${Math.round(d.weather.tmax)}\u00B0</span>` : ''
          }</button>`
      )
      .join('')}</nav>
    <section class="day">
      <h2 class="day-title">${esc(title)}</h2>
      ${(() => {
        const parts = [];
        if (w) {
          parts.push(`<span>${wxIcon(w.code)}${Math.round(w.tmin)}\u2013${Math.round(w.tmax)}\u00B0C</span>`, `<span>${icon('drop')}${w.rainProb ?? 0}%</span>`);
          if (w.sunset) parts.push(`<span>${icon('sunset')}${w.sunset}</span>`);
        }
        const real = trip.steps?.[day.date];
        if (real != null) {
          parts.push(`<span>${icon('walk')}${t('stepsReal', { n: new Intl.NumberFormat(locale()).format(real), km: fmtKm(dayWalkKm(trip, day)) })}</span>`);
        } else if (visits.length) {
          const km = dayWalkKm(trip, day);
          const steps = Math.round((km * 1350) / 100) * 100;
          parts.push(`<span>${icon('walk')}${t('steps', { n: new Intl.NumberFormat(locale()).format(steps), km: fmtKm(km) })}</span>`);
        }
        return parts.length ? `<p class="wxline">${parts.join('')}</p>` : '';
      })()}
      ${
        nextA
          ? `<div class="now"><span class="now-img">${pic(nextA.image, nextA.category)}</span><div class="now-body"><small>${t('nextAt', { t: next.time })}</small><strong>${esc(nextA.name)}</strong><small id="now-dist"></small><div class="now-actions"><a class="btn primary small" href="https://maps.apple.com/?daddr=${nextA.lat},${nextA.lon}&dirflg=w" target="_blank" rel="noopener">${icon('nav')}${t('navigate')}</a><button class="btn small" id="locate" type="button" data-target="${nextA.id}">${icon('locate')}${t('locate')}</button></div></div></div>`
          : isToday && visits.length
          ? `<p class="wxline">${t('dayDone')}</p>`
          : ''
      }
      ${slides.length ? `<div class="slides" role="list">${slides.join('')}</div>` : ''}
      <div class="map-card"><div id="map" class="map" role="img" aria-label="${esc(title)}"></div></div>
      <h3 class="sec">${t('schedule')}</h3>
      <ol class="route">${rows.join('')}</ol>
      ${state.edit ? `<button class="btn wide" id="regen" type="button">${icon('refresh')}${t('regen')}</button>` : ''}
      <button class="tile" type="button" data-near="${p.stay.lat},${p.stay.lon}" data-place="${esc(t('stayLabel').toLowerCase())}"><span class="tile-ic">${icon('food')}</span><span><strong>${t(
        'nearStay'
      )}</strong><small>${t('nearStayHint')}</small></span>${icon('chev', 'go')}</button>
      <button class="tile" type="button" id="country"><span class="tile-ic">${icon('info')}</span><span><strong>${esc(t('countryInfo', { country: p.country }))}</strong><small>${t(
        'countryHint'
      )}</small></span>${icon('chev', 'go')}</button>
    </section>
    ${
      extras.length
        ? `<h3 class="sec">${t('extras')}</h3><ul class="extras">${extras
            .map(
              (a) =>
                `<li><button class="stop-body" type="button" data-id="${a.id}"><span class="thumb">${pic(a.image, a.category)}</span><span class="txt"><strong>${esc(a.name)}</strong><small>${t(
                  'c_' + a.category
                )}, ${a.durationMin} min</small></span></button>${state.edit ? `<button class="chip-btn" type="button" data-add="${a.id}">${icon('add')}${t('addHere')}</button>` : ''}</li>`
            )
            .join('')}</ul>`
        : ''
    }
    ${tips.length ? `<details class="tips card"><summary>${t('tips')}${icon('chev', 'go')}</summary><ul>${tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}`;

  app.querySelectorAll('[data-day]').forEach((b) =>
    b.addEventListener('click', () => {
      state.day = +b.dataset.day;
      renderTrip(trip, true);
    })
  );
  app.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => openSheet(trip, b.dataset.id, day.date)));
  app.querySelectorAll('[data-near]').forEach((b) =>
    b.addEventListener('click', () => {
      const [lat, lon] = b.dataset.near.split(',').map(Number);
      openRestaurants(trip, lat, lon, b.dataset.place);
    })
  );
  document.getElementById('edit').addEventListener('click', () => {
    state.edit = !state.edit;
    renderTrip(trip, true);
  });
  document.getElementById('more').addEventListener('click', () => moreMenu(trip));
  document.getElementById('country').addEventListener('click', () => openCountry(trip));
  app.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => removeFromDay(trip, state.day, b.dataset.remove)));
  app.querySelectorAll('[data-move]').forEach((sel) =>
    sel.addEventListener('change', () => sel.value !== '' && moveToDay(trip, state.day, +sel.value, sel.dataset.move))
  );
  app.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => moveToDay(trip, null, state.day, b.dataset.add)));
  document.getElementById('regen')?.addEventListener('click', () => regenerateDay(trip, state.day));
  document.getElementById('locate')?.addEventListener('click', (e) => locate(trip, info(trip, e.currentTarget.dataset.target)));
  const nav = app.querySelector('.days');
  const sel = nav?.querySelector('[aria-selected=true]');
  if (sel) nav.scrollLeft = sel.offsetLeft - nav.clientWidth / 2 + sel.clientWidth / 2;

  drawMap(trip, day);
  if (keepScroll) window.scrollTo(0, y);
  onScroll();
}

function moreMenu(trip) {
  const item = (act, ic, title, hint, cls = '') =>
    `<button class="menu-item ${cls}" type="button" data-act="${act}"><span class="tile-ic">${icon(ic)}</span><span><strong>${title}</strong>${hint ? `<small>${hint}</small>` : ''}</span></button>`;
  showSheet(`<h2 id="sheet-title" class="sheet-top">${esc(trip.plan.city)}</h2><div class="menu">
    ${item('offline', 'download', t('offline'), trip.offline ? t('offlineSaved') : t('offlineHint'))}
    ${item('cal', 'calendar', t('calendar'), t('calHint'))}
    ${item('share', 'share', t('share'), t('shareHint'))}
    ${item('del', 'trash', t('deleteTrip'), '', 'danger')}
  </div>`);
  const on = (act, fn) => sheet.querySelector(`[data-act=${act}]`).addEventListener('click', fn);
  on('offline', () => saveOffline(trip));
  on('cal', () => exportCalendar(trip));
  on('share', () => shareTrip(trip));
  on('del', () => {
    if (!confirm(t('confirmDelete', { city: trip.plan.city }))) return;
    delete trips[trip.id];
    saveTrips();
    closeSheet();
    location.hash = '#/';
  });
}

function onScroll() {
  document.body.classList.toggle('scrolled', window.scrollY > 200);
}

function drawMap(trip, day) {
  if (map) {
    map.remove();
    map = null;
  }
  const el = document.getElementById('map');
  if (!el || !window.L) return;
  const touch = matchMedia('(pointer: coarse)').matches;
  map = L.map(el, { zoomControl: false, attributionControl: true, dragging: !touch, tap: false, touchZoom: true, scrollWheelZoom: !touch });
  if (touch) {
    let pinch = false;
    el.addEventListener(
      'touchstart',
      (e) => {
        const multi = e.touches.length > 1;
        if (multi !== pinch) {
          pinch = multi;
          multi ? map.dragging.enable() : map.dragging.disable();
        }
      },
      { passive: true }
    );
    el.addEventListener(
      'touchend',
      (e) => {
        if (e.touches.length < 2 && pinch) {
          pinch = false;
          map.dragging.disable();
        }
      },
      { passive: true }
    );
  }
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, crossOrigin: true, attribution: '&copy; OpenStreetMap' }).addTo(map);
  const home = [trip.plan.stay.lat, trip.plan.stay.lon];
  const pts = [home];
  L.marker(home, { icon: L.divIcon({ className: 'pin pin-stay', html: `<span>${icon('home')}</span>`, iconSize: [30, 30] }), keyboard: false }).addTo(map);
  let n = 0;
  for (const it of day.items) {
    if (it.type !== 'visit') continue;
    const a = info(trip, it.attractionId);
    if (!a) continue;
    n++;
    const ll = [a.lat, a.lon];
    pts.push(ll);
    L.marker(ll, { icon: L.divIcon({ className: 'pin', html: `<span>${n}</span>`, iconSize: [30, 30] }), title: a.name })
      .addTo(map)
      .on('click', () => openSheet(trip, a.id, day.date));
  }
  const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  L.polyline(pts, { color, weight: 4, opacity: 0.9, dashArray: '1 9', lineCap: 'round' }).addTo(map);
  const fit = () => {
    if (!map) return;
    map.invalidateSize();
    map.fitBounds(pts, { padding: [40, 40], maxZoom: 16 });
  };
  fit();
  requestAnimationFrame(() => requestAnimationFrame(fit));
  setTimeout(fit, 300);
}

function showSheet(html, image = null) {
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <article class="sheet-panel${image ? ' with-img' : ''}" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <span class="grabber" aria-hidden="true"></span>
      <button class="sheet-close" type="button" data-close aria-label="${t('close')}">${icon('close')}</button>
      ${image ? `<div class="sheet-hero"><img src="${esc(image)}" alt=""></div>` : ''}
      <div class="sheet-content">${html}</div>
    </article>`;
  sheet.hidden = false;
  sheet.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeSheet));
  sheet.querySelector('.sheet-close').focus({ preventScroll: true });
}

function openSheet(trip, id, date) {
  const a = info(trip, id);
  if (!a) return;
  const closed = hoursOn(a.hours, date) === null;
  const nav = `https://maps.apple.com/?daddr=${a.lat},${a.lon}&dirflg=w`;
  showSheet(
    `<h2 id="sheet-title" class="sheet-title">${esc(a.name)}</h2>
    <p class="chips-row"><span class="tag">${t('c_' + a.category)}</span><span class="tag">${icon('clock')}${a.durationMin} min</span></p>
    <div class="actions top">
      <a class="btn primary" href="${nav}" target="_blank" rel="noopener">${icon('nav')}${t('navigate')}</a>
      ${a.site ? `<a class="btn" href="${esc(a.site)}" target="_blank" rel="noopener">${icon('globe')}${t('site')}</a>` : ''}
      ${a.wikipedia ? `<a class="btn" href="${esc(a.wikipedia)}" target="_blank" rel="noopener">${icon('book')}${t('wikipedia')}</a>` : ''}
    </div>
    ${a.desc ? `<p class="desc">${esc(a.desc)}</p>` : ''}
    <div class="facts">
      <div class="fact">${icon('clock')}<span><small>${t('hours')}</small>${esc(hoursText(a.hours))}${closed ? `<em class="warn">${t('closed')}</em>` : ''}</span></div>
      <div class="fact">${icon('ticket')}<span><small>${t('entry')}</small>${esc(entryText(a))}</span></div>
    </div>`,
    a.image ? a.image.replace(/\/\d+px-/, '/960px-') : null
  );
}

async function osmRestaurants(lat, lon) {
  const q = `[out:json][timeout:15];nwr(around:600,${lat},${lon})["amenity"="restaurant"]["name"];out center tags 30;`;
  for (const host of OVERPASS) {
    try {
      const r = await fetch(`${host}?data=${encodeURIComponent(q)}`, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) continue;
      return ((await r.json()).elements || []).map((e) => ({
        name: e.tags.name,
        lat: e.lat ?? e.center?.lat,
        lon: e.lon ?? e.center?.lon,
        rating: null,
        cuisine: e.tags.cuisine ? e.tags.cuisine.split(';')[0].replace(/_/g, ' ') : null,
        website: e.tags.website || null,
      }));
    } catch {}
  }
  return [];
}

async function openRestaurants(trip, lat, lon, place) {
  const key = `v2:${lat.toFixed(3)},${lon.toFixed(3)}`;
  const head = `<h2 id="sheet-title" class="sheet-top">${esc(t('restNear', { place }))}</h2>`;
  trip.restaurants ||= {};
  let data = trip.restaurants[key];
  if (!data) {
    showSheet(`${head}<p class="pending"><span class="spinner"></span>${t('searching')}</p>`);
    try {
      data = await api('/restaurants', { lat, lon, city: { lat: trip.plan.geo.lat, lon: trip.plan.geo.lon }, lang: trip.input.lang }, 40000);
    } catch {
      data = { famous: [], top: [] };
    }
    data.famous ||= [];
    data.top ||= [];
    if (!data.famous.length && !data.top.length) data = { famous: [], top: [], osm: (await osmRestaurants(lat, lon)).slice(0, 8) };
    if (data.famous.length || data.top.length || data.osm?.length) {
      trip.restaurants[key] = data;
      saveTrips();
    }
    if (sheet.hidden) return;
  }
  if (await pageImages(data.famous, 480)) saveTrips();
  if (sheet.hidden) return;

  const nf = new Intl.NumberFormat(locale());
  const rating = (r) => (r.rating ? `<span class="rating">${icon('star', 'fill')}${r.rating.toFixed(1)}${r.ratingCount ? `<small>(${nf.format(r.ratingCount)})</small>` : ''}</span>` : '');
  const distTxt = (r) => {
    if (r.distance == null && r.lat != null) r.distance = Math.round(dist({ lat, lon }, r) * 1000);
    return r.distance != null ? fmtKm(r.distance / 1000) : '';
  };
  const href = (r) => esc(r.mapsUrl || `https://maps.apple.com/?daddr=${r.lat},${r.lon}&dirflg=w`);
  const famous = data.famous.length
    ? `<h3 class="rhead">${esc(t('famousIn', { city: trip.plan.city }))}</h3><div class="slides famous">${data.famous
        .map(
          (r) =>
            `<a class="slide" href="${href(r)}" target="_blank" rel="noopener"><span class="slide-img">${
              r.image ? `<img src="${esc(r.image)}" alt="" loading="lazy">` : `<span class="ph">${icon('food')}</span>`
            }</span><span class="slide-body"><strong>${esc(r.name)}</strong><span class="meta">${rating(r)}<small>${distTxt(r)}</small></span>${r.why ? `<small class="why">${esc(r.why)}</small>` : ''}</span></a>`
        )
        .join('')}</div>`
    : '';
  const rows = (title, list) =>
    list?.length
      ? `<h3 class="rhead">${esc(title)}</h3><ul class="rlist">${list
          .map(
            (r) =>
              `<li><a href="${href(r)}" target="_blank" rel="noopener"><span class="tile-ic">${icon('food')}</span><span class="r-txt"><strong>${esc(r.name)}</strong><small>${esc(
                [r.price ? t('price' + r.price) : null, r.cuisine, distTxt(r)].filter(Boolean).join(', ')
              )}</small></span>${rating(r)}</a></li>`
          )
          .join('')}</ul>`
      : '';
  const body = famous + rows(t('topNear'), data.top) + rows(t('inArea'), data.osm);
  showSheet(`${head}${body || `<p class="sub">${t('noRest')}</p>`}`);
}

function closeSheet() {
  sheet.hidden = true;
  sheet.innerHTML = '';
}

function renderSettings() {
  app.innerHTML = `
    ${pageHead(t('settings'))}
    <form id="s" novalidate>
      <div class="card form-card">
        <div class="field"><label for="token">${t('token')}</label><input id="token" type="password" autocomplete="off" value="${esc(settings.token)}"></div>
        <div class="field"><label for="theme">${t('theme')}</label><select id="theme">${['auto', 'light', 'dark']
          .map((v) => `<option value="${v}"${(settings.theme || 'auto') === v ? ' selected' : ''}>${t('theme' + v[0].toUpperCase() + v.slice(1))}</option>`)
          .join('')}</select></div>
        <div class="field last"><label for="lang">${t('language')}</label><select id="lang"><option value="ro"${settings.lang === 'ro' ? ' selected' : ''}>Romana</option><option value="en"${
          settings.lang === 'en' ? ' selected' : ''
        }>English</option></select></div>
      </div>
      <div class="card form-card">
        <div class="field"><label for="peron">${t('peron')}</label><input id="peron" type="url" autocomplete="off" placeholder="https://acidburn11.github.io/peron/" value="${esc(settings.peron)}"><p class="hint">${t('peronHint')}</p></div>
        <div class="field last"><label for="api">${t('api')}</label><input id="api" type="url" autocomplete="off" value="${esc(settings.api)}"></div>
      </div>
      <div class="card form-card backup">
        <p class="label">${t('backup')}</p>
        <div class="actions">
          <button class="btn" id="exp" type="button">${icon('download')}${t('exportBtn')}</button>
          <label class="btn" for="imp">${icon('upload')}${t('importBtn')}</label>
          <input id="imp" type="file" accept="application/json,.json" hidden>
        </div>
        <p class="hint">${t('backupHint')}</p>
      </div>
      <p class="ok" id="msg" role="status"></p>
      <div class="cta"><button class="btn primary pill" type="submit">${t('save')}</button></div>
    </form>`;
  document.getElementById('exp').addEventListener('click', exportBackup);
  document.getElementById('imp').addEventListener('change', (e) => e.target.files[0] && importBackup(e.target.files[0]));
  document.getElementById('theme').addEventListener('change', (e) => {
    settings.theme = e.target.value;
    saveSettings();
    applyTheme();
  });
  const f = document.getElementById('s');
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    settings.token = f.token.value.trim();
    settings.lang = document.getElementById('lang').value;
    settings.theme = document.getElementById('theme').value;
    applyTheme();
    settings.api = f.api.value.trim() || DEFAULT_API;
    settings.peron = document.getElementById('peron').value.trim();
    saveSettings();
    document.documentElement.lang = settings.lang;
    renderSettings();
    document.getElementById('msg').textContent = t('saved');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !sheet.hidden) closeSheet();
});
for (const ev of ['gesturestart', 'gesturechange']) document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
window.addEventListener('hashchange', route);
window.addEventListener('scroll', onScroll, { passive: true });
document.documentElement.lang = settings.lang;
applyTheme();
route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
