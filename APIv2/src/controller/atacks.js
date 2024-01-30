import Atack from "../model/atacks.js";

// Retrieve all attacks from the database and return them
export const GetAtacks = async (req, res) => {
    try {
        const atacks = await Atack.findAll();
        return atacks;
    } catch (error) {
        console.log(error);
    }
}

// Retrieve a specific attack from the database based on its primary key and return it
export const GetAtack = async (req, res) => {
    try {
        const atack = await Atack.findByPk(req);
        return atack;
    } catch (error) {
        console.log(error);
    }
}

// Retrieve attacks from the database based on a specific type and return them
export const GetAttacksByType = async (req, res) => {
    let tipo = req;
    try {
        const atack = await Atack.findAll({
            where: { tipo }
        });
        return atack;
    } catch (error) {
        console.log(error);
    }
}

// Retrieve attacks from the database based on a specific name and return them
export const GetAtackByName = async (req, res) => {
    let nombre = req;
    try {
        const atack = await Atack.findAll({
            where: { nombre }
        });
        return atack;
    } catch (error) {
        console.log(error);
    }
}