const { rounds: ROUND_COUNT, levels: LEVELS, creatures: CREATURES } = window.FIELD;

const app = document.querySelector("#app");
const LANG_KEY = "which-is-lang";

const COPY = {
  en: {
    title: "Which is?",
    description: "A field quiz: name the animal or bird from how it looks, where it lives, or the sound it makes.",
    langLabel: "Language",
    brand: "Which is?",
    kicker: "Field quiz",
    lede: "What animal or bird is it? Choose a field first. Then pick how hard the clues are. Three names, two guesses, and a photo either way.",
    homeNote: "A miss, or a switch from animals to birds, starts that count over. The streak carries into the next sitting.",
    "group.animals.label": "Animals",
    "group.animals.mark": "Paw",
    "group.animals.blurb": "Mammals, reptiles, and amphibians. No birds.",
    "group.birds.label": "Birds",
    "group.birds.mark": "Wing",
    "group.birds.blurb": "Only birds, from the obvious ones to the ones that look alike.",
    "group.mix.label": "Mix",
    "group.mix.mark": "Both",
    "group.mix.blurb": "Animals and birds in the same sitting.",
    ask: "How hard?",
    levelsNote: "Ten creatures. A new sitting skips any you have already had, until that list runs out. Miss once and a second clue appears before the last guess.",
    changeField: "Change field",
    "level.easy.label": "Easy",
    "level.easy.mark": "Look",
    "level.easy.blurb": "A plain description of the body. The other two names are nothing like it.",
    "level.medium.label": "Medium",
    "level.medium.mark": "Home",
    "level.medium.blurb": "The clue is the kind of home. The three names could be mistaken for neighbors.",
    "level.hard.label": "Hard",
    "level.hard.mark": "Call",
    "level.hard.blurb": "Only the sound it makes, written out. The three names are easy to mix up.",
    "clue.easy.clue": "The look",
    "clue.easy.extra": "Where it lives",
    "clue.medium.clue": "Where it lives",
    "clue.medium.extra": "The look",
    "clue.hard.clue": "The call",
    "clue.hard.extra": "The look",
    notIt: "Not the {name}. One guess left.",
    oneLeft: "{n} guess left · keys 1, 2, 3",
    manyLeft: "{n} guesses left · keys 1, 2, 3",
    missedBoth: "Both guesses missed.",
    namedFirst: "Named on the first guess.",
    namedSecond: "Named on the second guess.",
    found: "Found",
    triedOne: "You tried {a}.",
    triedTwo: "You tried {a} and {b}.",
    nextCreature: "Next creature",
    seeCard: "See your card",
    larger: "Larger",
    download: "Download",
    downloadLabel: "Download {name}",
    magnifyLabel: "View a larger photo of {name}",
    lightboxLabel: "Larger photo of {name}",
    fullSize: "Full size",
    fit: "Fit",
    close: "Close",
    fullLabel: "Show the photo at full size",
    fitLabel: "Fit the photo to the screen",
    cleanCard: "A clean field card.",
    guideNamed: "The guide did the naming this time.",
    goodSitting: "A good sitting.",
    ofScore: "of {n}",
    tagFirst: "First guess",
    tagSecond: "Second guess",
    tagMissed: "Missed",
    sameLevel: "Same level",
    otherLevels: "Other levels",
    collect: "Collect",
    collected: "Collected",
    ready: "Ready",
    notYet: "Not yet",
    "badge.animal.title": "Animal badge",
    "badge.animal.line": "Ten animals, named in a row.",
    "badge.animal.mark": "Paw",
    "badge.animal.short": "Animal",
    "badge.bird.title": "Bird badge",
    "badge.bird.line": "Ten birds, named in a row.",
    "badge.bird.mark": "Wing",
    "badge.bird.short": "Bird",
    streakMiss: "That miss cleared the streak.",
    streakEmpty: "Ten in a row of one kind earns its badge.",
    streakCollected: "{label} streak {count}. Badge collected.",
    streakReady: "{label} streak {count}. Badge ready to collect.",
    streakProgress: "{label} streak {count} of {at}",
  },
  zh: {
    title: "是哪一種？",
    description: "猜猜這是哪種動物或鳥。看長相、住哪裡，或聽叫聲。",
    langLabel: "語言",
    brand: "是哪一種？",
    kicker: "野外猜謎",
    lede: "猜猜這是什麼。先選動物、鳥，或混在一起，再選難度。每次三個名字，可以猜兩次，最後都會看到照片。",
    homeNote: "猜錯，或是動物和鳥換著猜，連勝就歸零。下一場會接著算。",
    "group.animals.label": "動物",
    "group.animals.mark": "爪",
    "group.animals.blurb": "有哺乳類、爬蟲和兩棲，沒有鳥。",
    "group.birds.label": "鳥",
    "group.birds.mark": "翼",
    "group.birds.blurb": "只有鳥。有好認的，也有長得很像的。",
    "group.mix.label": "混合",
    "group.mix.mark": "混",
    "group.mix.blurb": "動物跟鳥混在一起猜。",
    ask: "有多難？",
    levelsNote: "十個生物。新的一場會跳過你已經遇過的，直到這份名單用完。答錯一次，最後一猜前會出現第二條線索。",
    changeField: "換一個範圍",
    "level.easy.label": "簡單",
    "level.easy.mark": "看",
    "level.easy.blurb": "一段平白的外形。另外兩個名字和牠一點也不像。",
    "level.medium.label": "中等",
    "level.medium.mark": "住",
    "level.medium.blurb": "線索是牠住的那種地方。三個名字容易被當成住在附近的種類。",
    "level.hard.label": "困難",
    "level.hard.mark": "聲",
    "level.hard.blurb": "只寫出牠的叫聲。三個名字很容易混在一起。",
    "clue.easy.clue": "外形",
    "clue.easy.extra": "住處",
    "clue.medium.clue": "住處",
    "clue.medium.extra": "外形",
    "clue.hard.clue": "叫聲",
    "clue.hard.extra": "外形",
    notIt: "不是{name}。還剩一次機會。",
    oneLeft: "還剩 {n} 次機會 · 按鍵 1、2、3",
    manyLeft: "還剩 {n} 次機會 · 按鍵 1、2、3",
    missedBoth: "兩次都沒猜中。",
    namedFirst: "第一次就說對了。",
    namedSecond: "第二次說對了。",
    found: "分佈",
    triedOne: "你猜了{a}。",
    triedTwo: "你猜了{a}和{b}。",
    nextCreature: "下一種",
    seeCard: "看這張記錄",
    larger: "放大",
    download: "下載",
    downloadLabel: "下載{name}的照片",
    magnifyLabel: "查看{name}的大圖",
    lightboxLabel: "{name}的大圖",
    fullSize: "原尺寸",
    fit: "適合螢幕",
    close: "關閉",
    fullLabel: "按原尺寸顯示照片",
    fitLabel: "讓照片適合螢幕",
    cleanCard: "一張乾淨的野外記錄。",
    guideNamed: "這一場，名字是圖鑑替你說的。",
    goodSitting: "一場不錯的問答。",
    ofScore: "/ {n}",
    tagFirst: "一次猜中",
    tagSecond: "兩次猜中",
    tagMissed: "沒猜中",
    sameLevel: "同一難度",
    otherLevels: "其他難度",
    collect: "領取",
    collected: "已領取",
    ready: "可領取",
    notYet: "還沒有",
    "badge.animal.title": "動物徽章",
    "badge.animal.line": "連對十隻就拿得到。",
    "badge.animal.mark": "爪",
    "badge.animal.short": "動物",
    "badge.bird.title": "鳥類徽章",
    "badge.bird.line": "連對十隻就拿得到。",
    "badge.bird.mark": "翼",
    "badge.bird.short": "鳥",
    streakMiss: "這一次答錯，連勝清零了。",
    streakEmpty: "動物或鳥連對十次，就能拿到徽章。",
    streakCollected: "{label}連勝 {count}。徽章已領取。",
    streakReady: "{label}連勝 {count}。徽章可以領取了。",
    streakProgress: "{label}連勝 {count} / {at}",
  },
};

function loadLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "zh" ? "zh" : "en";
  } catch (error) {
    return "en";
  }
}

function t(key, vars) {
  const pack = COPY[state.lang] || COPY.en;
  const raw = pack[key] != null ? pack[key] : COPY.en[key];
  const template = raw == null ? key : raw;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => (vars[name] == null ? "" : String(vars[name])));
}

function text(value) {
  if (state.lang !== "zh" || value == null) return value;
  const dict = window.FIELD_ZH;
  if (dict && Object.prototype.hasOwnProperty.call(dict, value)) return dict[value];
  return value;
}

function kindText(kind) {
  if (state.lang !== "zh") return kind;
  return { Bird: "鳥", Mammal: "哺乳動物", Reptile: "爬行動物", Amphibian: "兩棲動物" }[kind] || text(kind);
}

function creditText(raw) {
  if (state.lang !== "zh") return raw;
  if (raw === "Public domain (CC0), via iNaturalist") return "公有領域（CC0），來自 iNaturalist";
  return raw
    .replace(/^Photo: /, "照片：")
    .replace(/, via iNaturalist$/, "，來自 iNaturalist")
    .replace(/, via Wikimedia Commons$/, "，來自維基共享資源");
}

function ensureZhFont() {
  if (document.querySelector("link[data-zh-font]")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;700&family=Noto+Serif+TC:wght@500;600&display=swap";
  link.setAttribute("data-zh-font", "");
  document.head.appendChild(link);
}

function applyLang() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant-TW" : "en";
  document.title = t("title");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("description"));
  if (state.lang === "zh") ensureZhFont();
}

function setLang(next) {
  if (next !== "en" && next !== "zh") return;
  if (state.lang === next) return;
  state.lang = next;
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch (error) {
    /* the choice still applies for this visit */
  }
  applyLang();
  render();
}

const GROUPS = {
  animals: {
    id: "animals",
    label: "Animals",
    mark: "Paw",
    blurb: "Mammals, reptiles, and amphibians. No birds.",
  },
  birds: {
    id: "birds",
    label: "Birds",
    mark: "Wing",
    blurb: "Only birds, from the obvious ones to the ones that look alike.",
  },
  mix: {
    id: "mix",
    label: "Mix",
    mark: "Both",
    blurb: "Animals and birds in the same sitting.",
  },
};

const BADGE_AT = 10;
const STORE_KEY = "which-is-collection";
const SEEN_KEY = "which-is-seen";

const state = {
  lang: loadLang(),
  screen: "home",
  groupId: null,
  levelId: null,
  rounds: [],
  roundIndex: 0,
  options: [],
  eliminated: new Set(),
  status: "",
  lock: false,
};

let collection = loadCollection();

function loadCollection() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && saved.streak && saved.badges) return saved;
  } catch (error) {
    /* keep a fresh collection if storage is unreadable */
  }
  return { streak: { side: null, count: 0 }, badges: { animal: false, bird: false }, pending: null };
}

function saveCollection() {
  localStorage.setItem(STORE_KEY, JSON.stringify(collection));
}

function sideOf(creature) {
  return creature.kind === "Bird" ? "bird" : "animal";
}

function noteResult(round) {
  if (round.noted) return;
  round.noted = true;
  if (!round.correct) {
    collection.streak = { side: null, count: 0 };
    saveCollection();
    return;
  }
  const side = sideOf(round.creature);
  if (collection.streak.side === side) collection.streak.count += 1;
  else collection.streak = { side, count: 1 };
  if (collection.streak.count >= BADGE_AT && !collection.badges[side]) collection.pending = side;
  saveCollection();
}

function collectBadge() {
  if (!collection.pending) return;
  collection.badges[collection.pending] = true;
  collection.pending = null;
  saveCollection();
  render();
}

function streakLine(round) {
  if (round && !round.correct) return t("streakMiss");
  const { side, count } = collection.streak;
  if (!side || !count) return t("streakEmpty");
  const label = t(side === "bird" ? "badge.bird.short" : "badge.animal.short");
  const vars = { label, count, at: BADGE_AT };
  if (collection.badges[side]) return t("streakCollected", vars);
  if (count >= BADGE_AT) return t("streakReady", vars);
  return t("streakProgress", vars);
}

function badgeCopy(side) {
  const kind = side === "bird" ? "bird" : "animal";
  return {
    mark: t(`badge.${kind}.mark`),
    klass: side === "bird" ? "birds" : "animals",
    title: t(`badge.${kind}.title`),
    line: t(`badge.${kind}.line`),
  };
}

function badgeOffer() {
  const side = collection.pending;
  if (!side) return "";
  const item = badgeCopy(side);
  return `
    <section class="badge-offer">
      <span class="mark ${item.klass}">${item.mark}</span>
      <span class="copy">
        <strong>${item.title}</strong>
        <span>${item.line}</span>
      </span>
      <button class="primary" type="button" data-action="collect">${esc(t("collect"))}</button>
    </section>
  `;
}

function badgeRow() {
  return `<div class="badge-row">${["animal", "bird"].map((side) => {
    const item = badgeCopy(side);
    const earned = collection.badges[side];
    const pending = collection.pending === side;
    const status = earned ? t("collected") : pending ? t("ready") : t("notYet");
    const button = pending
      ? `<button class="primary" type="button" data-action="collect">${esc(t("collect"))}</button>`
      : "";
    return `
      <article class="badge ${earned ? "earned" : ""}">
        <span class="mark ${item.klass}">${item.mark}</span>
        <span class="copy">
          <strong>${item.title}</strong>
          <span>${status}${state.lang === "zh" ? "，" : ". "}${item.line}</span>
        </span>
        ${button}
      </article>
    `;
  }).join("")}</div>`;
}

function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function level() {
  return LEVELS[state.levelId];
}

function current() {
  return state.rounds[state.roundIndex];
}

function guessesLeft() {
  return 2 - current().guesses.length;
}

function group() {
  return GROUPS[state.groupId];
}

function deck(levelId) {
  const list = CREATURES[levelId];
  if (state.groupId === "birds") return list.filter((creature) => creature.kind === "Bird");
  if (state.groupId === "animals") return list.filter((creature) => creature.kind !== "Bird");
  return list.slice();
}

function chooseGroup(groupId) {
  state.groupId = groupId;
  state.levelId = null;
  state.screen = "levels";
  render();
}

function loadSeen() {
  try {
    const saved = JSON.parse(localStorage.getItem(SEEN_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {
    /* start over if storage is unreadable */
  }
  return [];
}

function pickFresh(pool) {
  const seen = loadSeen();
  const seenIndex = new Map();
  seen.forEach((name, index) => seenIndex.set(name, index));
  const unseen = shuffle(pool.filter((creature) => !seenIndex.has(creature.name)));
  const oldest = pool
    .filter((creature) => seenIndex.has(creature.name))
    .sort((a, b) => seenIndex.get(a.name) - seenIndex.get(b.name));
  const picked = unseen.concat(oldest).slice(0, ROUND_COUNT);
  const pickedNames = new Set(picked.map((creature) => creature.name));
  const kept = seen.filter((name) => !pickedNames.has(name));
  localStorage.setItem(SEEN_KEY, JSON.stringify(kept.concat(picked.map((creature) => creature.name))));
  return shuffle(picked);
}

function start(levelId) {
  const pool = pickFresh(deck(levelId));
  state.levelId = levelId;
  state.rounds = pool.map((creature) => ({
    creature,
    correct: false,
    guesses: [],
  }));
  state.roundIndex = 0;
  beginRound();
}

function beginRound() {
  state.options = shuffle(current().creature.options);
  state.eliminated = new Set();
  state.status = "";
  state.lock = false;
  state.screen = "play";
  render();
}

function choose(name) {
  if (state.screen !== "play" || state.lock || state.eliminated.has(name)) return;
  const round = current();
  round.guesses.push(name);
  if (name === round.creature.name) {
    round.correct = true;
    noteResult(round);
    state.lock = true;
    state.screen = "reveal";
    render();
    return;
  }
  state.eliminated.add(name);
  if (round.guesses.length >= 2) {
    noteResult(round);
    state.lock = true;
    state.screen = "reveal";
    render();
    return;
  }
  state.status = t("notIt", { name: text(name) });
  render();
}

function next() {
  if (state.roundIndex + 1 >= state.rounds.length) {
    state.screen = "summary";
    render();
    return;
  }
  state.roundIndex += 1;
  beginRound();
}

function home() {
  state.screen = "home";
  state.groupId = null;
  state.levelId = null;
  render();
}

function showLevels() {
  state.screen = "levels";
  state.levelId = null;
  render();
}

function outcome(round) {
  if (!round.correct) return t("missedBoth");
  if (round.guesses.length === 1) return t("namedFirst");
  return t("namedSecond");
}

function summaryLine(score) {
  if (score === state.rounds.length) return t("cleanCard");
  if (score === 0) return t("guideNamed");
  return t("goodSitting");
}

function langToggle() {
  return `
    <div class="lang-bar">
      <span class="lang-label" id="lang-label">${esc(t("langLabel"))}</span>
      <div class="lang-toggle" role="group" aria-labelledby="lang-label">
        <button type="button" data-action="lang" data-lang="en" aria-pressed="${state.lang === "en"}">English</button>
        <button type="button" data-action="lang" data-lang="zh" aria-pressed="${state.lang === "zh"}">中文</button>
      </div>
    </div>
  `;
}

function renderHome() {
  return `
    ${langToggle()}
    <p class="kicker">${esc(t("kicker"))}</p>
    <h1>${esc(t("brand"))}</h1>
    <p class="lede">${esc(t("lede"))}</p>
    ${badgeRow()}
    <p class="streak">${esc(streakLine())}</p>
    <p class="note">${esc(t("homeNote"))}</p>
    <div class="levels">${groupCards()}</div>
  `;
}

function groupCards() {
  return ["animals", "birds", "mix"].map((id) => `
      <button class="level" type="button" data-action="group" data-group="${id}">
        <span class="mark ${id}">${esc(t(`group.${id}.mark`))}</span>
        <span class="copy">
          <strong>${esc(t(`group.${id}.label`))}</strong>
          <span>${esc(t(`group.${id}.blurb`))}</span>
        </span>
        <span class="go" aria-hidden="true">→</span>
      </button>
    `).join("");
}

function renderLevels() {
  const cards = ["easy", "medium", "hard"].map((id) => `
      <button class="level" type="button" data-action="level" data-level="${id}">
        <span class="mark ${id}">${esc(t(`level.${id}.mark`))}</span>
        <span class="copy">
          <strong>${esc(t(`level.${id}.label`))}</strong>
          <span>${esc(t(`level.${id}.blurb`))}</span>
        </span>
        <span class="go" aria-hidden="true">→</span>
      </button>
    `).join("");

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">${esc(t("brand"))}</button>
    </div>
    <p class="kicker">${esc(t(`group.${state.groupId}.label`))}</p>
    <h1 class="ask">${esc(t("ask"))}</h1>
    <div class="levels">${cards}</div>
    <p class="note">${esc(t("levelsNote"))} <button class="text-back" type="button" data-action="home">${esc(t("changeField"))}</button></p>
  `;
}

function renderPlay() {
  const item = level();
  const round = current();
  const creature = round.creature;
  const primary = text(creature[item.clue]);
  const showExtra = round.guesses.length === 1;
  const letters = ["A", "B", "C"];
  const choices = state.options.map((name, index) => `
    <button class="choice" type="button" data-action="guess" data-index="${index}" ${state.eliminated.has(name) ? "disabled" : ""}>
      <span class="letter">${letters[index]}</span>
      <span class="name">${esc(text(name))}</span>
    </button>
  `).join("");
  const extra = showExtra ? `
    <div class="extra">
      <p class="clue-label">${esc(t(`clue.${item.id}.extra`))}</p>
      <p class="clue">${esc(text(creature[item.extra]))}</p>
    </div>
  ` : "";
  const left = guessesLeft();

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">${esc(t("brand"))}</button>
      <p class="meta">${esc(t(`group.${state.groupId}.label`))} · <span class="pill ${item.id}">${esc(t(`level.${item.id}.label`))}</span> ${state.roundIndex + 1} / ${state.rounds.length}</p>
    </div>
    <p class="clue-label" id="clue-label">${esc(t(`clue.${item.id}.clue`))}</p>
    <h1 class="clue" tabindex="-1">${esc(primary)}</h1>
    ${extra}
    <p class="status" tabindex="-1">${esc(state.status)}</p>
    <div class="choices">${choices}</div>
    <p class="guesses">${esc(t(left === 1 ? "oneLeft" : "manyLeft", { n: left }))}</p>
    <p class="streak">${esc(streakLine())}</p>
  `;
}

function imageExtension(url) {
  const path = String(url).split(/[?#]/)[0];
  const match = path.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : "jpg";
}

function downloadName(creature) {
  const base = text(creature.name).replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim() || "photo";
  return `${base}.${imageExtension(creature.image)}`;
}

function sameOriginImage(url) {
  try {
    return new URL(url, window.location.href).origin === window.location.origin;
  } catch (error) {
    return false;
  }
}

function downloadAnchor(creature, className) {
  const href = esc(creature.image);
  const label = esc(t("downloadLabel", { name: text(creature.name) }));
  const word = esc(t("download"));
  if (!sameOriginImage(creature.image)) {
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${word}</a>`;
  }
  return `<a class="${className}" href="${href}" download="${esc(downloadName(creature))}" aria-label="${label}">${word}</a>`;
}

function renderReveal() {
  const round = current();
  const creature = round.creature;
  const last = state.roundIndex + 1 >= state.rounds.length;
  const missed = round.guesses.filter((name) => name !== creature.name);
  const shown = text(creature.name);
  const missLine = missed.length
    ? `<p class="guesses">${esc(missed.length === 1 ? t("triedOne", { a: text(missed[0]) }) : t("triedTwo", { a: text(missed[0]), b: text(missed[1]) }))}</p>`
    : "";

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">${esc(t("brand"))}</button>
      <p class="meta">${esc(t(`group.${state.groupId}.label`))} · <span class="pill ${level().id}">${esc(t(`level.${level().id}.label`))}</span> ${state.roundIndex + 1} / ${state.rounds.length}</p>
    </div>
    <div class="photo-wrap" data-name="${esc(shown)}">
      <button class="photo-open" type="button" data-action="magnify" aria-label="${esc(t("magnifyLabel", { name: shown }))}">
        <img src="${esc(creature.image)}" alt="${esc(shown)}" />
        <span class="photo-zoom-label" aria-hidden="true">${esc(t("larger"))}</span>
      </button>
      ${downloadAnchor(creature, "photo-save")}
    </div>
    <div class="outcome">
      <p>${esc(outcome(round))}</p>
      <p class="pill ${level().id}">${esc(kindText(creature.kind))}</p>
    </div>
    <h1 class="creature-name">${esc(shown)}</h1>
    <p class="scientific">${esc(creature.scientific)}</p>
    <p class="found-label">${esc(t("found"))}</p>
    <p class="found">${esc(text(creature.found))}</p>
    <p class="about">${esc(text(creature.about))}</p>
    ${missLine}
    <p class="streak">${esc(streakLine(round))}</p>
    ${badgeOffer()}
    <p class="credit"><a href="${esc(creature.creditUrl)}" target="_blank" rel="noopener noreferrer">${esc(creditText(creature.credit))}</a></p>
    <div class="actions">
      <button class="primary" type="button" data-action="next">${esc(last ? t("seeCard") : t("nextCreature"))}</button>
    </div>
  `;
}

function renderSummary() {
  const score = state.rounds.filter((round) => round.correct).length;
  const rows = state.rounds.map((round) => `
    <li>
      <span>${esc(text(round.creature.name))}</span>
      <span class="tag ${round.correct ? "yes" : "no"}">${esc(round.correct ? (round.guesses.length === 1 ? t("tagFirst") : t("tagSecond")) : t("tagMissed"))}</span>
    </li>
  `).join("");

  return `
    <p class="kicker">${esc(t(`group.${state.groupId}.label`))} · ${esc(t(`level.${level().id}.label`))}</p>
    <h1 class="score">${score} <span>${esc(t("ofScore", { n: state.rounds.length }))}</span></h1>
    <p class="lede">${summaryLine(score)}</p>
    <p class="streak">${esc(streakLine())}</p>
    ${badgeOffer()}
    <ul class="results">${rows}</ul>
    <div class="actions">
      <button class="primary" type="button" data-action="level" data-level="${level().id}">${esc(t("sameLevel"))}</button>
      <button class="ghost" type="button" data-action="levels">${esc(t("otherLevels"))}</button>
    </div>
  `;
}

function render() {
  closeMagnify({ restore: false });
  const view = {
    home: renderHome,
    levels: renderLevels,
    play: renderPlay,
    reveal: renderReveal,
    summary: renderSummary,
  }[state.screen];
  app.innerHTML = view();
  const focus = app.querySelector(state.status ? ".status" : "h1");
  if (focus) focus.focus({ preventScroll: true });
  window.scrollTo(0, 0);
  const img = app.querySelector(".photo-wrap img");
  if (img) {
    const markMissing = () => {
      const wrap = img.closest(".photo-wrap");
      if (wrap) wrap.classList.add("no-photo");
    };
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  }
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !app.contains(button)) return;
  const action = button.dataset.action;
  if (action === "group") chooseGroup(button.dataset.group);
  if (action === "level") start(button.dataset.level);
  if (action === "guess") choose(state.options[Number(button.dataset.index)]);
  if (action === "next") next();
  if (action === "levels") showLevels();
  if (action === "home") home();
  if (action === "collect") collectBadge();
  if (action === "magnify") openMagnify();
  if (action === "lang") setLang(button.dataset.lang);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.querySelector(".lightbox")) {
    event.preventDefault();
    closeMagnify();
    return;
  }
  if (state.screen !== "play") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const number = Number(event.key);
  if (number >= 1 && number <= state.options.length) {
    choose(state.options[number - 1]);
  }
});

function magnifyFocusables(layer) {
  return [...layer.querySelectorAll("button, a[href]")].filter((el) => el.getClientRects().length > 0);
}

function toggleMagnifyZoom(layer) {
  layer.classList.toggle("is-full");
  const zoom = layer.querySelector("[data-action='zoom-photo']");
  if (!zoom) return;
  const full = layer.classList.contains("is-full");
  zoom.textContent = full ? t("fit") : t("fullSize");
  zoom.setAttribute("aria-label", full ? t("fitLabel") : t("fullLabel"));
}

function onMagnifyClick(event) {
  const layer = event.currentTarget;
  if (event.target.closest("[data-action='close-photo']")) {
    closeMagnify();
    return;
  }
  if (event.target.closest("a")) return;
  const zoom = event.target.closest("[data-action='zoom-photo']");
  const photo = event.target.closest(".lightbox-frame img");
  if (zoom || photo) {
    if (photo && !window.matchMedia("(max-width: 640px)").matches) return;
    toggleMagnifyZoom(layer);
    return;
  }
  closeMagnify();
}

function onMagnifyKeydown(event) {
  if (event.key !== "Tab") return;
  const items = magnifyFocusables(event.currentTarget);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openMagnify() {
  if (state.screen !== "reveal") return;
  const creature = current().creature;
  const wrap = app.querySelector(".photo-wrap");
  if (!creature || !wrap || wrap.classList.contains("no-photo") || document.querySelector(".lightbox")) return;
  const layer = document.createElement("div");
  layer.className = "lightbox";
  layer.setAttribute("role", "dialog");
  layer.setAttribute("aria-modal", "true");
  const shown = text(creature.name);
  layer.setAttribute("aria-label", t("lightboxLabel", { name: shown }));
  layer.innerHTML = `
    <div class="lightbox-bar">
      <button class="lightbox-zoom" type="button" data-action="zoom-photo" aria-label="${esc(t("fullLabel"))}">${esc(t("fullSize"))}</button>
      ${downloadAnchor(creature, "lightbox-save")}
      <button class="lightbox-close" type="button" data-action="close-photo">${esc(t("close"))}</button>
    </div>
    <div class="lightbox-stage">
      <div class="lightbox-frame">
        <img src="${esc(creature.image)}" alt="${esc(shown)}" />
      </div>
    </div>
  `;
  document.body.appendChild(layer);
  document.body.classList.add("lightbox-open");
  layer.addEventListener("click", onMagnifyClick);
  layer.addEventListener("keydown", onMagnifyKeydown);
  layer.querySelector("[data-action='close-photo']").focus();
}

function closeMagnify(options = {}) {
  const layer = document.querySelector(".lightbox");
  if (layer) layer.remove();
  document.body.classList.remove("lightbox-open");
  if (options.restore === false) return;
  const opener = app.querySelector(".photo-open");
  if (opener) opener.focus({ preventScroll: true });
}

function checkDeck() {
  Object.entries(CREATURES).forEach(([id, list]) => {
    const birds = list.filter((creature) => creature.kind === "Bird").length;
    const reserve = ROUND_COUNT * 2;
    if (birds < reserve || list.length - birds < reserve) {
      throw new Error(`${id} needs ${reserve} birds and ${reserve} animals`);
    }
    const used = new Set();
    list.forEach((creature) => {
      if (!creature.options.includes(creature.name) || new Set(creature.options).size !== 3) {
        throw new Error(`Bad options for ${creature.name} on ${id}`);
      }
      creature.options.forEach((name) => {
        if (used.has(name)) throw new Error(`Repeated option ${name} on ${id}`);
        used.add(name);
      });
      if (!creature.found) throw new Error(`No range for ${creature.name}`);
    });
  });
}

checkDeck();
applyLang();
render();
