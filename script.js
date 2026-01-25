// --- Formation Positions Data ---
const formationPositionsData = {
  "4-3-3": [
    { pos: "LW", row: 0, col: 0 },
    { pos: "ST", row: 0, col: 2 },
    { pos: "RW", row: 0, col: 4 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 2 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "GK", row: 3, col: 2 }
  ],
  "4-4-2": [
    { pos: "ST", row: 0, col: 1 },
    { pos: "ST", row: 0, col: 3 },
    { pos: "LM", row: 1, col: 0 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "RM", row: 1, col: 4 },
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "GK", row: 3, col: 2 }
  ],
  "3-4-2-1": [
    { pos: "ST", row: 0, col: 2 },
    { pos: "CAM", row: 1, col: 1 },
    { pos: "CAM", row: 1, col: 3 },
    { pos: "LM", row: 2, col: 0 },
    { pos: "CM", row: 2, col: 1 },
    { pos: "CM", row: 2, col: 3 },
    { pos: "RM", row: 2, col: 4 },
    { pos: "CB", row: 3, col: 1 },
    { pos: "CB", row: 3, col: 2 },
    { pos: "CB", row: 3, col: 3 },
    { pos: "GK", row: 4, col: 2 }
  ],
  "5-3-2": [
    { pos: "ST", row: 0, col: 1 },
    { pos: "ST", row: 0, col: 3 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 2 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 2 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "GK", row: 3, col: 2 }
  ],
  "3-4-3": [
    { pos: "LW", row: 0, col: 0 },
    { pos: "ST", row: 0, col: 2 },
    { pos: "RW", row: 0, col: 4 },
    { pos: "LM", row: 1, col: 0 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "RM", row: 1, col: 4 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 2 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "GK", row: 3, col: 2 }
  ],
  "4-2-4": [
    { pos: "LW", row: 0, col: 0 },
    { pos: "ST", row: 0, col: 1 },
    { pos: "ST", row: 0, col: 3 },
    { pos: "RW", row: 0, col: 4 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "GK", row: 3, col: 2 }
  ],
  "4-3-1-2": [
    { pos: "ST", row: 0, col: 1 },
    { pos: "ST", row: 0, col: 3 },
    { pos: "CAM", row: 1, col: 2 },
    { pos: "CM", row: 2, col: 1 },
    { pos: "CM", row: 2, col: 2 },
    { pos: "CM", row: 2, col: 3 },
    { pos: "LB", row: 3, col: 0 },
    { pos: "CB", row: 3, col: 1 },
    { pos: "CB", row: 3, col: 3 },
    { pos: "RB", row: 3, col: 4 },
    { pos: "GK", row: 4, col: 2 }
  ],
  "5-4-1": [
    { pos: "ST", row: 0, col: 2 },
    { pos: "LM", row: 1, col: 0 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 3 },
    { pos: "RM", row: 1, col: 4 },
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 2 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "GK", row: 3, col: 2 }
  ]
};

// --- Global Variables ---
const allFormations = Object.keys(formationPositionsData);
let players = [];
let formationPositions = [];
let currentPosition = null;
let pickerOpen = false;
let squad = {};

// --- Load Players ---
fetch("players.json")
  .then(res => res.json())
  .then(data => players = data);

// --- Random Formations ---
function getRandomFormations(amount = 3) {
  return [...allFormations].sort(() => 0.5 - Math.random()).slice(0, amount);
}

// --- Render Formation Options ---
function renderFormationChoices() {
  const container = document.getElementById("formationOptions");
  container.innerHTML = "";

  getRandomFormations(3).forEach(formation => {
    const div = document.createElement("div");
    div.className = "formation-option";
    div.onclick = () => startDraft(formation);
    div.innerHTML = `
      <img src="images/formations/${formation.replace(/-/g, "")}.png" alt="${formation}">
      <span>${formation}</span>
    `;
    container.appendChild(div);
  });
}

// --- Start Draft ---
function startDraft(formation) {
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");
  formationPositions = formationPositionsData[formation];
  renderPitch();
}

// --- Render Pitch ---
function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  const maxRow = Math.max(...formationPositions.map(p => p.row));
  pitch.style.gridTemplateRows = `repeat(${maxRow + 1}, 120px)`;

  formationPositions.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "position";

    if (squad[index]) {
      div.innerHTML = `
        <img src="images/players/${squad[index].photo}" class="player-photo">
        ${formatPlayerName(squad[index].name)}
      `;
    } else {
      div.innerText = p.pos;
    }

    div.style.gridRowStart = p.row + 1;
    div.style.gridColumnStart = p.col + 1;

    if (!squad[index] && !pickerOpen) {
      div.classList.add("selectable");
      div.onclick = () => openPicker(p.pos, index);
    }

    pitch.appendChild(div);
  });
}

// --- Open Player Picker ---
function openPicker(position, index) {
  if (pickerOpen || squad[index]) return;

  pickerOpen = true;
  currentPosition = index;

  document.getElementById("pitchScreen").classList.add("hidden");
  const picker = document.getElementById("pickerScreen");
  picker.classList.remove("hidden");
  picker.querySelector("h2").innerText = `Choose a player for ${position}`;

  const eligible = players.filter(p =>
    p.positions.includes(position) &&
    !Object.values(squad).some(s => s?.name === p.name)
  );

  const options = document.getElementById("options");
  options.innerHTML = "";

  eligible.sort(() => 0.5 - Math.random()).slice(0, 4).forEach(player => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="images/players/${player.photo}">
      <b>${player.name}</b>
      <span>${player.club}</span>
    `;
    card.onclick = () => pickPlayer(player);
    options.appendChild(card);
  });
}

// --- Pick Player ---
function pickPlayer(player) {
  squad[currentPosition] = player;
  pickerOpen = false;
  currentPosition = null;

  document.getElementById("pickerScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");
  renderPitch();
}

// --- Restart Draft ---
document.getElementById("restartBtn").onclick = () => {
  if (pickerOpen) return;
  squad = {};
  document.getElementById("formationScreen").classList.remove("hidden");
  document.getElementById("pitchScreen").classList.add("hidden");
  document.getElementById("pickerScreen").classList.add("hidden");
  renderFormationChoices();
};

// --- Name Formatting ---
function formatPlayerName(name) {
  const parts = name.split(" ");
  const MAX_CHARS_ONE_LINE = 16;

  if (parts.length === 1) {
    return `<span class="name one-line">${name}</span>`;
  }

  if (name.length <= MAX_CHARS_ONE_LINE) {
    return `<span class="name one-line">${name}</span>`;
  }

  return `
    <span class="name two-line">
      <span>${parts[0]}</span>
      <span>${parts.slice(1).join(" ")}</span>
    </span>
  `;
}

// --- Initial Render ---
renderFormationChoices();

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// Optional: change icon depending on state
document.addEventListener("fullscreenchange", () => {
  fullscreenBtn.textContent = document.fullscreenElement ? "🡼" : "⛶";
});
