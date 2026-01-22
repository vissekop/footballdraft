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
    { pos: "GK", row: 3, col: 2 } // dynamically centered
  ],

    "3-4-2-1": [
    { pos: "ST", row: 0, col: 2 },
    { pos: "CAM", row: 1, col: 1 },
    { pos: "CAM", row: 1, col: 3 },
    { pos: "LM", row: 2, col: 0 },
    { pos: "CM", row: 2, col: 1 },
    { pos: "CM", row: 2, col: 3 },
    { pos: "RB", row: 2, col: 4 },
    { pos: "CB", row: 3, col: 1 },
    { pos: "CB", row: 3, col: 2 },
    { pos: "CB", row: 3, col: 3 },
    { pos: "GK", row: 4, col: 2 } // dynamically centered
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

let players = [];
let formationPositions = [];
let currentPosition = null;
let pickerOpen = false;
let squad = {};

fetch("players.json")
  .then(res => res.json())
  .then(data => players = data);

function startDraft(formation) {
  document.getElementById("formationScreen").classList.add("hidden");
  document.getElementById("pitchScreen").classList.remove("hidden");
  formationPositions = formationPositionsData[formation];
  renderPitch();
}

function renderPitch() {
  const pitch = document.getElementById("pitch");
  pitch.innerHTML = "";

  pitch.style.gridTemplateRows = `repeat(4, 80px)`;
  pitch.style.gridTemplateColumns = `repeat(5, 1fr)`;

  formationPositions.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "position";
if (squad[index]) {
  div.innerHTML = `
    <img src="images/players/${squad[index].photo}" alt="${squad[index].name}" class="player-photo">
    <span>${squad[index].name}</span>
  `;
} else {
  div.innerText = p.pos;
}

    div.style.gridRowStart = p.row + 1;
    div.style.gridColumnStart = p.col + 1;

   // Reset state
div.classList.remove("selectable");
div.onclick = null;

// Reset state first
div.classList.remove("selectable");
div.onclick = null;
div.style.opacity = "1";
div.style.cursor = "default";

// If this position already has a player → lock it
if (squad[index]) {
  div.style.opacity = "0.7";
  div.style.cursor = "default";
} 
// If picker is open → disable positions
else if (pickerOpen) {
  div.style.cursor = "not-allowed";
} 
// Otherwise → allow hover & click
else {
  div.classList.add("selectable");
  div.style.cursor = "pointer";
  div.onclick = () => openPicker(p.pos, index);
}


    pitch.appendChild(div);
  });
}


function openPicker(position, index) {
  // Block if picker already open
  if (pickerOpen) return;

  // Block if position already filled
  if (squad[index]) return;

  pickerOpen = true;
  currentPosition = index;

  document.getElementById("pickerScreen").classList.remove("hidden");
  renderPitch();


  const eligible = players.filter(p => 
    p.positions.includes(position) &&
    !Object.values(squad).some(s => s && s.name === p.name)
  );

  const options = document.getElementById("options");
  options.innerHTML = "";

  const randomSix = eligible.sort(() => 0.5 - Math.random()).slice(0, 6);

randomSix.forEach(player => {
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
  renderPitch();
}


// Restart draft
document.getElementById("restartBtn").onclick = () => {
  // Only allow restart if picker is NOT open
  if (pickerOpen) return;

  document.getElementById("formationScreen").classList.remove("hidden");
  document.getElementById("pitchScreen").classList.add("hidden");
  document.getElementById("pickerScreen").classList.add("hidden");
  squad = {};
};
