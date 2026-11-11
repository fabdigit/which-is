const { rounds: ROUND_COUNT, levels: LEVELS, creatures: CREATURES } = window.FIELD;

const app = document.querySelector("#app");

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

const state = {
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
  if (round && !round.correct) return "That miss cleared the streak.";
  const { side, count } = collection.streak;
  if (!side || !count) return "Ten in a row of one kind earns its badge.";
  const label = side === "bird" ? "Bird" : "Animal";
  if (collection.badges[side]) return `${label} streak ${count}. Badge collected.`;
  if (count >= BADGE_AT) return `${label} streak ${count}. Badge ready to collect.`;
  return `${label} streak ${count} of ${BADGE_AT}`;
}

function badgeCopy(side) {
  if (side === "bird") {
    return { mark: "Wing", klass: "birds", title: "Bird badge", line: "Ten birds, named in a row." };
  }
  return { mark: "Paw", klass: "animals", title: "Animal badge", line: "Ten animals, named in a row." };
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
      <button class="primary" type="button" data-action="collect">Collect</button>
    </section>
  `;
}

function badgeRow() {
  return `<div class="badge-row">${["animal", "bird"].map((side) => {
    const item = badgeCopy(side);
    const earned = collection.badges[side];
    const pending = collection.pending === side;
    const status = earned ? "Collected" : pending ? "Ready" : "Not yet";
    const button = pending
      ? `<button class="primary" type="button" data-action="collect">Collect</button>`
      : "";
    return `
      <article class="badge ${earned ? "earned" : ""}">
        <span class="mark ${item.klass}">${item.mark}</span>
        <span class="copy">
          <strong>${item.title}</strong>
          <span>${status}. ${item.line}</span>
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

function start(levelId) {
  const pool = shuffle(deck(levelId)).slice(0, ROUND_COUNT);
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
  state.status = `Not the ${name}. One guess left.`;
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
  if (!round.correct) return "Both guesses missed.";
  if (round.guesses.length === 1) return "Named on the first guess.";
  return "Named on the second guess.";
}

function summaryLine(score) {
  if (score === state.rounds.length) return "A clean field card.";
  if (score === 0) return "The guide did the naming this time.";
  return "A good sitting.";
}

function renderHome() {
  return `
    <p class="kicker">Field quiz</p>
    <h1>Which is?</h1>
    <p class="lede">What animal or bird is it? Choose a field first. Then pick how hard the clues are. Three names, two guesses, and a photo either way.</p>
    ${badgeRow()}
    <p class="streak">${esc(streakLine())}</p>
    <p class="note">A miss, or a switch from animals to birds, starts that count over. The streak carries into the next sitting.</p>
    <div class="levels">${groupCards()}</div>
  `;
}

function groupCards() {
  return ["animals", "birds", "mix"].map((id) => {
    const item = GROUPS[id];
    return `
      <button class="level" type="button" data-action="group" data-group="${id}">
        <span class="mark ${id}">${item.mark}</span>
        <span class="copy">
          <strong>${esc(item.label)}</strong>
          <span>${esc(item.blurb)}</span>
        </span>
        <span class="go" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");
}

function renderLevels() {
  const marks = { easy: "Look", medium: "Home", hard: "Call" };
  const cards = ["easy", "medium", "hard"].map((id) => {
    const item = LEVELS[id];
    return `
      <button class="level" type="button" data-action="level" data-level="${id}">
        <span class="mark ${id}">${marks[id]}</span>
        <span class="copy">
          <strong>${esc(item.label)}</strong>
          <span>${esc(item.blurb)}</span>
        </span>
        <span class="go" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">Which is?</button>
    </div>
    <p class="kicker">${esc(group().label)}</p>
    <h1 class="ask">How hard?</h1>
    <div class="levels">${cards}</div>
    <p class="note">Five creatures. Miss once and a second clue appears before the last guess. <button class="text-back" type="button" data-action="home">Change field</button></p>
  `;
}

function renderPlay() {
  const item = level();
  const round = current();
  const creature = round.creature;
  const primary = creature[item.clue];
  const showExtra = round.guesses.length === 1;
  const letters = ["A", "B", "C"];
  const choices = state.options.map((name, index) => `
    <button class="choice" type="button" data-action="guess" data-index="${index}" ${state.eliminated.has(name) ? "disabled" : ""}>
      <span class="letter">${letters[index]}</span>
      <span class="name">${esc(name)}</span>
    </button>
  `).join("");
  const extra = showExtra ? `
    <div class="extra">
      <p class="clue-label">${esc(item.extraLabel)}</p>
      <p class="clue">${esc(creature[item.extra])}</p>
    </div>
  ` : "";

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">Which is?</button>
      <p class="meta">${esc(group().label)} · <span class="pill ${item.id}">${esc(item.label)}</span> ${state.roundIndex + 1} / ${state.rounds.length}</p>
    </div>
    <p class="clue-label" id="clue-label">${esc(item.clueLabel)}</p>
    <h1 class="clue" tabindex="-1">${esc(primary)}</h1>
    ${extra}
    <p class="status" tabindex="-1">${esc(state.status)}</p>
    <div class="choices">${choices}</div>
    <p class="guesses">${guessesLeft()} ${guessesLeft() === 1 ? "guess" : "guesses"} left · keys 1, 2, 3</p>
    <p class="streak">${esc(streakLine())}</p>
  `;
}

function renderReveal() {
  const round = current();
  const creature = round.creature;
  const last = state.roundIndex + 1 >= state.rounds.length;
  const missed = round.guesses.filter((name) => name !== creature.name);
  const missLine = missed.length
    ? `<p class="guesses">You tried ${esc(missed.join(" and "))}.</p>`
    : "";

  return `
    <div class="top">
      <button class="brand" type="button" data-action="home">Which is?</button>
      <p class="meta">${esc(group().label)} · <span class="pill ${level().id}">${esc(level().label)}</span> ${state.roundIndex + 1} / ${state.rounds.length}</p>
    </div>
    <div class="photo-wrap" data-name="${esc(creature.name)}">
      <img src="${esc(creature.image)}" alt="${esc(creature.name)}" />
    </div>
    <div class="outcome">
      <p>${esc(outcome(round))}</p>
      <p class="pill ${level().id}">${esc(creature.kind)}</p>
    </div>
    <h1 class="creature-name">${esc(creature.name)}</h1>
    <p class="scientific">${esc(creature.scientific)}</p>
    <p class="found-label">Found</p>
    <p class="found">${esc(creature.found)}</p>
    <p class="about">${esc(creature.about)}</p>
    ${missLine}
    <p class="streak">${esc(streakLine(round))}</p>
    ${badgeOffer()}
    <p class="credit"><a href="${esc(creature.creditUrl)}" target="_blank" rel="noopener noreferrer">${esc(creature.credit)}</a></p>
    <div class="actions">
      <button class="primary" type="button" data-action="next">${last ? "See your card" : "Next creature"}</button>
    </div>
  `;
}

function renderSummary() {
  const score = state.rounds.filter((round) => round.correct).length;
  const rows = state.rounds.map((round) => `
    <li>
      <span>${esc(round.creature.name)}</span>
      <span class="tag ${round.correct ? "yes" : "no"}">${round.correct ? (round.guesses.length === 1 ? "First guess" : "Second guess") : "Missed"}</span>
    </li>
  `).join("");

  return `
    <p class="kicker">${esc(group().label)} · ${esc(level().label)}</p>
    <h1 class="score">${score} <span>of ${state.rounds.length}</span></h1>
    <p class="lede">${summaryLine(score)}</p>
    <p class="streak">${esc(streakLine())}</p>
    ${badgeOffer()}
    <ul class="results">${rows}</ul>
    <div class="actions">
      <button class="primary" type="button" data-action="level" data-level="${level().id}">Same level</button>
      <button class="ghost" type="button" data-action="levels">Other levels</button>
    </div>
  `;
}

function render() {
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
    img.addEventListener("error", () => img.parentElement.classList.add("no-photo"));
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
});

document.addEventListener("keydown", (event) => {
  if (state.screen !== "play") return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const number = Number(event.key);
  if (number >= 1 && number <= state.options.length) {
    choose(state.options[number - 1]);
  }
});

function checkDeck() {
  Object.entries(CREATURES).forEach(([id, list]) => {
    const birds = list.filter((creature) => creature.kind === "Bird").length;
    if (birds < ROUND_COUNT || list.length - birds < ROUND_COUNT) {
      throw new Error(`${id} needs ${ROUND_COUNT} birds and ${ROUND_COUNT} animals`);
    }
    list.forEach((creature) => {
      if (!creature.options.includes(creature.name) || new Set(creature.options).size !== 3) {
        throw new Error(`Bad options for ${creature.name} on ${id}`);
      }
      if (!creature.found) throw new Error(`No range for ${creature.name}`);
    });
  });
}

checkDeck();
render();
