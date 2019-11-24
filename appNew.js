// console.log('Hello world!');
const pokedex = document.getElementById('pokedex');
const pokeCache = {};
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) =>
        ({
            ...result,
            // name: result.name,
            // apiURL: result.url,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`


        }));
    // console.log(data.results);
    displayPokemon(pokemon);
};


const displayPokemon = (pokemon) => {
    // console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (allpokemon) => `

    <li class="card" onclick="selectPokemon(${allpokemon.id})"> 
        <img class= "card-image" src = "${allpokemon.image}" />
        <h2 class="card-title">${allpokemon.id}. ${allpokemon.name}</h2>

    </li >

    `

        )
        .join('');

    // <p class="card-subtitle">Type: ${allpokemon.type}</p>
    //example
    // const html = `< li > Bulbasaur</li > `
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!pokeCache[id]) {
        // console.log(id);
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const allpokemon = await res.json();
        pokeCache[id] = allpokemon;
        console.log(pokeCache);
        displayPopup(allpokemon);

    }
    displayPopup(pokeCache[id]);

}

const displayPopup = (allpokemon) => {
    // console.log(allpokemon);
    const type = allpokemon.types.map((type) =>
        type.type.name).join(',  ');
    // console.log(type);
    const image = allpokemon.sprites['front_default'];
    const htmlString = `
    <div class="popup">
    <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card"> 
        <img class= "card-image" src = "${image}" />
        <h2 class="card-title">${allpokemon.id}. ${allpokemon.name}</h2>
        <p><small>Height:</small>${allpokemon.height}
         | <small>Weight: </small>${allpokemon.weight}
         | <small>Type: </small>${type} 

    </div>
    </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}


fetchPokemon();