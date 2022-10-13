

const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const TbNiveis = require('./tbniveis').Niveis;

const Usuarios = conexaodb.define('tb_usuarios', {

    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nm_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ds_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ds_senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dt_criacao_conta: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    dt_atualizacao_conta: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: true
    },
    dt_ultimo_login: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    ds_link_web: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    id_nivel_acesso:{
        type: Sequelize.INTEGER
    },
    ds_status_usuario: {
        type: Sequelize.STRING
    }

}, { timestamps: false });

TbNiveis.hasOne(Usuarios, { foreignKey: "id_nivel_acesso" });
Usuarios.sync({ extends: true });

module.exports = { Usuarios };