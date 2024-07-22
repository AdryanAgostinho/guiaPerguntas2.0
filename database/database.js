const Sequelize = require("sequelize")

const connect =  new Sequelize("portalperguntas",'root','Ni1024#',{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connect