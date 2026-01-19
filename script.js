const formationPositionsData = {
  "4-3-3": [
    // Forwards
    { pos: "LW", row: 0, col: 0 },
    { pos: "ST", row: 0, col: 2 },
    { pos: "RW", row: 0, col: 4 },

    // Midfield
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 2 },
    { pos: "CM", row: 1, col: 3 },

    // Defense
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },

    // Goalkeeper
    { pos: "GK", row: 3, col: 2 } // centered under CBs
  ],

"4-4-2": [
  // Strikers
  { pos: "ST", row: 0, col: 1 },
  { pos: "ST", row: 0, col: 3 },  // spread out

  // Midfielders
  { pos: "LM", row: 1, col: 0 },
  { pos: "CM", row: 1, col: 1 },
  { pos: "CM", row: 1, col: 3 },
  { pos: "RM", row: 1, col: 4 },

  // Defenders
  { pos: "LB", row: 2, col: 0 },
  { pos: "CB", row: 2, col: 1 },
  { pos: "CB", row: 2, col: 3 },  // spread out
  { pos: "RB", row: 2, col: 4 },

  // Goalkeeper
  { pos: "GK", row: 3, col: 0 } // column will be set dynamically
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
  // hide formation selection, show pitch
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");

  formationPositions = formationPositionsData[formation];
  renderPitch();
}

function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  // grid layout
  pitch.style.gridTemplateRows = `repeat(4, 80px)`;
  pitch.style.gridTemplateColumns = `repeat(5, 1fr)`;

  formationPositions.forEach((p, index) => {
  const div = document.createElement("div");
  div.className = "position";
  div.innerText = squad[index] ? squad[index].name : p.pos;

  div.style.gridRowStart = p.row + 1;

if (p.pos === "GK") {
    // Find CBs in row 2
    const cbCols = formationPositions
        .filter(pos => pos.row === 2 && pos.pos.includes("CB"))
        .map(pos => pos.col);

    const minCol = Math.min(cbCols[0], cbCols[1]);
    const maxCol = Math.max(cbCols[0], cbCols[1]);

    const centerCol = Math.floor((minCol + maxCol) / 2) + 1;

    div.style.gridColumnStart = centerCol;
    div.style.gridColumnEnd = centerCol + 1;
    div.style.textAlign = "center";
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

  // Filter players eligible for this position AND not already picked
  const eligible = players.filter(p => 
      p.positions.includes(position) && 
      !Object.values(squad).some(s => s && s.name === p.name)
  );

  const options = document.getElementById("options");
  options.innerHTML = "";

  // Show a message if no players are left
  if (eligible.length === 0) {
      options.innerHTML = "<i>No eligible players left for this position</i>";
      return;
  }

  // Pick 6 random options from eligible
  const randomSix = eligible.sort(() => 0.5 - Math.random()).slice(0, 6);

  randomSix.forEach(player => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<b>${player.name}</b><br>${player.club}`; // rating removed
    card.onclick = () => pickPlayer(player);
    options.appendChild(card);
  });
}

function pickPlayer(player) {
  squad[currentPosition] = player;
  document.getElementById("pickerScreen").classList.add("hidden");
  renderPitch();
}
document.getElementById("restartBtn").onclick = () => {
    // Show the formation screen again
    document.getElementById("formationScreen").classList.remove("hidden");
    // Hide pitch and picker screens
    document.getElementById("pitchScreen").classList.add("hidden");
    document.getElementById("pickerScreen").classList.add("hidden");
    // Clear previous squad
    squad = {};
};
document.getElementById("restartBtn").onclick = () => {
    // Show formation selection
    document.getElementById("formationScreen").classList.remove("hidden");
    // Hide pitch and picker screens
    document.getElementById("pitchScreen").classList.add("hidden");
    document.getElementById("pickerScreen").classList.add("hidden");
    // Clear previous squad
    squad = {};
};
