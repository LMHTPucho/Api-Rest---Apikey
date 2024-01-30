import Pokemon from "../model/pokemon.js";

// Retrieve all pokemons from the database and respond with a JSON representation
export const GetPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (error) {
        console.log(error);
    }
}

// Retrieve a specific pokemon from the database based on its primary key and return it
export const GetPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req);
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

// Retrieve pokemons from the database based on a specific type and return them
export const GetPokemonByType = async (req, res) => {
    let tipo = req;
    try {
        const pokemon = await Pokemon.findAll({
            where: { tipo }
        });
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}
