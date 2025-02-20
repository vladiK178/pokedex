let searchTimeout = null;
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
      let foundPokemon = 0;
      for (let i = 1; i <= 898; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        if (pokemon.name.includes(searchTerm)) {
          renderPokemon(pokemon);
          foundPokemon++;
          if (foundPokemon >= 10) break;
        }
      }

      if (foundPokemon === 0) {
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
