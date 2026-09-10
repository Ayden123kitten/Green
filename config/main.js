var sitename = "Green";
var subtext = "Poggers.";

document.title = `${document.title} | ${sitename}`;
document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;

let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameImage.alt = game.name;
    
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${encodeURIComponent(game.url)}`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

fetch("/config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

document.getElementById("searchInput").addEventListener("input", handleSearchInput);