let players = [];
let gameSuits = ["Spade", "Diamond", "Club", "Heart", "None"];
let numRows = 10;

function setupPlayers() {
  const numPlayers = document.getElementById("numPlayers").value;
  if (numPlayers < 2) {
    alert("There must be at least 2 players.");
    return;
  }

  players = new Array(Number(numPlayers)).fill("");
  document.getElementById("setup").style.display = "none";

  const playerInputs = document.getElementById("playerInputs");
  playerInputs.innerHTML = "";

  players.forEach((_, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${index + 1} Name`;
    input.id = `player${index}`;
    playerInputs.appendChild(input);
  });

  document.getElementById("playerNames").style.display = "block";
}

function generateGrid() {
  players = players.map((_, index) => document.getElementById(`player${index}`).value.trim());
  if (players.some((name) => !name)) {
    alert("Please fill in all player names.");
    return;
  }

  document.getElementById("playerNames").style.display = "none";
  document.getElementById("gameGrid").style.display = "block";

  const gridHeaders = document.getElementById("gridHeaders");
  players.forEach((player) => {
    const th = document.createElement("th");
    th.textContent = player[0].toUpperCase() + player.slice(1).toLowerCase();
    gridHeaders.appendChild(th);
  });

  populateGrid();
}

function populateGrid() {
  const numPlayers = players.length;
  const maxCards = Math.floor(52 / numPlayers);
  const gridBody = document.getElementById("gridBody");

  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");

    // Game Suit
    const suitCell = document.createElement("td");
    suitCell.textContent = gameSuits[i % gameSuits.length];
    row.appendChild(suitCell);

    // Number of Cards
    const cardsCell = document.createElement("td");
    const cardValue = maxCards - (i % (2 * maxCards - 1));
    cardsCell.textContent = Math.abs(cardValue);
    row.appendChild(cardsCell);

    // Player Predictions
    players.forEach(() => {
      const inputCell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      inputCell.appendChild(input);
      row.appendChild(inputCell);
    });

    gridBody.appendChild(row);
  }
}

function addGames() {
  numRows += 10;
  populateGrid();
}
