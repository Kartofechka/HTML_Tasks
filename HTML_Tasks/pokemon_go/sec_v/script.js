const url = "https://pokeapi.co/api/v2/egg-group/"

const egg_divs = document.getElementById("egg-divs")
const pokemons_divs = document.getElementById("pokemons-divs")
const pokemon_stats = document.getElementById("pokemon-stats")
const pokemon_info_basic = document.getElementById("pokemon-info_basic")
const pokemon_info_gender = document.getElementById("pokemon-info_gender")
const backBtnToPokemonsDiv = document.getElementById("backToPokemonsDiv")
const backBtnToEggDivs = document.getElementById("backBtnToEggDivs")


fetch(url) 
.then(response => response.json())
.then(data => {
    const eggGroup = data.results.map(group => ({
        name: group.name,
        url: group.url
    }));
    
    eggGroupPrinter(eggGroup)
})
.catch(error => error)


function eggGroupPrinter(eggGroup){
    egg_divs.style.display = 'block'
    eggGroup.forEach((group, index) => {
        const groupName = document.createElement('p')
        groupName.textContent = group.name
        egg_divs.appendChild(groupName)
        groupName.addEventListener('click', () => {
            pokemonPrinter(index+1)
        })
    });
}

function pokemonPrinter(index){
    pokemons_divs.style.display = 'block'
    egg_divs.style.display = 'none' 
    const url_p = `https://pokeapi.co/api/v2/egg-group/${index}/`
    fetch(url_p) 
    .then(response => response.json())
    .then(data => {
        data.pokemon_species.forEach(pokemon_name => {
            const pokemonName = document.createElement('p')
            pokemonName.textContent = pokemon_name.name
            pokemons_divs.appendChild(pokemonName)
            pokemonName.addEventListener('click', () => {
                printPokemonStats(index)
            })
        })
    })
    .catch(error => error)
}


backBtnToEggDivs.addEventListener('click', () => {
    egg_divs.style.display = 'block' 
    pokemons_divs.style.display = 'none' 
    pokemon_stats.style.display = 'none'
})



function printPokemonStats(index){
    pokemon_stats.style.display = 'block'
    pokemons_divs.style.display = 'none' 
    const url_pinfo = `https://pokeapi.co/api/v2/pokemon/${index}`
    pokemon_info_basic.innerHTML = ''
    pokemon_info_gender.innerHTML = ''
    fetch(url_pinfo) 
    .then(response => response.json())
    .then(data => {
        pokemon_info_basic.textContent = `Имя: ${data.name}, рост: ${data.height}, вес: ${data.weight}`
        pokemon_stats.appendChild(pokemon_info_basic)
    })
    const url_pgenderinfo = `https://pokeapi.co/api/v2/gender/${index}`
    fetch(url_pgenderinfo) 
    .then(response => response.json())
    .then(data => {
        pokemon_info_gender.textContent = `Пол: ${data.name}`
        pokemon_stats.appendChild(pokemon_info_gender)
    })
    .catch(error => error)
}

backBtnToPokemonsDiv.addEventListener('click', () => {
    pokemons_divs.style.display = 'block' 
    pokemon_stats.style.display = 'none'
})
