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

async function loadPokemon() {
  if (isLoading) return;
  toggleLoading(true);

  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      let pokemonResponse = await fetch(data.results[i].url);
      let pokemonData = await pokemonResponse.json();
      renderPokemon(pokemonData);
    }
    offset += limit;
  } catch (error) {
    console.log("Fehler beim Laden:", error);
  }

  toggleLoading(false);
}

let searchTimeout = null;
document.getElementById("search").addEventListener("input", function (e) {
  let searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length < 3) return;

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async function () {
    let pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = "";

    for (let i = 1; i <= 898; i++) {
      try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        if (pokemon.name.includes(searchTerm)) {
          renderPokemon(pokemon);
          if (document.querySelectorAll(".pokemon-card").length >= 10) {
            break;
          }
        }
      } catch (error) {
        console.log("Fehler beim Laden:", error);
      }
    }
  }, 300);
});

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
