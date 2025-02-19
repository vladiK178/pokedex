let searchTimeout = null;
document.getElementById("search").addEventListener("input", function (e) {
  let searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length < 3) return;

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async function () {
    let pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = "";

    for (let i = 1; i <= 898; i++) {
      try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        if (pokemon.name.includes(searchTerm)) {
          renderPokemon(pokemon);
          if (document.querySelectorAll(".pokemon-card").length >= 10) {
            break;
          }
        }
      } catch (error) {
        console.log("Fehler beim Laden:", error);
      }
    }
  }, 300);
});
