const button = document.querySelector('#button-search');
const input = document.querySelector('.pokeinput');
const item = document.querySelector('.item');
const container = document.querySelector('.pokemon-wrapper');
let pokemons;
var card;   
let randPokes = Math.floor(Math.random() * 958); // Pokemons aleatórios se não houver pesquisa.

// Função para montar a estrutura do HTML e retornar ele.
let getCardPokes = (data) => {

    if(data.types.length == 2)
    {
        card = `<div class="item">
        <div class="poke-img"><img src="${data.sprites.front_default}" width="150"></div>
        <div class="poke-infos">
          <h2>${data.name}</h2>
          <div class="types-wrapper">
            <p class="type ${data.types[0].type.name}">
            ${data.types[0].type.name}
            </p>
            <p class="type ${data.types[1].type.name}">
            ${data.types[1].type.name}
            </p>
          </div>
        </div>
        </div>`;
    }
    else
    {
        card = `<div class="item">
        <div class="poke-img"><img src="${data.sprites.front_default}" width="150"></div>
        <div class="poke-infos">
          <h2>${data.name}</h2>
          <div class="types-wrapper">
            <p class="type ${data.types[0].type.name}">
            ${data.types[0].type.name}
            </p>
          </div>
        </div>
        </div>`;
    }

    return card;
}

// Chamamos a função getCardPokes para montar o HTML junto das informações de cada pokemon e retornar
// Depois jogamos o resultado no container
let getPokeInfo = (data) => {

    let AllPokemons = getCardPokes(data); 

    container.innerHTML += AllPokemons;
}

// Pegamos a url com as informações de cada pokemon e mandamos para a função getPokeInfo
let getPokesInfos = (data) => {
    pokemons = data;

    if(pokemons.count)
    {
        for (let i = 0; i < pokemons.results.length; i++)
        {
    
            fetch(pokemons.results[i].url)
            .then(response => response.json())
            .then(data => getPokeInfo(data))
            .catch(err => console.log(err));
        }
    }
    else
    {
        let searchPokemon = getCardPokes(pokemons); 

        container.innerHTML = searchPokemon;
    }
}

button.addEventListener('click', function(){
    url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
})


// Função responsável por consumir a API e mandar o resultado para  a função getPokesInfos
let getAPIResult = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => getPokesInfos(data))
    .catch(err => console.log(err));
}


// Função responsável por startar a aplicação
let startApp = () => {
    button.addEventListener('click', event => {
        event.preventDefault();
    
        if(input.value != '')
        {
            let pokeName = input.value.toLowerCase();
            getAPIResult(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        }
        else
        {
            window.location.reload();
        }
    })

    getAPIResult(`https://pokeapi.co/api/v2/pokemon/?offset=${randPokes}&limit=28`);
}


startApp();