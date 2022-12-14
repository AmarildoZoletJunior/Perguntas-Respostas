//iniciando configurações do servidor
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//importando conexão e model
const conectar = require("./dataBase/dataBase");
const Pergunta = require("./dataBase/Perguntas");
const Resposta = require("./dataBase/Respostas");
//importando funçao que pega ip
let {ip} = require("./configuracaoServer/pegarip");
let {PORT} = require("./configuracaoServer/pegarip");


//Conectando ao banco
conectar.authenticate().then(()=>{
    console.log("Conectado ao banco com sucesso")
}).catch((erro)=>{
    console.log("Ocorreu um erro:" + erro);
});

//

//setando que ira usar o ejs como view engine
app.set('view engine','ejs');


//Setando pasta com arquivos estaticos de estilização, como css.
app.use(express.static("public"));

//passando para json, para ter mais facilidade
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Fazendo renderização de pagina com ejs, precisa utilizar o ./
app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true, order:[['id','DESC']]}).then((perguntas)=>{
        res.render("./index",{
            perguntas:perguntas
        });
    })
});


app.post("/perguntaenviada",(req,resp)=>{
    if(req.body.titulo != "" && req.body.descricao != ""){
    Pergunta.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }).then(()=>{
            console.log("Pergunta salva no banco de dados");
            resp.redirect("/");
    }).catch((erro)=>{
        console.log("Algum erro ocorreu: " + erro);
    });
}else{
    resp.redirect("/");
}
})

app.get("/pergunta/:id/modificar",async(req,resp)=>{
    let id = req.params.id;
    Pergunta.findOne(({ where: { id: id }})).then((perguntas)=>{
        console.log(perguntas.id);
        resp.render("perguntas/perguntaModificar",{
            perguntas:perguntas
        });
}).catch(()=>{
    resp.redirect("/");
})
})

app.post("/pergunta/:id",(req,resp)=>{
    let id = req.params.id;
    Pergunta.findOne(({ where: { id: id }})).then((perguntas)=>{
        Pergunta.update(
            {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
            },
            { where: { id: req.params.id }}
        ).then(()=>{
            console.log("Enviado com sucesso");
            resp.redirect("/");
        }).catch((erro)=>{
            console.log("erro:" + erro)
        })
})
})

app.get("/pergunta/solo/:id",(req,resp)=>{
    let id = req.params.id;
    Pergunta.findOne(({ where: { id: id }, raw:true })).then((perguntas)=>{
        if(perguntas != undefined){
        Resposta.findAll(({where: {perguntaId: perguntas.id},raw: true})).then((respostas)=>{
            resp.render("perguntas/perguntaSolo",{
                perguntas:perguntas,
                respostas:respostas,
            });
        });
    }else{
        resp.redirect("/")
    }
    }).catch((erro)=>{
        console.log("Ocorreu um erro: " + erro)
    })
})

app.get("/perguntas",(req,resp)=>{
    resp.render("perguntas/perguntaCadastro");
})


app.post("/resposta",(req,resp)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId;
    if(corpo != "" && perguntaId != ""){
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(()=>{
        console.log("Resposta registrada com sucesso");
        resp.redirect(`/pergunta/solo/${perguntaId}`);
    }).catch((erro)=>{
        console.log("Ocorreu erro:" + erro);
    })
}else{
    resp.redirect(`/pergunta/solo/${perguntaId}`);
}
})


//Iniciando o servidor
app.listen(PORT,ip,(()=>{
    try{
        console.log(`Servidor iniciado no ip: http://${ip}:${PORT}`)
    }catch(erro){
        console.log(`Ocorreu um erro em iniciar o servidor: ${erro}`)
    }
}));
