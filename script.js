// Startpunkt und wie viele Pokemon wir auf einmal laden wollen
let offset = 0;
const limit = 20;

// Mehrere Pokemon auf einmal laden
function loadPokemon() {
  // API-URL mit limit und offset
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Für jedes Pokemon in der Liste...
      data.results.forEach((pokemon) => {
        // ...laden wir die Details
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemonData) => {
            renderPokemon(pokemonData);
          });
      });
      // Erhöhe offset für nächstes Mal
      offset += limit;
    });
}

// Pokemon anzeigen
function renderPokemon(pokemon) {
  let pokedex = document.getElementById("pokedex");

  // Hole die Pokemon-Typen
  let types = pokemon.types.map((type) => type.type.name).join(" / ");

  // ID mit führenden Nullen (z.B. #001)
  let id = "#" + pokemon.id.toString().padStart(3, "0");

  pokedex.innerHTML += `
      <div class="pokemon-card">
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

// Start
loadPokemon();

// Mehr laden Button
document.getElementById("load-more").onclick = loadPokemon;
