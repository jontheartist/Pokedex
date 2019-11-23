// console.log('Hello world!');


const pokedex = document.getElementById("pokedex");

console.log(pokedex);



const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i < 151; i++) {

        // console.log('Fetching pokemon!');
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(',  ')
        }))
        displayPokemon(pokemon);
    })




    // .then((data) => {
    //     console.log(data);

    //     const pokemon = {

    //     }
    // const pokemon = {};
    // pokemon['name'] = data.name;
    // console.log(pokemon);
    // pokemon['image'] = data.sprites['front_default'];
    // pokemon['type'] = data.types.map(type => type.type.name).join(',  ');
    // data.types.forEach((type) => {
    //     pokemon['type'] = pokemon['type'] + ', ' + type.type.name;
    // });

    //     console.log(pokemon);
    // });

};


const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(allpokemon => `


    <li class="card"> 
    <img class="card-image" src="${allpokemon.image}"/>
    <h2 class="card-title">${allpokemon.id}. ${allpokemon.name}</h2>
    <p class="card-subtitle">Type: ${allpokemon.type}</p>
    </li>

       `

    )
        .join('');


    //example
    // const html = `<li>Bulbasaur</li>`
    pokedex.innerHTML = pokemonHTMLString;
}


fetchPokemon();