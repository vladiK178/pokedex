async function loadPokemon() {
  if (isLoading) return;
  toggleLoading(true);

  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      let pokemonResponse = await fetch(data.results[i].url);
      let pokemonData = await pokemonResponse.json();
      renderPokemon(pokemonData);
    }
    offset += limit;
  } catch (error) {
    console.log("Fehler beim Laden:", error);
  }

  toggleLoading(false);
}
