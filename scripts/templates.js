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
