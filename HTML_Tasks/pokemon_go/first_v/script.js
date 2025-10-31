const url = "https://pokeapi.co/api/v2/egg-group/?limit=6000";

const egg_div = document.getElementById("egg-div");
const pokemons_div = document.getElementById("pokemons-div");


fetch(url)
  .then(response => response.json())
  .then(data => {
    const eggGroups = data.results.map(group => ({
      name: group.name,
      url: group.url
    }));
    eggGroupsAdder(eggGroups);
  })
  .catch(error => console.log(error));


function eggGroupsAdder(eggGroups){
  eggGroups.forEach(group => {
      const nameElement = document.createElement("p");
      nameElement.textContent = group.name;
      nameElement.style.cursor = "pointer";

      nameElement.addEventListener('click', () => {
        egg_div.style.display = 'none';
        pokemons_div.style.display = 'grid';

        fetchPokemonsOfGroup(group.name)
      });

      egg_div.appendChild(nameElement);
    });
}


function fetchPokemonsOfGroup(groupname){
  fetch(`https://pokeapi.co/api/v2/egg-group/${groupname}/`)
        .then(response => response.json())
        .then(data => {
          egg_div.style.display = 'none';
          pokemons_div.style.display = 'grid';
          pokemons_div.innerHTML = '';

          data.pokemon_species.forEach(pokemon => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");
            card.textContent = pokemon.name;
            pokemons_div.appendChild(card);
          });
        })
        .catch(error => console.log(error));
}