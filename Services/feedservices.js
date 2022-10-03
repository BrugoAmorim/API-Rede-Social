
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Postagens = require('../Models/tbpostagens').Postagens;

async function buscarPostsUser(nomeusuario){
 
    const infoUser = await Usuarios.findOne({ where: { nm_usuario: nomeusuario }});

    if(infoUser === null)
        throw new Error("Este usuário não foi encontrado");

    return infoUser;
}

async function validarQuemCurtiu(idPost, Curtidas){

    const post = await Postagens.findOne({ where: { id_postagem: idPost }});

    if(post === null)
        throw new Error("Postagem não encontrada");

    if(Curtidas.length === 0)
        throw new Error("Nenhuma curtida até o momento");

}

module.exports = { buscarPostsUser, validarQuemCurtiu };