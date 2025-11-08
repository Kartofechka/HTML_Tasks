const url = "https://pokeapi.co/api/v2/egg-group/"

const egg_divs = document.getElementById("egg-divs")
const pokemons_divs = document.getElementById("pokemons-divs")
const pokemon_stats = document.getElementById("pokemon-stats")
const pokemon_info_basic = document.getElementById("pokemon-info_basic")
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
.catch(error => console.error(error))

function eggGroupPrinter(eggGroup){
    egg_divs.style.display = 'block'
    pokemons_divs.style.display = 'none'
    pokemon_stats.style.display = 'none'
    egg_divs.innerHTML = ''
    
    eggGroup.forEach((group, index) => {
        const groupName = document.createElement('p')
        groupName.textContent = group.name
        egg_divs.appendChild(groupName)
        groupName.addEventListener('click', () => {
            pokemonPrinter(group.url)
        })
    });
}

function pokemonPrinter(eggGroupUrl){
    pokemons_divs.style.display = 'block'
    egg_divs.style.display = 'none'
    pokemon_stats.style.display = 'none'
    pokemons_divs.innerHTML = ''
    
    fetch(eggGroupUrl) 
    .then(response => response.json())
    .then(data => {
        data.pokemon_species.forEach(pokemon_species => {
            const pokemonName = document.createElement('p')
            pokemonName.textContent = pokemon_species.name
            pokemons_divs.appendChild(pokemonName)
            pokemonName.addEventListener('click', () => {
                printPokemonStats(pokemon_species.name)
            })
        })
    })
    .catch(error => console.error(error))
}

backBtnToEggDivs.addEventListener('click', () => {
    egg_divs.style.display = 'block' 
    pokemons_divs.style.display = 'none' 
    pokemon_stats.style.display = 'none'
    pokemons_divs.innerHTML = ''
})

function printPokemonStats(pokemonName){
    pokemon_stats.style.display = 'block'
    pokemons_divs.style.display = 'none' 
    pokemon_info_basic.innerHTML = ''
    
    const url_pinfo = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    
    fetch(url_pinfo) 
    .then(response => response.json())
    .then(data => {
        const pokemonImage = document.createElement('img')
        pokemonImage.src = data.sprites.front_default
        pokemonImage.alt = data.name
        pokemon_info_basic.appendChild(pokemonImage)
        
        const basicInfo = document.createElement('p')
        basicInfo.textContent = `Имя: ${data.name}, Рост: ${data.height}, Вес: ${data.weight}`
        pokemon_info_basic.appendChild(basicInfo)
    })
    .catch(error => console.error(error))
}

backBtnToPokemonsDiv.addEventListener('click', () => {
    pokemons_divs.style.display = 'block' 
    pokemon_stats.style.display = 'none'
    pokemon_info_basic.innerHTML = ''
    pokemon_info_gender.innerHTML = ''
})