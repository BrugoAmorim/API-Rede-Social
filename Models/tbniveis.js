
const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const Niveis = conexaodb.define('Tb_Niveis', {

    id_nivel_acesso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nm_nivel_acesso: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ds_permissoes: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, { timestamps: false });

// Niveis.sync({ alter: true });

module.exports = { Niveis };