let currentPokemon = 1; // Wir starten mit dem ersten Pokemon

// Pokemon laden
function loadPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
    .then((response) => response.json())
    .then((pokemon) => {
      renderPokemon(pokemon);
      currentPokemon++;
    });
}

// Pokemon anzeigen
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

// Mehr laden wenn Button geklickt
document.getElementById("load-more").onclick = loadPokemon;
