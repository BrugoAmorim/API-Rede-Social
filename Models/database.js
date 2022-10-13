
const Sequelize = require('sequelize');

const conexaodb = new Sequelize('dbredesocial', 'root', '12345', {
    host: "localhost",
    dialect: "mysql"
});

conexaodb.authenticate().then(() => {
    
    console.log("Conexao estabelecida!");
}).catch(err => {

    console.log(err);
}) 

module.exports = { conexaodb };