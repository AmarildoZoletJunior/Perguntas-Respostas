const { Schema } = require("mongoose");
const sequelize = require("sequelize");
const connect = require("./dataBase");

const pergunta = connect.define("pergunta",{
    titulo:{
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false,
    }
});


module.exports = pergunta;

