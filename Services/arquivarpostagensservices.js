
const Postagens = require('../Models/tbpostagens').Postagens;
const Usuarios = require('../Models/tbusuarios').Usuarios;

async function arquivarPost(idAdminouMod, idPost){

    const infoUsuario = await Usuarios.findOne({ where: { id_usuario: idAdminouMod }});
    const Post = await Postagens.findOne({ where: { id_postagem: idPost }});

    if(infoUsuario === null)
        throw new Error("Este usuário não foi encontrado");

    if(Post === null)
        throw new Error("Postagem não encontrada");

    const UsuarioPublicador = await Usuarios.findOne({ where: { id_usuario: Post.id_usuario }});

    if(infoUsuario.id_nivel_acesso === 1 && UsuarioPublicador.id_nivel_acesso === 1 && 
            infoUsuario.id_usuario !== UsuarioPublicador.id_usuario)
        throw new Error("Você não pode arquivar postagens de outro administrador");

    if(infoUsuario.id_nivel_acesso === 2 && UsuarioPublicador.id_nivel_acesso === 1)
        throw new Error("Você não pode arquivar postagens de um administrador");

    if(infoUsuario.id_nivel_acesso > 2)
        throw new Error("Você não tem permissão para arquivar postagens de outro usuário");
    
    if(Post.ds_status_postagem === "ARQUIVADO")
        throw new Error("Esta postagem já foi arquivada");
}

module.exports = { arquivarPost };