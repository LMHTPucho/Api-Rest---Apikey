import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Destructuring DataTypes from Sequelize
const { DataTypes } = Sequelize;

// Define the Atack model with attributes: Nombre and Tipo
const Atack = db.define('ataque', {
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

// Export the Atack model
export default Atack;
