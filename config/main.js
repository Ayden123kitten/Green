var sitename = "Green";
var subtext = "Poggers.";

document.title = `${document.title} | ${sitename}`;
document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;

let gamesData = [];
let selectedCategories = [];
let allCategories = [];

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
      window.location.href = `/${game.slug}`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function renderCategoryFilters() {
  const categoryFiltersContainer = document.getElementById("categoryFilters");
  categoryFiltersContainer.innerHTML = "";

  allCategories.forEach((category) => {
    const categoryButton = document.createElement("div");
    categoryButton.classList.add("category-filter");
    if (selectedCategories.includes(category)) {
      categoryButton.classList.add("selected");
    }
    categoryButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    categoryButton.addEventListener("click", () => {
      if (selectedCategories.includes(category)) {
        selectedCategories = selectedCategories.filter(
          (cat) => cat !== category
        );
        categoryButton.classList.remove("selected");
      } else {
        selectedCategories.push(category);
        categoryButton.classList.add("selected");
      }
      handleSearchInput();
    });

    categoryFiltersContainer.appendChild(categoryButton);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  
  const filteredGames = gamesData.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchInputValue);
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.every((cat) =>
        (game.categories || []).includes(cat)
      );
    return matchesSearch && matchesCategories;
  });
  
  displayFilteredGames(filteredGames);
}

fetch("/config/games.json")
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    
    const categorySet = new Set();
    data.forEach((game) => {
      if (game.categories) {
        game.categories.forEach((cat) => categorySet.add(cat));
      }
    });
    allCategories = Array.from(categorySet).sort();
    
    renderCategoryFilters();
    displayFilteredGames(data);
  })
  .catch((error) => console.error("Error fetching games:", error));

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);
