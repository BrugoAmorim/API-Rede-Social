
const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const Usuarios = require('./tbusuarios').Usuarios;

const Postagens = conexaodb.define('Tb_Postagens', {

    id_postagem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nm_titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ds_conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dt_postagem: {
        type: Sequelize.DATE
    },
    dt_ultima_alteracao: {
        type: Sequelize.DATE
    },
    ds_status_postagem: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ATIVO"
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false });

// Usuarios.hasOne(Postagens, { foreignKey: "id_usuario" });
// Postagens.sync({ alter: true });

module.exports = { Postagens };