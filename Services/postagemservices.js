
const Usuarios = require('../Models/tbusuarios').Usuarios;

async function novoPost(req, idusuario){

    const Users = await Usuarios.findAll({});

    if(req.titulo.length == 0)
        throw new Error("Você precisa definir um titulo na postagem");

    if(req.conteudo.length == 0)
        throw new Error("Campo conteúdo vazio");

    if(Users.filter(x => x.id_usuario == idusuario).length == 0)
        throw new Error("Usuário não encontrado");

    return req;
}

module.exports = { novoPost };