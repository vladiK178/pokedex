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
      let matchingPokemon = [];

      for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemon[i].name.includes(searchTerm)) {
          matchingPokemon.push(allPokemon[i]);

          if (matchingPokemon.length >= 10) {
            break;
          }
        }
      }

      if (matchingPokemon.length === 0) {
        pokedex.innerHTML = `
          <div style="text-align: center; width: 100%; padding: 20px;">
              <h2>Kein Pokémon gefunden mit "${searchTerm}"</h2>
          </div>
        `;
      } else {
        for (let pokemon of matchingPokemon) {
          let response = await fetch(pokemon.url);
          let pokemonData = await response.json();
          renderPokemon(pokemonData);
        }
      }
    } catch (error) {
      console.log("Fehler beim Suchen:", error);
    }

    toggleLoading(false);
  }, 300);
});
