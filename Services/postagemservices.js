
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Postagens = require('../Models/tbpostagens').Postagens;

async function novoPost(req, idusuario){

    const Users = await Usuarios.findAll({});

    req.titulo = req.titulo.trim();
    req.conteudo = req.conteudo.trim();

    if(req.titulo.length == 0)
        throw new Error("Você precisa definir um titulo na postagem");

    if(req.conteudo.length == 0)
        throw new Error("Campo conteúdo vazio");

    if(Users.filter(x => x.id_usuario == idusuario).length == 0)
        throw new Error("Usuário não encontrado");

    return req;
}

async function validarEditPost(bodyform, idUser, idPostagem){

    const Post = await Postagens.findOne({ where: { id_postagem: idPostagem }});
    const User = await Usuarios.findOne({ where: { id_usuario: idUser }});

    if(Post === null)
        throw new Error("Postagem não encontrada!");

    await novoPost(bodyform, idUser);

    if(Post.id_usuario !== User.id_usuario)
        throw new Error("Você não pode alterar a publicação de outro usuário");

}

module.exports = { novoPost, validarEditPost };