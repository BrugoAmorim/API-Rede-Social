
const Postagens = require('../Models/tbpostagens').Postagens;
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Comentarios = require('../Models/tbcomentarios').Comentarios;

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

async function desarquivarPostagem(idAdminouMod, idPost){
   
    const infoUsuario = await Usuarios.findOne({ where: { id_usuario: idAdminouMod }});
    const Post = await Postagens.findOne({ where: { id_postagem: idPost }});

    if(infoUsuario === null)
        throw new Error("Este usuário não foi encontrado");

    if(Post === null)
        throw new Error("Postagem não encontrada");

    const UsuarioPublicador = await Usuarios.findOne({ where: { id_usuario: Post.id_usuario }});

    if(infoUsuario.id_nivel_acesso === 1 && UsuarioPublicador.id_nivel_acesso === 1 && 
            infoUsuario.id_usuario !== UsuarioPublicador.id_usuario)
        throw new Error("Você não pode desarquivar postagens de outro administrador");

    if(infoUsuario.id_nivel_acesso === 2 && UsuarioPublicador.id_nivel_acesso === 1)
        throw new Error("Você não tem permissão para desarquivar postagens de administradores");

    if(infoUsuario.id_nivel_acesso > 2)
        throw new Error("Você não tem permissão para desarquivar postagens de outro usuário");
    
    if(Post.ds_status_postagem === "ATIVO")
        throw new Error("Essa postagem já foi desarquivada");

}

async function arquivarComentario(idAdminouMod, idComment){

    const comment = await Comentarios.findOne({ where: { id_comentario: idComment }});
    const AdmOrMOd = await Usuarios.findOne({ where: { id_usuario: idAdminouMod }});

    if(comment === null)
        throw new Error("Comentario não encontrado");

    if(AdmOrMOd === null)
        throw new Error("Usuário não encontrado");

    const infoUserComment = await Usuarios.findOne({ where: { id_usuario: comment.id_usuario }});

    if(AdmOrMOd.id_nivel_acesso === 1 && infoUserComment.id_nivel_acesso === 1 &&
        AdmOrMOd.id_usuario !== comment.id_usuario)
        throw new Error("Você não pode arquivar comentários de outros administradores");

    if(AdmOrMOd.id_nivel_acesso === 2 && infoUserComment.id_nivel_acesso === 1)
        throw new Error("Você não pode arquivar o comentário de um administrador");

    if(AdmOrMOd.id_nivel_acesso > 2)
        throw new Error("Você não tem permissão para arquivar comentários");

    if(comment.ds_status_comentario === "ARQUIVADO")
        throw new Error("Esse comentário já foi arquivado");
}

async function desarquivarComentario(idAdminouMod, idComment){
    
    const comment = await Comentarios.findOne({ where: { id_comentario: idComment }});
    const AdmOrMOd = await Usuarios.findOne({ where: { id_usuario: idAdminouMod }});

    if(comment === null)
        throw new Error("Esse comentário não foi encontrado");

    if(AdmOrMOd === null)
        throw new Error("Esse usuário não foi encontrado");

    const infoUserComment = await Usuarios.findOne({ where: { id_usuario: comment.id_usuario }});

    if(AdmOrMOd.id_nivel_acesso === 1 && infoUserComment.id_nivel_acesso === 1 &&
        AdmOrMOd.id_usuario !== comment.id_usuario)
        throw new Error("Você não pode desarquivar o comentário de outro administradore");

    if(AdmOrMOd.id_nivel_acesso === 2 && infoUserComment.id_nivel_acesso === 1)
        throw new Error("Você não pode desarquivar o comentário de um administrador");

    if(AdmOrMOd.id_nivel_acesso > 2)
        throw new Error("Você não tem permissão para realizar está operação");

    if(comment.ds_status_comentario === "ATIVO")
        throw new Error("Esse comentário já foi desarquivado");
}

module.exports = { arquivarPost, desarquivarPostagem, arquivarComentario, desarquivarComentario };