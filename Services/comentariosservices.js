
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Postagens = require('../Models/tbpostagens').Postagens;
const Comentarios = require('../Models/tbcomentarios').Comentarios;

async function novoComentario(coment, idpost, iduser){

    const BuscarPost = await Postagens.findAll({ where: { id_postagem: idpost } });
    const BuscarUser = await Usuarios.findAll({ where: { id_usuario: iduser }});
    
    coment = coment.trim();
    if(coment.length == 0)
        throw new Error("É necessário você escrever um comentário");

    if(BuscarPost.length == 0)
        throw new Error("Postagem não encontrada!");

    if(BuscarUser.length == 0)
        throw new Error("Usuário inválido");
}

async function editarComentario(comment, idcomment, iduser){

    const BuscarComment = await Comentarios.findOne({ where: { id_comentario: idcomment}});
    const BuscarUser = await Usuarios.findOne({ where: { id_usuario: iduser }});

    comment = comment.trim();
    if(comment.length == 0)
        throw new Error("É necessário você escrever um comentário");

    if(BuscarComment === null)
        throw new Error("Este comentário não foi encontrado!");

    if(BuscarUser === null)
        throw new Error("Usuário inválido");

    if(BuscarUser.id_usuario !== BuscarComment.id_usuario)
        throw new Error("Você não pode editar o comentário de outro usuário");
}

module.exports = { novoComentario, editarComentario };