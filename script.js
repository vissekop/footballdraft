const formationPositionsData = { /* your formation data as before */ };
const allFormations = Object.keys(formationPositionsData);

let players = [];
let formationPositions = [];
let currentPosition = null;
let pickerOpen = false;
let squad = {};

fetch("players.json")
  .then(res => res.json())
  .then(data => players = data);

function getRandomFormations(amount = 3) {
  return allFormations.sort(() => 0.5 - Math.random()).slice(0, amount);
}

function renderFormationChoices() {
  const container = document.getElementById("formationOptions");
  container.innerHTML = "";

  const randomFormations = getRandomFormations(3);

  randomFormations.forEach(formation => {
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

function startDraft(formation) {
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");

  formationPositions = formationPositionsData[formation];
  renderPitch();
}

function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  const maxRow = Math.max(...formationPositions.map(p => p.row));
  pitch.style.gridTemplateRows = `repeat(${maxRow + 1}, 80px)`;

  formationPositions.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "position";

    if (squad[index]) {
      div.innerHTML = `
        <img src="images/players/${squad[index].photo}" class="player-photo">
        <span>${squad[index].name}</span>
      `;
    } else {
      div.innerText = p.pos;
    }

    div.style.gridRowStart = p.row + 1;
    div.style.gridColumnStart = p.col + 1;

    // Handle interactivity
    div.classList.remove("selectable");
    div.onclick = null;
    div.style.cursor = "default";

    if (!squad[index] && !pickerOpen) {
      div.classList.add("selectable");
      div.style.cursor = "pointer";
      div.onclick = () => openPicker(p.pos, index);
    } else if (pickerOpen) {
      div.style.cursor = "not-allowed";
    }

    pitch.appendChild(div);
  });
}

function openPicker(position, index) {
  if (pickerOpen || squad[index]) return;

  pickerOpen = true;
  currentPosition = index;

  document.getElementById("pitchScreen").classList.add("hidden");
  document.getElementById("pickerScreen").classList.remove("hidden");

  const eligible = players.filter(p =>
    p.positions.includes(position) &&
    !Object.values(squad).some(s => s && s.name === p.name)
  );

  const options = document.getElementById("options");
  options.innerHTML = "";

  eligible.sort(() => 0.5 - Math.random()).slice(0, 4)
    .forEach(player => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="images/players/${player.photo}" alt="${player.name}">
        <b>${player.name}</b>
        <span>${player.club}</span>
      `;
      card.onclick = () => pickPlayer(player);
      options.appendChild(card);
    });
}

function pickPlayer(player) {
  squad[currentPosition] = player;
  pickerOpen = false;
  currentPosition = null;

  document.getElementById("pickerScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");
  renderPitch();
}

// Restart draft
document.getElementById("restartBtn").onclick = () => {
  if (pickerOpen) return;
  squad = {};
  renderFormationChoices();
  document.getElementById("formationScreen").classList.remove("hidden");
  document.getElementById("pitchScreen").classList.add("hidden");
  document.getElementById("pickerScreen").classList.add("hidden");
};

// Initial render
renderFormationChoices();
