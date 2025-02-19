function renderPokemon(pokemon) {
  let pokedex = document.getElementById("pokedex");
  let mainType = pokemon.types[0].type.name;
  let types = pokemon.types.map((type) => type.type.name).join(" / ");
  let id = pokemon.id.toString();

  if (id.length === 1) {
    id = "00" + id;
  } else if (id.length === 2) {
    id = "0" + id;
  }

  pokedex.innerHTML += `
      <div class="pokemon-card" style="background: ${typeColors[mainType]}88" onclick="showDetails(${pokemon.id})">
          <div class="pokemon-number">#${id}</div>
          <div class="pokemon-image" style="background: rgba(255, 255, 255, 0.5)">
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
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemon = await response.json();
    let mainType = pokemon.types[0].type.name;

    let overlay = document.getElementById("overlay");

    overlay.innerHTML = `
        <div class="detail-card" style="background: ${typeColors[mainType]}CC">
            <span class="close-button" onclick="closeDetails()">×</span>
            ${id > 1 ? `<button class="nav-button prev" onclick="navigatePokemon(-1)">←</button>` : ''}
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

    overlay.onclick = function (e) {
      if (e.target === overlay) {
        closeDetails();
      }
    };

    overlay.style.display = "flex";
  } catch (error) {
    console.log("Fehler beim Laden:", error);
  }

  toggleLoading(false);
}
