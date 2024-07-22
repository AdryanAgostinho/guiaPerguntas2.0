const Sequelize = require('sequelize')
const connect = require('./database')

const Resposta = connect.define('Resposta',{
    idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Resposta:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    usuarioResposta:{
        type: Sequelize.STRING,
    }
});

Resposta.sync({force: false}).then(()=>{
    console.log('Tabela Resposta sincronizada com Sucesso')
})

module.exports = Resposta