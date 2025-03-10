let offset = 0;
const limit = 20;
let currentPokemonId = 1;
let isLoading = false;
let isSearchActive = false;
let searchTimeout = null;


function toggleLoading(show) {
  isLoading = show;
  document.getElementById("loading").style.display = show ? "flex" : "none";
}

function closeDetails() {
  document.getElementById("overlay").style.display = "none";
}

async function navigatePokemon(direction) {
  let newId = currentPokemonId + direction;
  if (newId > 0 && newId <= 898) {
    await showDetails(newId);
  }
}

async function loadInitialPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");
    const data = await response.json();
    allPokemon = data.results;
  } catch (error) {
    console.log("Fehler beim Laden der Pokemon-Liste:", error);
  }
}

function resetPokedex() {
  document.getElementById("search").value = "";
  document.getElementById("pokedex").innerHTML = "";
  offset = 0;
  isSearchActive = false;
  document.getElementById("load-more").style.display = "block";
  document.getElementById("back-button").style.display = "none";
  loadPokemon();
}

function setEventListeners() {
  document.getElementById("back-button").addEventListener("click", resetPokedex);
  document.querySelector(".logo").addEventListener("click", resetPokedex);
  document.querySelector(".title").addEventListener("click", resetPokedex);
  document.getElementById("load-more").addEventListener("click", loadPokemon);
}

setEventListeners();
loadPokemon();
loadInitialPokemonList();
