const suits = ["Spade", "Diamond", "Club", "Heart", "None"];
let players = [];
let maxCards;
let points = [];

function setupPlayers() {
    const numPlayers = document.getElementById("players").value;
    if (numPlayers < 2 || numPlayers > 10) {
        alert("Please enter a valid number of players (2-10).");
        return;
    }
    maxCards = Math.floor(52 / numPlayers);
    players = Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`);
    points = Array(numPlayers).fill(0);
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
    const pointsHeader = document.getElementById("points-header");
    players.forEach(player => {
        const thGrid = document.createElement("th");
        thGrid.innerText = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();
        gridHeader.appendChild(thGrid);

        const thPoints = document.createElement("th");
        thPoints.innerText = player;
        pointsHeader.appendChild(thPoints);
    });

    document.getElementById("player-names").style.display = "none";
    document.getElementById("game-grid").style.display = "block";
    populateGrid();
    populatePointsGrid();
}

function populateGrid(addRows = 10) {
    const gridBody = document.getElementById("grid-body");
    let currentRows = gridBody.children.length;
    for (let i = 0; i < addRows; i++) {
        const row = document.createElement("tr");

        // Suit column
        const suitCell = document.createElement("td");
        suitCell.innerText = suits[(currentRows + i) % suits.length];
        row.appendChild(suitCell);

        // Cards column
        const cardCell = document.createElement("td");
        const cardValue = maxCards - Math.abs((currentRows + i) % (2 * maxCards) - maxCards);
        cardCell.innerText = cardValue;
        row.appendChild(cardCell);

        // Player columns
        players.forEach((_, playerIndex) => {
            const playerCell = document.createElement("td");
            playerCell.innerHTML = `
                <input type="number" min="0" style="width: 60px;" onchange="updatePrediction(${currentRows + i}, ${playerIndex}, this.value)">
                <button class="btn btn-green" onclick="confirmPrediction(${currentRows + i}, ${playerIndex}, true)">✔</button>
                <button class="btn btn-red" onclick="confirmPrediction(${currentRows + i}, ${playerIndex}, false)">✘</button>
            `;
            row.appendChild(playerCell);
        });

        gridBody.appendChild(row);
    }
}

function updatePrediction(row, player, value) {
    // Validation logic can be added here
    console.log(`Row ${row}, Player ${player}: Prediction updated to ${value}`);
}

function confirmPrediction(row, player, isCorrect) {
    const pointGain = isCorrect ? parseInt(document.querySelector(`#grid-body tr:nth-child(${row + 1}) td:nth-child(2)`).innerText, 10) * 10 : 0;
    points[player] += pointGain;
    updatePointsGrid();
}

function populatePointsGrid() {
    const pointsBody = document.getElementById("points-body");
    pointsBody.innerHTML = players.map((player, index) => `
        <tr>
            <td>${player}</td>
            <td id="player-points-${index}">${points[index]}</td>
        </tr>
    `).join("");
}

function updatePointsGrid() {
    players.forEach((_, index) => {
        document.getElementById(`player-points-${index}`).innerText = points[index];
    });
}

function addGames() {
    populateGrid();
}
