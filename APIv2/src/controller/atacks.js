import Atack from "../model/atacks.js";

export const GetAtacks = async (req, res) => {
    try{
        const atacks = await Atack.findAll();
        res.json(atacks)
    } catch (error) {
        console.log(error);
    }
}

export const GetAtack = async (req, res) => {
    try{
        const atack = await Atack.findByPk(req);
        return atack
    } catch (error) {
        console.log(error);
    }
}

export const GetAtackByType = async (req, res) => {
    let tipo = req;
    try{
        const atack = await Atack.findAll({
            where: {tipo}
        });
        return atack
    } catch (error) {
        console.log(error);
    }
}