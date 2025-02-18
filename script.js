let offset = 0;
const limit = 20;
let currentPokemonId = 1;
let isLoading = false;

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

function renderPokemon(pokemon) {
  let pokedex = document.getElementById("pokedex");
  let mainType = pokemon.types[0].type.name;
  let types = pokemon.types.map((type) => type.type.name).join(" / ");
  let pokemonId = pokemon.id.toString().padStart(3, "0");

  pokedex.innerHTML += `
    <div class="pokemon-card" style="background: ${typeColors[mainType]}88" onclick="showDetails(${pokemon.id})">
        <div class="pokemon-number">#${pokemonId}</div>
        <div class="pokemon-image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="pokemon-info">
            <h2>${pokemon.name}</h2>
            <span class="types">${types}</span>
        </div>
    </div>
  `;
}

function toggleLoading(show) {
  isLoading = show;
  document.getElementById("loading").style.display = show ? "flex" : "none";
}

async function showDetails(id) {
  if (isLoading) return;
  currentPokemonId = id;
  toggleLoading(true);

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    const mainType = pokemon.types[0].type.name;

    document.getElementById("overlay").innerHTML = `
      <div class="detail-card" style="background: ${typeColors[mainType]}CC">
          <span class="close-button" onclick="closeDetails()">×</span>
          <button class="nav-button prev" onclick="navigatePokemon(-1)">←</button>
          <button class="nav-button next" onclick="navigatePokemon(1)">→</button>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
          <h2>${pokemon.name}</h2>
          <div class="stats">
              <p>HP: ${pokemon.stats[0].base_stat}</p>
              <p>Attack: ${pokemon.stats[1].base_stat}</p>
              <p>Defense: ${pokemon.stats[2].base_stat}</p>
              <p>Speed: ${pokemon.stats[5].base_stat}</p>
          </div>
      </div>
    `;

    document.getElementById("overlay").onclick = function (e) {
      if (e.target === this) closeDetails();
    };

    document.getElementById("overlay").style.display = "flex";
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }

  toggleLoading(false);
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
