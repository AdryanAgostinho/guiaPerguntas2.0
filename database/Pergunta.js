const sequelize = require("sequelize");
const connect = require("./database")

const pergunta = connect.define("pergunta",{
    pergunta: {
        type: sequelize.STRING
    },
    descricao: {
        type: sequelize.TEXT
    },
    autor:{
        type: sequelize.STRING
    }
});

pergunta.sync({force: false}).then(()=>{
    console.log("Tabela pergunta sincronizada com sucesso!");
})

module.exports = pergunta