
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

async function apagarComentario(iduser, idcomment){

    const BuscarComment = await Comentarios.findOne({ where: { id_comentario: idcomment}});
    const BuscarUser = await Usuarios.findOne({ where: { id_usuario: iduser }});

    if(BuscarComment === null)
        throw new Error("Comentário não encontrado");

    if(BuscarUser === null)
        throw new Error("Este usuário não existe");

    if(BuscarUser.id_usuario !== BuscarComment.id_usuario)
        throw new Error("Voce não pode excluir este comentário")
}

async function buscarComentarios(usuario){

    const user = await Usuarios.findOne({ where: { nm_usuario: usuario }});

    if(user === null)
        throw new Error("Este usuário não foi encontrado");

    const comments = await Comentarios.findAll({ where: { 
        id_usuario: user.id_usuario,
        ds_status_comentario: "ATIVO" 
    }});

    if(comments.length === 0)
        throw new Error("Este usuário ainda não fez comentários");

    return comments;
}

module.exports = { novoComentario, editarComentario, apagarComentario, buscarComentarios };