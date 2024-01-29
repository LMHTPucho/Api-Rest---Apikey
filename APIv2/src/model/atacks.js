import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Atack = db.define( 'ataque', {
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

export default Atack