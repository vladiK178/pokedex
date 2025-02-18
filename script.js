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
  const newId = currentPokemonId + direction;
  if (newId > 0 && newId <= 898) {
    await showDetails(newId);
  }
}

async function loadPokemon() {
  if (isLoading) return;
  toggleLoading(true);

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    for (let pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      renderPokemon(pokemonData);
    }
    offset += limit;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }

  toggleLoading(false);
}

let searchTimeout;
document.getElementById("search").oninput = function (e) {
  let searchTerm = e.target.value.toLowerCase();
  if (searchTerm.length < 3) return;

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    document.getElementById("pokedex").innerHTML = "";

    for (let i = 1; i <= 898; i++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await response.json();
        if (pokemon.name.includes(searchTerm)) {
          renderPokemon(pokemon);

          if (document.querySelectorAll(".pokemon-card").length >= 10) break;
        }
      } catch (error) {
        console.error("Fehler bei der Suche:", error);
      }
    }
  }, 300);
};

document.getElementById("load-more").onclick = loadPokemon;

loadPokemon();
