// Ein einziges Pokemon wird geladen- z.B. Pikachu
async function loadPikachu() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemon = await response.json();
    console.log("Schau mal in die Konsole!", pokemon);

    // Hier zeigen wir das Pokemon an
    showPokemon(pokemon);
  } catch (error) {
    console.log("Ups, da ging was schief:", error);
  }
}

// Diese Funktion zeigt das Pokemon in unserer HTML-Seite an
function showPokemon(pokemon) {
  const card = document.getElementById("pokemon-card");
  card.innerHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Typ: ${pokemon.types
              .map((type) => type.type.name)
              .join(", ")}</p>
        </div>
    `;
}

// Starte alles, wenn die Seite geladen ist
document.addEventListener("DOMContentLoaded", loadPikachu);
