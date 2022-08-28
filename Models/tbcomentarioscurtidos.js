
const Sequelize = require('sequelize');
const conexaodb = require('./database.js').conexaodb;

const Comentarios = require('./tbcomentarios').Comentarios;
const Usuarios = require('./tbusuarios').Usuarios;

const ComentariosCurtidos = conexaodb.define('Tb_comentarios_curtidos', {

    id_comentario_curtido: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    id_comentario: {
        type: Sequelize.INTEGER, 
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false});

// Usuarios.hasOne(ComentariosCurtidos, { foreignKey: "id_usuario" });
// Comentarios.hasOne(ComentariosCurtidos, { foreignKey: "id_comentario" });
// ComentariosCurtidos.sync({ alter: true });

module.exports = { ComentariosCurtidos };