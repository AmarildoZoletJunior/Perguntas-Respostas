const Sequelize = require("sequelize");
const connect = require("./dataBase");


const resposta = connect.define("Respostas",{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull:false,
    }
})

resposta.sync({force: false});

module.exports = resposta;
