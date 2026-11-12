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
  { api: DEFAULT_API, token: '', lang: (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : 'en' },
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
const state = { tripId: null, day: 0 };
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

function route() {
  closeSheet();
  if (map) {
    map.remove();
    map = null;
  }
  const h = location.hash.slice(1) || '/';
  if (h.startsWith('/trip/')) {
    const trip = trips[h.slice(6)];
    if (trip) {
      if (state.tripId !== trip.id) state.day = 0;
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
    last = { lat: a.lat, lon: a.lon, name: a.name };
    const closed = hoursOn(a.hours, day.date) === null;
    rows.push(
      `<li class="leg ${it.travelMode}"><span></span><span class="rail"></span><span class="note">${t(it.travelMode === 'walk' ? 'walk' : 'transit', { n: it.travelMin })}</span></li>`,
      `<li><time>${it.time}</time><span class="rail"><span class="dot">${n}</span></span><button class="stop-body" data-id="${a.id}"><strong>${esc(a.name)}</strong><span class="sub">${t('c_' + a.category)}, ${a.durationMin} min</span>${
        closed ? `<span class="warn">${t('closed')}</span>` : ''
      }</button></li>`
    );
  }

  const extras = p.extras.map((id) => info(trip, id)).filter(Boolean);
  const tips = ai?.tips || [];

  app.innerHTML = `
    <header class="bar"><a class="link-btn" href="#/">${t('back')}</a><button class="link-btn danger" id="del" type="button">${t('delete')}</button></header>
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
      <ol class="route">${rows.join('')}</ol>
      <button class="btn wide" type="button" data-near="${p.stay.lat},${p.stay.lon}" data-place="${esc(t('stayLabel').toLowerCase())}">${t('nearStay')}</button>
    </section>
    ${
      extras.length
        ? `<h2 class="section-title">${t('extras')}</h2><ul class="extras">${extras
            .map((a) => `<li><button type="button" data-id="${a.id}">${esc(a.name)}<span class="sub">${t('c_' + a.category)}, ${a.durationMin} min</span></button></li>`)
            .join('')}</ul>`
        : ''
    }
    ${tips.length ? `<details class="tips"><summary>${t('tips')}</summary><ul>${tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}`;

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
  document.getElementById('del').addEventListener('click', () => {
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
    saveSettings();
    document.documentElement.lang = settings.lang;
    renderSettings();
    document.getElementById('msg').textContent = t('saved');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !sheet.hidden) closeSheet();
});
window.addEventListener('hashchange', route);
document.documentElement.lang = settings.lang;
route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
