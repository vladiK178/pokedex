let offset = 0;
const limit = 20;
let currentPokemonId = 1;
let isLoading = false;

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

function resetPokedex() {
  document.getElementById("search").value = "";
  document.getElementById("pokedex").innerHTML = "";

  offset = 0;

  loadPokemon();
}

document.querySelector(".logo").addEventListener("click", resetPokedex);
document.querySelector(".title").addEventListener("click", resetPokedex);

document.getElementById("load-more").addEventListener("click", loadPokemon);

loadPokemon();
