document.addEventListener('DOMContentLoaded', () => {
    const randomPokemonButton = document.getElementById('random-pokemon');
    randomPokemonButton.addEventListener('click', getRandomPokemon);
    
    // Load a random Pokemon on initial page load
    getRandomPokemon();
});

async function getRandomPokemon() {
    try {
        // Generate a random Pokemon ID (1-898 for all Pokemon through Gen 8)
        const randomId = Math.floor(Math.random() * 898) + 1;
        
        // Fetch Pokemon data from the PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        // Update the UI with Pokemon data
        displayPokemon(data);
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
}

function displayPokemon(pokemon) {
    // Update Pokemon image
    const pokemonImage = document.getElementById('pokemon-image');
    pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    
    // Update Pokemon name (capitalize first letter)
    const pokemonName = document.getElementById('pokemon-name');
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    // Update Pokemon type
    const pokemonType = document.getElementById('pokemon-type');
    const types = pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
    pokemonType.textContent = types.join(', ');
    
    // Update Pokemon weight (convert to kg)
    const pokemonWeight = document.getElementById('pokemon-weight');
    pokemonWeight.textContent = `${pokemon.weight / 10} kg`;
    
    // Generate culinary assessment based on Pokemon characteristics
    const tasteAssessment = document.getElementById('taste-assessment');
    tasteAssessment.textContent = generateTasteAssessment(pokemon);
    
    // Generate cooking method
    const cookingMethod = document.getElementById('cooking-method');
    cookingMethod.textContent = generateCookingMethod(pokemon);
}

function generateTasteAssessment(pokemon) {
    const type = pokemon.types[0].type.name;
    const weight = pokemon.weight;
    
    // Different taste assessments based on Pokemon type
    const typeAssessments = {
        normal: "Probably tastes like chicken.",
        fire: "Likely too spicy for most people.",
        water: "Might make a delicious seafood dish.",
        grass: "Would have a leafy, vegetable-like flavor.",
        electric: "Would give a shocking, tingling sensation.",
        ice: "Would be refreshingly cool, like sorbet.",
        fighting: "Probably tough and gamey meat.",
        poison: "DEFINITELY NOT EDIBLE. HIGHLY TOXIC!",
        ground: "Would taste earthy and mineral-rich.",
        flying: "Like poultry, but gamier.",
        psychic: "Might cause hallucinations if consumed.",
        bug: "Crunchy exterior with a soft center.",
        rock: "Too hard to eat without breaking teeth.",
        ghost: "Can you even eat a ghost?",
        dragon: "Exotic and spicy, considered a delicacy.",
        dark: "An acquired taste, bitter and rich.",
        steel: "Literally inedible metal.",
        fairy: "Sweet and sugary flavor.",
    };
    
    // Get assessment based on type, or default message
    return typeAssessments[type] || "Taste is indeterminate.";
}

function generateCookingMethod(pokemon) {
    const type = pokemon.types[0].type.name;
    
    // Different cooking methods based on Pokemon type
    const cookingMethods = {
        normal: "Roast with herbs and spices.",
        fire: "No cooking needed - already hot!",
        water: "Steam or poach gently.",
        grass: "Sauté with butter and garlic.",
        electric: "Quick sear on high heat.",
        ice: "Serve raw as sashimi.",
        fighting: "Slow cook to tenderize the tough meat.",
        poison: "DO NOT ATTEMPT TO COOK OR EAT!",
        ground: "Bake in clay or earth oven.",
        flying: "Rotisserie or air fryer.",
        psychic: "Sous vide at precisely 57.5°C.",
        bug: "Deep fry until crunchy.",
        rock: "Pressure cook for several days (not recommended).",
        ghost: "Impossible to cook something that isn't corporeal.",
        dragon: "Flame-grill over an open fire.",
        dark: "Age in a cool, dark place before cooking.",
        steel: "Industrial forge (not for consumption).",
        fairy: "Dust with powdered sugar and caramelize with a torch.",
    };
    
    // Get cooking method based on type, or default message
    return cookingMethods[type] || "No specific cooking method recommended.";
}