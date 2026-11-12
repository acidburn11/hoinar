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
  { api: DEFAULT_API, token: '', peron: '', lang: (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : 'en' },
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

function wxIcon(code) {
  if (code === 0) return '\u2600\uFE0F';
  if (code <= 2) return '\uD83C\uDF24\uFE0F';
  if (code === 3) return '\u2601\uFE0F';
  if (code === 45 || code === 48) return '\uD83C\uDF2B\uFE0F';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return '\u2744\uFE0F';
  if (code >= 95) return '\u26C8\uFE0F';
  return '\uD83C\uDF27\uFE0F';
}

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
const fmtKm = (km) => (km < 1 ? `${Math.round(km * 100) * 10} m` : `${new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(km)} km`);

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
    u.searchParams.set('to', `${to.lat},${to.lon}`);
    u.searchParams.set('toName', toName);
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
  const h = location.hash.slice(1) || '/';
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

function renderHome() {
  const list = Object.values(trips).sort((a, b) => b.input.start.localeCompare(a.input.start));
  app.innerHTML = `
    <header class="bar"><span></span><a class="link-btn" href="#/settings">${t('settings')}</a></header>
    <h1 class="wordmark">Hoinar</h1>
    <p class="lead">${t('tagline')}</p>
    ${settings.token ? '' : `<p class="notice">${t('needToken')} <a href="#/settings">${t('openSettings')}</a></p>`}
    ${list
      .map((tr) => ({ tr, i: todayIndex(tr) }))
      .filter((x) => x.i >= 0)
      .map(
        ({ tr, i }) =>
          `<a class="today" href="#/trip/${tr.id}"><strong>${esc(t('todayIn', { city: tr.plan.city }))}</strong><span>${t('todayDay', { n: i + 1, total: tr.plan.days.length })}</span></a>`
      )
      .join('')}
    ${
      list.length
        ? `<ul class="trips">${list
            .map((tr) => `<li><a href="#/trip/${tr.id}"><span class="t-city">${esc(tr.plan.city)}</span><span class="t-dates">${fmtRange(tr.input.start, tr.input.end)}</span></a></li>`)
            .join('')}</ul>`
        : `<div class="empty"><p><strong>${t('emptyTitle')}</strong> ${t('emptyText')}</p></div>`
    }
    <div class="cta"><a class="btn primary" href="#/new">${t('newTrip')}</a></div>`;
}

function renderNew() {
  const start = addDays(today(), 1);
  app.innerHTML = `
    <header class="bar"><a class="link-btn" href="#/">${t('back')}</a></header>
    <h1 class="page-title">${t('newTrip')}</h1>
    <form id="f" novalidate>
      <div class="field"><label for="city">${t('city')}</label><input id="city" type="text" autocomplete="off" autocapitalize="words" placeholder="${t('cityPh')}"></div>
      <div class="field row">
        <div><label for="start">${t('from')}</label><input id="start" type="date" value="${start}"></div>
        <div><label for="end">${t('to')}</label><input id="end" type="date" value="${addDays(start, 2)}"></div>
      </div>
      <div class="field"><label for="stay">${t('stay')}</label><input id="stay" type="text" autocomplete="off" placeholder="${t('stayPh')}"><p class="hint">${t('stayHint')}</p></div>
      <fieldset class="field"><legend class="label">${t('pace')}</legend><div class="seg">${['relaxed', 'normal', 'intense']
        .map((p) => `<label><input type="radio" name="pace" value="${p}"${p === 'normal' ? ' checked' : ''}><span>${t(p)}</span></label>`)
        .join('')}</div></fieldset>
      <fieldset class="field"><legend class="label">${t('interests')}</legend><div class="chips">${INTERESTS.map(
        (i) => `<label><input type="checkbox" name="int" value="${i}"><span>${t('i_' + i)}</span></label>`
      ).join('')}</div></fieldset>
      <p class="error" id="err" role="alert"></p>
      <div class="cta"><button class="btn primary" id="go" type="submit">${t('generate')}</button></div>
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
    go.textContent = t('generating');
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

  let n = 0;
  let last = { lat: p.stay.lat, lon: p.stay.lon, name: t('stayLabel') };
  const now = tzNow(p.geo?.timezone);
  const isToday = day.date === now.date;
  const visits = day.items.filter((i) => i.type === 'visit');
  const next = isToday ? visits.find((i) => toMin(i.time) + (info(trip, i.attractionId)?.durationMin || 0) > now.min) : null;
  const moveOpts = (id) =>
    `<select data-move="${id}" aria-label="${t('moveTo')}"><option value="">${t('moveTo')}</option>${p.days
      .map((d, i) => (i === state.day ? '' : `<option value="${i}">${fmt(d.date, { weekday: 'short', day: 'numeric' })}</option>`))
      .join('')}</select>`;
  const rows = [
    `<li class="start"><span></span><span class="rail"><span class="dot">\u2302</span></span><div class="stop-body"><strong>${t('stayLabel')}</strong><span class="sub">${esc(stayName)}</span></div></li>`,
  ];
  for (const it of day.items) {
    if (it.type === 'lunch' || it.type === 'dinner') {
      rows.push(
        `<li class="lunch"><time>${it.time}</time><span class="rail"><span class="dot"></span></span><button class="stop-body" type="button" data-near="${last.lat},${last.lon}" data-place="${esc(
          last.name
        )}"><strong>${t(it.type)}</strong><span class="sub link">${t('lunchHint')}</span></button></li>`
      );
      continue;
    }
    const a = info(trip, it.attractionId);
    if (!a) continue;
    n++;
    const from = last;
    last = { lat: a.lat, lon: a.lon, name: a.name };
    const closed = hoursOn(a.hours, day.date) === null;
    const how = it.travelMode === 'transit' ? ` <a class="leg-link" href="${esc(howToUrl(from, a, a.name))}" target="_blank" rel="noopener">${t('howTo')}</a>` : '';
    rows.push(
      `<li class="leg ${it.travelMode}"><span></span><span class="rail"></span><span class="note">${t(it.travelMode === 'walk' ? 'walk' : 'transit', { n: it.travelMin })}${how}</span></li>`,
      `<li class="${next === it ? 'next' : ''}"><time>${it.time}</time><span class="rail"><span class="dot">${n}</span></span><button class="stop-body" data-id="${a.id}"><strong>${esc(a.name)}</strong><span class="sub">${t('c_' + a.category)}, ${a.durationMin} min</span>${
        closed ? `<span class="warn">${t('closed')}</span>` : ''
      }</button>${
        state.edit
          ? `<span></span><span class="rail"></span><div class="edit-row"><button class="chip-btn" type="button" data-remove="${a.id}">${t('remove')}</button>${p.days.length > 1 ? moveOpts(a.id) : ''}</div>`
          : ''
      }</li>`
    );
  }

  const extras = p.extras.map((id) => info(trip, id)).filter(Boolean);
  const tips = ai?.tips || [];

  app.innerHTML = `
    <header class="bar"><a class="link-btn" href="#/">${t('back')}</a><span class="bar-right"><button class="link-btn" id="edit" type="button">${state.edit ? t('done') : t('edit')}</button>${
      state.edit ? `<button class="link-btn danger" id="del" type="button">${t('delete')}</button>` : ''
    }</span></header>
    <h1 class="city">${esc(p.city)}</h1>
    <p class="meta">${fmtRange(trip.input.start, trip.input.end)}, ${esc(p.country)}</p>
    ${ai?.summary ? `<p class="summary">${esc(ai.summary)}</p>` : ai ? '' : `<p class="pending">${t('aiPending')}</p>`}
    <nav class="days" role="tablist">${p.days
      .map(
        (d, i) =>
          `<button role="tab" type="button" aria-selected="${i === state.day}" data-day="${i}"><span class="wd">${fmt(d.date, { weekday: 'short', day: 'numeric' })}</span>${
            d.weather ? `<span class="wx">${wxIcon(d.weather.code)} ${Math.round(d.weather.tmax)}\u00B0</span>` : ''
          }</button>`
      )
      .join('')}</nav>
    <div id="map" class="map" role="img" aria-label="${esc(title)}"></div>
    <section>
      <h2 class="day-title">${esc(title)}</h2>
      ${
        w
          ? `<p class="wxline">${wxIcon(w.code)} ${Math.round(w.tmin)}\u2013${Math.round(w.tmax)}\u00B0C, ${t('rain', { n: w.rainProb ?? 0 })}${w.sunset ? `, ${t('sunset', { t: w.sunset })}` : ''}</p>`
          : ''
      }
      ${
        next
          ? (() => {
              const a = info(trip, next.attractionId);
              return `<div class="now"><p class="sub">${t('nextAt', { t: next.time })}</p><strong>${esc(a.name)}</strong><p class="sub" id="now-dist"></p><div class="actions"><a class="btn primary" href="https://maps.apple.com/?daddr=${a.lat},${a.lon}&dirflg=w" target="_blank" rel="noopener">${t('navigate')}</a><button class="btn" id="locate" type="button" data-target="${a.id}">${t('locate')}</button></div></div>`;
            })()
          : isToday && visits.length
          ? `<p class="wxline">${t('dayDone')}</p>`
          : ''
      }
      <ol class="route">${rows.join('')}</ol>
      ${state.edit ? `<button class="btn wide" id="regen" type="button">${t('regen')}</button>` : ''}
      <button class="btn wide" type="button" data-near="${p.stay.lat},${p.stay.lon}" data-place="${esc(t('stayLabel').toLowerCase())}">${t('nearStay')}</button>
    </section>
    ${
      extras.length
        ? `<h2 class="section-title">${t('extras')}</h2><ul class="extras">${extras
            .map(
              (a) =>
                `<li><button type="button" data-id="${a.id}">${esc(a.name)}<span class="sub">${t('c_' + a.category)}, ${a.durationMin} min</span></button>${
                  state.edit ? `<button class="chip-btn" type="button" data-add="${a.id}">${t('addHere')}</button>` : ''
                }</li>`
            )
            .join('')}</ul>`
        : ''
    }
    ${tips.length ? `<details class="tips"><summary>${t('tips')}</summary><ul>${tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}
    <div class="trip-actions">
      <button class="btn" id="act-offline" type="button">${t('offline')}</button>
      <button class="btn" id="act-cal" type="button">${t('calendar')}</button>
      <button class="btn" id="act-share" type="button">${t('share')}</button>
    </div>`;

  app.querySelectorAll('[data-day]').forEach((b) =>
    b.addEventListener('click', () => {
      state.day = +b.dataset.day;
      renderTrip(trip);
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
  app.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => removeFromDay(trip, state.day, b.dataset.remove)));
  app.querySelectorAll('[data-move]').forEach((sel) =>
    sel.addEventListener('change', () => sel.value !== '' && moveToDay(trip, state.day, +sel.value, sel.dataset.move))
  );
  app.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => moveToDay(trip, null, state.day, b.dataset.add)));
  document.getElementById('regen')?.addEventListener('click', () => regenerateDay(trip, state.day));
  document.getElementById('locate')?.addEventListener('click', (e) => locate(trip, info(trip, e.currentTarget.dataset.target)));
  document.getElementById('act-offline').addEventListener('click', () => saveOffline(trip));
  document.getElementById('act-cal').addEventListener('click', () => exportCalendar(trip));
  document.getElementById('act-share').addEventListener('click', () => shareTrip(trip));
  document.getElementById('del')?.addEventListener('click', () => {
    if (!confirm(t('confirmDelete', { city: p.city }))) return;
    delete trips[trip.id];
    saveTrips();
    location.hash = '#/';
  });

  drawMap(trip, day);
  if (keepScroll) window.scrollTo(0, y);
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
    el.addEventListener('touchstart', (e) => {
      const multi = e.touches.length > 1;
      if (multi !== pinch) {
        pinch = multi;
        multi ? map.dragging.enable() : map.dragging.disable();
      }
    }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (e.touches.length < 2 && pinch) {
        pinch = false;
        map.dragging.disable();
      }
    }, { passive: true });
  }
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    crossOrigin: true,
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);
  const home = [trip.plan.stay.lat, trip.plan.stay.lon];
  const pts = [home];
  L.marker(home, { icon: L.divIcon({ className: 'pin pin-stay', html: '<span>\u2302</span>', iconSize: [28, 28] }), keyboard: false }).addTo(map);
  let n = 0;
  for (const it of day.items) {
    if (it.type !== 'visit') continue;
    const a = info(trip, it.attractionId);
    if (!a) continue;
    n++;
    const ll = [a.lat, a.lon];
    pts.push(ll);
    L.marker(ll, { icon: L.divIcon({ className: 'pin', html: `<span>${n}</span>`, iconSize: [28, 28] }), title: a.name })
      .addTo(map)
      .on('click', () => openSheet(trip, a.id, day.date));
  }
  const color = getComputedStyle(document.documentElement).getPropertyValue('--route').trim();
  L.polyline(pts, { color, weight: 4, opacity: 0.85, dashArray: '1 9', lineCap: 'round' }).addTo(map);
  const fit = () => {
    if (!map) return;
    map.invalidateSize();
    map.fitBounds(pts, { padding: [36, 36], maxZoom: 16 });
  };
  fit();
  requestAnimationFrame(() => requestAnimationFrame(fit));
  setTimeout(fit, 300);
}

async function openSheet(trip, id, date) {
  const a = info(trip, id);
  if (!a) return;
  const closed = hoursOn(a.hours, date) === null;
  const nav = `https://maps.apple.com/?daddr=${a.lat},${a.lon}&dirflg=w`;
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <article class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button class="sheet-close" type="button" data-close aria-label="${t('close')}">\u00D7</button>
      <div class="sheet-img" id="sheet-img"></div>
      <h2 id="sheet-title">${esc(a.name)}</h2>
      <p class="sub">${t('c_' + a.category)}, ${a.durationMin} min</p>
      ${a.desc ? `<p class="desc">${esc(a.desc)}</p>` : ''}
      <dl class="facts">
        <div><dt>${t('hours')}</dt><dd>${esc(hoursText(a.hours))}${closed ? `<span class="warn">${t('closed')}</span>` : ''}</dd></div>
        <div><dt>${t('entry')}</dt><dd>${esc(entryText(a))}</dd></div>
      </dl>
      <div class="actions">
        <a class="btn primary" href="${nav}" target="_blank" rel="noopener">${t('navigate')}</a>
        ${a.site ? `<a class="btn" href="${esc(a.site)}" target="_blank" rel="noopener">${t('site')}</a>` : ''}
        ${a.wikipedia ? `<a class="btn" href="${esc(a.wikipedia)}" target="_blank" rel="noopener">${t('wikipedia')}</a>` : ''}
      </div>
    </article>`;
  sheet.hidden = false;
  sheet.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeSheet));
  sheet.querySelector('.sheet-close').focus();

  if (!a.wikipedia) return;
  try {
    const u = new URL(a.wikipedia);
    const title = u.pathname.split('/wiki/')[1];
    const r = await fetch(`${u.origin}/api/rest_v1/page/summary/${title}`, { signal: AbortSignal.timeout(8000) });
    const img = (await r.json()).thumbnail?.source;
    const box = document.getElementById('sheet-img');
    if (img && box) {
      box.style.backgroundImage = `url("${img.replace(/"/g, '%22')}")`;
      box.classList.add('has');
    }
  } catch {}
}

function showSheet(html) {
  sheet.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <article class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button class="sheet-close" type="button" data-close aria-label="${t('close')}">\u00D7</button>
      ${html}
    </article>`;
  sheet.hidden = false;
  sheet.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeSheet));
  sheet.querySelector('.sheet-close').focus();
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
        sources: ['osm'],
      }));
    } catch {}
  }
  return [];
}

async function openRestaurants(trip, lat, lon, place) {
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  const head = `<h2 id="sheet-title" class="sheet-top">${esc(t('restNear', { place }))}</h2>`;
  trip.restaurants ||= {};
  let data = trip.restaurants[key];
  if (!data) {
    showSheet(`${head}<p class="sub">${t('searching')}</p>`);
    try {
      data = await api('/restaurants', { lat, lon, lang: trip.input.lang, limit: 8 }, 30000);
    } catch {
      data = { restaurants: [], sources: {} };
    }
    if (!data.restaurants.length) data = { restaurants: (await osmRestaurants(lat, lon)).slice(0, 8), sources: { osm: 'ok' } };
    if (data.restaurants.length) {
      trip.restaurants[key] = data;
      saveTrips();
    }
    if (sheet.hidden) return;
  }

  const nf = new Intl.NumberFormat(locale());
  const names = { google: 'Google', foursquare: 'Foursquare', osm: 'OpenStreetMap' };
  const used = [...new Set(data.restaurants.flatMap((r) => r.sources || []))].map((x) => names[x] || x).join(', ');
  const rows = data.restaurants.map((r) => {
    const meta = [
      r.rating ? `\u2605 ${r.rating.toFixed(1)}${r.ratingCount ? ` (${nf.format(r.ratingCount)})` : ''}` : null,
      r.price ? t('price' + r.price) : null,
      r.cuisine,
      r.distance != null ? `${nf.format(r.distance)}\u00A0m` : null,
    ].filter(Boolean);
    const href = r.mapsUrl || `https://maps.apple.com/?daddr=${r.lat},${r.lon}&dirflg=w`;
    return `<li><a href="${esc(href)}" target="_blank" rel="noopener"><strong>${esc(r.name)}</strong><span class="sub">${esc(meta.join(', '))}</span></a></li>`;
  });
  showSheet(
    `${head}${rows.length ? `<ul class="rlist">${rows.join('')}</ul><p class="fine">${t('restSources', { s: used })}</p>` : `<p class="sub">${t('noRest')}</p>`}`
  );
}

function closeSheet() {
  sheet.hidden = true;
  sheet.innerHTML = '';
}

function renderSettings() {
  app.innerHTML = `
    <header class="bar"><a class="link-btn" href="#/">${t('back')}</a></header>
    <h1 class="page-title">${t('settings')}</h1>
    <form id="s" novalidate>
      <div class="field"><label for="token">${t('token')}</label><input id="token" type="password" autocomplete="off" value="${esc(settings.token)}"></div>
      <div class="field"><label for="lang">${t('language')}</label><select id="lang"><option value="ro"${settings.lang === 'ro' ? ' selected' : ''}>Romana</option><option value="en"${
        settings.lang === 'en' ? ' selected' : ''
      }>English</option></select></div>
      <div class="field"><label for="peron">${t('peron')}</label><input id="peron" type="url" autocomplete="off" placeholder="https://acidburn11.github.io/peron/" value="${esc(settings.peron)}"><p class="hint">${t('peronHint')}</p></div>
      <div class="field"><label for="api">${t('api')}</label><input id="api" type="url" autocomplete="off" value="${esc(settings.api)}"></div>
      <p class="ok" id="msg" role="status"></p>
      <div class="cta"><button class="btn primary" type="submit">${t('save')}</button></div>
    </form>`;
  const f = document.getElementById('s');
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    settings.token = f.token.value.trim();
    settings.lang = document.getElementById('lang').value;
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
document.documentElement.lang = settings.lang;
route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
