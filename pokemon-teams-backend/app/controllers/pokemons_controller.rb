class PokemonsController < ApplicationController
    

    def index
    pokemons = Pokemon.all
    render json: pokemons

    end
    def destroy
        pokemon = Pokemon.find_by(params[:id])
       
        render json: pokemon 
        pokemon.destroy
    end
    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: pokemon.serialized
    
    end


  

    def create
        # need to get trainer id from fetch body
        # build a new pokemon
        # send it back to the frontend
       
        new_pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: params[:trainer_id])
        
  
        render( {json: new_pokemon} )
    end

end
