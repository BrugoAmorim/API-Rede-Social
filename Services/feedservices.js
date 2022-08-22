
const Usuarios = require('../Models/tbusuarios').Usuarios;

async function buscarPostsUser(nomeusuario){
 
    const infoUser = await Usuarios.findOne({ where: { nm_usuario: nomeusuario }});

    if(infoUser === null)
        throw new Error("Este usuário não foi encontrado");

    return infoUser;
}

module.exports = { buscarPostsUser };