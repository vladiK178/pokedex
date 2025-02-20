document.getElementById("search").addEventListener("input", function (e) {
  let searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length < 3) {
    if (isSearchActive) {
      resetPokedex();
    }
    return;
  }

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(function () {
    startSearch(searchTerm);
  }, 300);
});

function startSearch(searchTerm) {
  isSearchActive = true;
  document.getElementById("pokedex").innerHTML = "";
  document.getElementById("load-more").style.display = "none";
  document.getElementById("back-button").style.display = "block";
  toggleLoading(true);

  let matchingPokemon = findMatchingPokemon(searchTerm);
  loadSearchResults(matchingPokemon, searchTerm);
}

function findMatchingPokemon(searchTerm) {
  let results = [];

  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].name.includes(searchTerm)) {
      results.push(allPokemon[i]);
      if (results.length >= 10) {
        break;
      }
    }
  }

  return results;
}

async function loadSearchResults(matchingPokemon, searchTerm) {
  let pokedex = document.getElementById("pokedex");

  if (matchingPokemon.length === 0) {
    pokedex.innerHTML = `<div style="text-align: center; padding: 20px;">
        <h2>Kein Pokémon gefunden mit "${searchTerm}"</h2>
      </div>`;
    toggleLoading(false);
    return;
  }

  for (let i = 0; i < matchingPokemon.length; i++) {
    try {
      let response = await fetch(matchingPokemon[i].url);
      let pokemonData = await response.json();
      renderPokemon(pokemonData);
    } catch (error) {
      console.log("Fehler beim Laden eines Pokémon:", error);
    }
  }

  toggleLoading(false);
}
