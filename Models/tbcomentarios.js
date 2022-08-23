
const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const Postagens = require('./tbpostagens').Postagens;
const Usuarios = require('./tbusuarios').Usuarios;

const Comentarios = conexaodb.define('tb_comentarios', {
    
    id_comentario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ds_comentario: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dt_publicacao: {
        type: Sequelize.DATE,
        default: new Date()
    },
    dt_atualizacao: {
        type: Sequelize.DATE,
        default: new Date()
    },
    id_usuario: {
        type: Sequelize.INTEGER
    },
    id_postagem: {
        type: Sequelize.INTEGER
    }

}, { timestamps: false});

// Comentarios.belongsTo(Usuarios, { foreignKey: "id_usuario" });
// Comentarios.belongsTo(Postagens, { foreignKey: "id_postagem" });
// Comentarios.sync({ alter: true });

module.exports = { Comentarios };
