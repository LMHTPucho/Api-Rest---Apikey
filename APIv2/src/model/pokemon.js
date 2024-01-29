import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Pokemon = db.define( 'pokemon', {
    NumPokedex: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
(async () => {
    await db.sync();
})();

export default Pokemon