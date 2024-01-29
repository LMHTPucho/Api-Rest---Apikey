import Pokemon from "../model/pokemon.js";

export const GetPokemons = async (req, res) => {
    try{
        const pokemons = await Pokemon.findAll();
        res.json(pokemons)
    } catch (error) {
        console.log(error);
    }
}

export const GetPokemon = async (req, res) => {
    try{
        const pokemon = await Pokemon.findByPk(req);
        return pokemon
    } catch (error) {
        console.log(error);
    }
}

export const GetPokemonByType = async (req, res) => {
    let tipo = req;
    try{
        const pokemon = await Pokemon.findAll({
            where: {tipo}
        });
        return pokemon
    } catch (error) {
        console.log(error);
    }
}