// This code imports the Sequelize library from the "sequelize" module in Node.js
import {Sequelize} from "sequelize";
// npm install sequelize
// you have to change the password to no password
const db = new Sequelize('apiv2', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    Port: '3306',
});
// This code exports the "db" instance as the default export of the module
export default db;