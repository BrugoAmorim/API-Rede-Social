
const Postagens = require('../Models/tbpostagens').Postagens;
const Usuarios = require('../Models/tbusuarios').Usuarios;
const PostagensCurtidas = require('../Models/tbpostagenscurtidas').PostagensCurtidas;

async function validarCurtidaPostagem(idPost, idUser){

    const posts = await Postagens.findAll({});
    const users = await Usuarios.findAll({});
    const likesposts = await PostagensCurtidas.findAll({});

    if(posts.filter(x => x.id_postagem == idPost).length == 0)
        throw new Error('Postagem não encontrada');

    if(users.filter(x => x.id_usuario == idUser).length == 0)
        throw new Error('Usuário não encontrado');

    const postcurtido = likesposts.filter(x => x.id_postagem == idPost && x.id_usuario == idUser);

    if(postcurtido.length > 0){
        return { message: "postagem descurtida", curtida: false };
    }

    return { message: "postagem curtida", curtida: true };
}

module.exports = { validarCurtidaPostagem };