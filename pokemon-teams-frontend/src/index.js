const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function(){


    fetchTrainers().then(showTrainers)



    function fetchTrainers(){
        return fetch(TRAINERS_URL)
            .then(r => r.json())
    }


    function showTrainers(trainers){
        trainers.forEach(trainer => {
            let div = document.createElement("div")
            let trainerContainer = document.getElementById("trainer-container")
            div.className = "card"
            div.dataset.id = trainer.id

            div.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id=${trainer.id}>Add Pokemon</button>
            
            </div>`
            let addButton = div.querySelector("button")
            addButton.addEventListener("click", addPokemon)
            let pokemonsArray = trainer.pokemons
            div.append(showPokemons(pokemonsArray))
            trainerContainer.append(div)

        }) 
    }

    function showPokemons(pokemonsArray){
        let ul = document.createElement("ul")
        ul.className = "pokemon-list"
        pokemonsArray.forEach(function(pokemon){
            ul.append(showPokemon(pokemon))

        })
        return ul;
    }
    function showPokemon(pokemon){
        let li = document.createElement("li")
        li.dataset = pokemon.id
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        let button = document.createElement("button")
        button.innerHTML ="Release"
        button.dataset.id = pokemon.id
        button.addEventListener("click",releasePokemon)
        button.className = "release"
        li.append(button)
        return li
    }
    function releasePokemon(event){
        let currentPokemon = event.target.dataset.id
        
        fetch(POKEMONS_URL+"/"+currentPokemon, {
            method:"DELETE"
        })
            .then(r=>r.json())
            .then(o=>{
                // could check to make sure current pkmon id matched
                event.target.parentElement.remove()
            })

    }
    function addPokemon(event){
        let currentTrainer = event.target.dataset.trainerId

    
        fetch(POKEMONS_URL,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({trainer_id: currentTrainer})
        })
            .then(r=>r.json())
            .then (pokemon => {
                let list = event.target.parentElement.querySelector("ul")
               
                list.append(showPokemon(pokemon))
            })
           

    }



})