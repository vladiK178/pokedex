// Pokemon Typ-Farben
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

let isLoading = false;

function renderPokemon(pokemon) {
  let pokedex = document.getElementById("pokedex");
  let mainType = pokemon.types[0].type.name;
  let types = pokemon.types.map((type) => type.type.name).join(" / ");
  let id = "#" + pokemon.id.toString().padStart(3, "0");

  pokedex.innerHTML += `
      <div class="pokemon-card" style="background: linear-gradient(to bottom, ${typeColors[mainType]}33, white)" 
           onclick="showDetails(${pokemon.id})">
          <div class="pokemon-number">${id}</div>
          <div class="pokemon-image">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          </div>
          <div class="pokemon-info">
              <h2>${pokemon.name}</h2>
              <span class="types">${types}</span>
          </div>
      </div>
  `;
}

// Loading-Screen
function toggleLoading(show) {
  isLoading = show;
  document.getElementById("loading").style.display = show ? "flex" : "none";
}

// Detail-Ansicht
async function showDetails(id) {
  toggleLoading(true);
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    document.getElementById("overlay").innerHTML = `
          <div class="detail-card">
              <span class="close-button" onclick="closeDetails()">×</span>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <h2>${pokemon.name}</h2>
              <div class="stats">
                  <p>HP: ${pokemon.stats[0].base_stat}</p>
                  <p>Attack: ${pokemon.stats[1].base_stat}</p>
                  <p>Defense: ${pokemon.stats[2].base_stat}</p>
                  <p>Speed: ${pokemon.stats[5].base_stat}</p>
              </div>
          </div>
      `;
    document.getElementById("overlay").style.display = "flex";
  } catch (error) {
    console.error("Error:", error);
  }
  toggleLoading(false);
}

function closeDetails() {
  document.getElementById("overlay").style.display = "none";
}

// Modifizierte loadPokemon Funktion
async function loadPokemon() {
  if (isLoading) return;
  toggleLoading(true);

  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    for (let pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      renderPokemon(pokemonData);
    }
    offset += limit;
  } catch (error) {
    console.error("Error:", error);
  }

  toggleLoading(false);
}
