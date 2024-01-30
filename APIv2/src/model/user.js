import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Destructuring DataTypes from Sequelize
const { DataTypes } = Sequelize;

// Define the User model with attributes: userAuthId, apiKey, and level
const User = db.define('user', {
    userAuthId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apiKey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    level: {
        type: DataTypes.BOOLEAN,
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

// Export the User model
export default User;
