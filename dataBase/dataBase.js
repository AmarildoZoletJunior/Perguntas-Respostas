const Sequelize = require("sequelize");
require('dotenv').config();

const conectar = new Sequelize("perguntas",process.env.usuario,process.env.senha,{
    host: "localhost",
    dialect: "mysql"
});

module.exports = conectar;