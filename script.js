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
    { pos: "ST", row: 0, col: 2 },

    // Midfielders
    { pos: "LM", row: 1, col: 0 },
    { pos: "CM", row: 1, col: 1 },
    { pos: "CM", row: 1, col: 2 },
    { pos: "RM", row: 1, col: 3 },

    // Defenders
    { pos: "LB", row: 2, col: 0 },
    { pos: "CB", row: 2, col: 1 },
    { pos: "CB", row: 2, col: 2 },
    { pos: "RB", row: 2, col: 3 },

    // Goalkeeper (centered)
    { pos: "GK", row: 3, col: 1 } // will visually span between the CBs
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

    // Special handling for the goalkeeper
    if (p.pos === "GK") {
      // Span columns to visually center GK under CBs
      // 4-3-3: CBs at col 1 and 3 → GK col 2
      // 4-4-2: CBs at col 1 and 2 → GK col 2
      div.style.gridColumnStart = 2;
      div.style.gridColumnEnd = 3;
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
