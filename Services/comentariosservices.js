
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Postagens = require('../Models/tbpostagens').Postagens;

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

module.exports = { novoComentario };