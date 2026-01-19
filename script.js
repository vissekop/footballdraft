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
  // Strikers
  { pos: "ST", row: 0, col: 1 },
  { pos: "ST", row: 0, col: 3 },

  // Midfielders
  { pos: "LM", row: 1, col: 0 },
  { pos: "CM", row: 1, col: 1 },
  { pos: "CM", row: 1, col: 3 },
  { pos: "RM", row: 1, col: 4 },

  // Defenders
  { pos: "LB", row: 2, col: 0 },
  { pos: "CB", row: 2, col: 1 },
  { pos: "CB", row: 2, col: 3 },
  { pos: "RB", row: 2, col: 4 },

  // Goalkeeper (centered between CBs)
  { pos: "GK", row: 3, col: 1 } // will span columns 1–3
]





};

let players = [];
let formationPositions = [];
let currentPosition = null;
let squad = {};

fetch("players.json")
  .then(res => res.json())
  .then(data => players = data);

function startDraft(formation) {
  // hide formation screen, show pitch
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");

  // get positions with row/column info from formation blueprint
  formationPositions = formationPositionsData[formation];

  renderPitch();
}





function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  // define grid
  pitch.style.gridTemplateRows = `repeat(4, 80px)`; // 4 lines
  pitch.style.gridTemplateColumns = `repeat(5, 1fr)`; // 5 columns

formationPositions.forEach((p, index) => {
  const div = document.createElement("div");
  div.className = "position";
  div.innerText = squad[index] ? squad[index].name : p.pos;

  div.style.gridRowStart = p.row + 1;

  if (p.pos === "GK") {
    // GK spans columns 2–3 (between the CBs)
    div.style.gridColumnStart = 2;
    div.style.gridColumnEnd = 3;
    div.style.textAlign = "center"; // center text inside
  } else {
    div.style.gridColumnStart = p.col + 1;
    div.style.gridColumnEnd = "auto";
  }

  div.onclick = () => openPicker(p.pos, index);
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
