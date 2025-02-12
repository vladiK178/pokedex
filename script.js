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

// Pokemon anzeigen (bleibt erstmal gleich)
function renderPokemon(pokemon) {
  let pokedex = document.getElementById("pokedex");
  pokedex.innerHTML += `
        <div class="pokemon">
            <img src="${pokemon.sprites.front_default}">
            <h2>${pokemon.name}</h2>
        </div>
    `;
}

// Start
loadPokemon();

// Mehr laden Button
document.getElementById("load-more").onclick = loadPokemon;
