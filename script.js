const suits = ["Spade", "Diamond", "Club", "Heart", "None"];
let players = [];
let maxCards;

function setupPlayers() {
    const numPlayers = document.getElementById("players").value;
    if (numPlayers < 2 || numPlayers > 10) {
        alert("Please enter a valid number of players (2-10).");
        return;
    }
    maxCards = Math.floor(52 / numPlayers);
    players = Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`);
    const nameInputs = document.getElementById("name-inputs");
    nameInputs.innerHTML = players.map((_, i) => `
        <label>Player ${i + 1} Name: </label>
        <input type="text" id="player${i}" value="Player ${i + 1}">
    `).join("<br>");
    document.getElementById("setup").style.display = "none";
    document.getElementById("player-names").style.display = "block";
}

function generateGameGrid() {
    players = players.map((_, i) => document.getElementById(`player${i}`).value || `Player ${i + 1}`);
    const gridHeader = document.getElementById("grid-header");
    players.forEach(player => {
        const th = document.createElement("th");
        th.innerText = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();
        gridHeader.appendChild(th);
    });
    document.getElementById("player-names").style.display = "none";
    document.getElementById("game-grid").style.display = "block";
    populateGrid();
}

function populateGrid(addRows = 10) {
    const gridBody = document.getElementById("grid-body");
    let currentRows = gridBody.children.length;
    for (let i = 0; i < addRows; i++) {
        const row = document.createElement("tr");
        const suitCell = document.createElement("td");
        suitCell.innerText = suits[(currentRows + i) % suits.length];
        row.appendChild(suitCell);

        const cardCell = document.createElement("td");
        const cardValue = maxCards - Math.abs((currentRows + i) % (2 * maxCards) - maxCards);
        cardCell.innerText = cardValue;
        row.appendChild(cardCell);

        players.forEach(() => {
            const playerCell = document.createElement("td");
            playerCell.innerHTML = `
                <input type="number" min="0" style="width: 60px;">
            `;
            row.appendChild(playerCell);
        });

        gridBody.appendChild(row);
    }
}

function addGames() {
    populateGrid();
}
