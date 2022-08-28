
const Usuarios = require('../Models/tbusuarios').Usuarios; 
const Comentarios = require('../Models/tbcomentarios').Comentarios;
const ComentariosCurtidos = require('../Models/tbcomentarioscurtidos').ComentariosCurtidos;

async function validarCurtidaComentario(idUser, idComentario){

    const regUser = await Usuarios.findOne({ where: { id_usuario: idUser }});
    const regComment = await Comentarios.findOne({ where: { id_comentario: idComentario }});

    const regCommentLiked = await ComentariosCurtidos.findOne({ where: { id_usuario: idUser, id_comentario: idComentario}});

    if(regUser === null)
        throw new Error("Usuario não encontrado");

    if(regComment === null)
        throw new Error("Comentário não encontrado");

    if(regCommentLiked !== null){

        await ComentariosCurtidos.destroy({ where: { id_comentario_curtido: regCommentLiked.id_comentario_curtido }});
        return { comentariocurtido: true, message: "Comentário descurtido" };
    }

    return { comentariocurtido: false, message: "Comentário curtido" }
}

module.exports = { validarCurtidaComentario };