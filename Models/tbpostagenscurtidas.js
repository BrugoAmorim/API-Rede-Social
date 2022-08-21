
const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const Postagens = require('../Models/tbpostagens').Postagens;
const Usuarios = require('../Models/tbusuarios').Usuarios;

const PostagensCurtidas = conexaodb.define('Tb_Postagens_Curtidas', {

    id_postagem_curtida: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    id_postagem: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false });

// Postagens.hasOne(PostagensCurtidas, { foreignKey: "id_postagem" });
// Usuarios.hasOne(PostagensCurtidas, { foreignKey: "id_usuario" });
// PostagensCurtidas.sync({ alter: true });

module.exports = { PostagensCurtidas };