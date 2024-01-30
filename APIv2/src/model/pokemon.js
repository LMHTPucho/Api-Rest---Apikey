import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Destructuring DataTypes from Sequelize
const { DataTypes } = Sequelize;

// Define the Pokemon model with attributes: NumPokedex, Nombre, and Tipo
const Pokemon = db.define('pokemon', {
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
}, {
    // Additional model configurations
    freezeTableName: true,   // Prevents pluralization of the table name
    timestamps: false,       // Disables createdAt and updatedAt fields
    createdAt: false,        // Disables createdAt field
    updatedAt: false         // Disables updatedAt field
});

// Immediately synchronize the model with the database
(async () => {
    await db.sync();
})();

// Export the Pokemon model
export default Pokemon;
