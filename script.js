let players = [];
let formationPositions = [];
let currentPosition = null;
let squad = {};

fetch("players.json")
  .then(res => res.json())
  .then(data => players = data);

function startDraft(formation) {
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");

  if (formation === "4-3-3") {
    formationPositions = ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LW", "ST", "RW"];
  }

  if (formation === "4-4-2") {
    formationPositions = ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "ST", "ST"];
  }

  renderPitch();
}

function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  formationPositions.forEach((pos, index) => {
    const div = document.createElement("div");
    div.className = "position";
    div.innerText = squad[index] ? squad[index].name : pos;
    div.onclick = () => openPicker(pos, index);
    pitch.appendChild(div);
  });
}

function openPicker(position, index) {
  currentPosition = index;
  document.getElementById("pickerScreen").classList.remove("hidden");

  const eligible = players.filter(p => p.positions.includes(position));
  const randomSix = eligible.sort(() => 0.5 - Math.random()).slice(0, 6);

  const options = document.getElementById("options");
  options.innerHTML = "";

  randomSix.forEach(player => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<b>${player.name}</b><br>${player.club}<br>Rating: ${player.rating}`;
    card.onclick = () => pickPlayer(player);
    options.appendChild(card);
  });
}

function pickPlayer(player) {
  squad[currentPosition] = player;
  document.getElementById("pickerScreen").classList.add("hidden");
  renderPitch();
}
