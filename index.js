const { response } = require("express");
const express = require("express");
const app = express();
//importando funçao que pega ip
const os = require("os");
let {ip} = require("./configuracaoServer/pegarip");
let {PORT} = require("./configuracaoServer/pegarip");

//setando que ira usar o ejs como view engine
app.set('view engine','ejs');

//Fazendo renderização de pagina com ejs, precisa utilizar o ./
app.get("/home/:nome/:lang",(req,res)=>{
    let exibir = false;
    let nome = "Amarildo";
    let lang = "JavaScript";
    let produtos = [
        {nome: "doritos",
        preco: 20
    },
    {nome: "coca-cola",
        preco: 7
    },
    {nome: "maçã",
        preco: 2
    }
]
        res.render("./index",{
            nome: req.params.nome,
            lang: req.params.lang,
            msg: exibir,
            produtos: produtos,
        });
})


//Iniciando o servidor
app.listen(PORT,ip,(()=>{
    try{
        console.log(`Servidor iniciado no ip: http://${ip}:${PORT}`)
    }catch(erro){
        console.log(`Ocorreu um erro em iniciar o servidor: ${erro}`)
    }
}));
