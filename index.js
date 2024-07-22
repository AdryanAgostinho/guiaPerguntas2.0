const express = require('express')
const app = express()
const body = require("body-parser")

//import de variaveis
//const usuarioEnv = require('./database/values')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(body.urlencoded({extended: false}))

//database e models imports
const connect = require("./database/database")
const pergunta = require("./database/Pergunta")
const Responder = require("./database/Responder")

connect.authenticate().then(()=>{
    console.log("Database connected")
}).catch((msgError)=>{
    console.log("Database not connected" + msgError)
})

app.get("/:nome?",(req,res)=>{
    
    pergunta.findAll({raw: true,order:[['id','DESC']]}).then(pergunta=>{
        const usuarioEnv = req.query['nome']
        if(pergunta != undefined){
            res.render("index",{perguntas: pergunta,
                                nome: usuarioEnv
            })
        }
    })
 
})

//rotas para  perguntas
app.get("/pergunta/:usuario",(req,res)=>{
    const usuarioEnv = req.params.usuario
    res.render("pergunta",{
        nome: usuarioEnv
    })
})

app.post("/enviarpergunta",(req,res)=>{
    const pergunt= req.body.pergunta
    const descricao = req.body.descricao
    const userEnvAsk = req.body.userenv


    pergunta.create({
        pergunta: pergunt,
        descricao: descricao,
        autor: userEnvAsk
    }).then(()=>{
       res.redirect("/")
    })

})

//rotas para a pagina de resposta

app.get("/responder/:id",(req,res)=>{
    var idPerg = req.params.id
    pergunta.findOne({
        where: {id: idPerg}
    }).then(row=>{
        Responder.findAll({raw: true,
            where: {idPergunta: idPerg},
            order: [['id','DESC']]
        }).then(rowResp=>{
            console.log(rowResp)
            res.render("responder",{
                pergunta:row,
                respostas: rowResp
            })
        })
        
    })
    
})

app.post("/enviarResposta",(req,res)=>{
    var IdPergu = req.body.idPergunta
    var respostaPergu = req.body.resposta
    var usuarioResp = req.body.usuarioResposta
   
    Responder.create({
        idPergunta: IdPergu,
        Resposta: respostaPergu,
        usuarioResposta: usuarioResp
    }).then(()=>{
        res.redirect("/responder/"+IdPergu)
    })
})

app.listen(8080,(req,res)=>{
  console.log("ativo")
})
