document.getElementById("search").addEventListener("input", function (e) {
  let searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length < 3) {
    if (isSearchActive) {
      resetPokedex();
    }
    return;
  }

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async function () {
    isSearchActive = true;
    let pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = "";

    document.getElementById("load-more").style.display = "none";
    document.getElementById("back-button").style.display = "block";

    toggleLoading(true);

    try {
      const filteredPokemon = allPokemon
        .filter((pokemon) => pokemon.name.includes(searchTerm))
        .slice(0, 10);

      for (let pokemon of filteredPokemon) {
        const response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        renderPokemon(pokemonData);
      }

      if (filteredPokemon.length === 0) {
        pokedex.innerHTML = `
                  <div style="text-align: center; width: 100%; padding: 20px;">
                      <h2>No Pokémon found with "${searchTerm}"</h2>
                  </div>
              `;
      }
    } catch (error) {
      console.log("Fehler beim Suchen:", error);
    }

    toggleLoading(false);
  }, 300);
});
