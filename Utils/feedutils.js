
const Comentarios = require('../Models/tbcomentarios').Comentarios;
const Usuarios = require('../Models/tbusuarios').Usuarios;
const ComentariosCurtidos = require('../Models/tbcomentarioscurtidos').ComentariosCurtidos;

const FeedRes = require('../Models/Response/feedresponse');
const ComentarioFeedRes = require('../Models/Response/comentariofeedresponse').comentarioFeed;

const utilsPostagem = require('../Utils/postagemutils');

async function ModeloUnicoFeed(obj){

    const infoPost = await utilsPostagem.TBpostagemparaRes(obj);
    const listaComentarios = [];

    const buscarComents = await Comentarios.findAll({ 
        where: { id_postagem: infoPost.idpostagem,
                 ds_status_comentario: "ATIVO" }});

    for(let item = 0; item < buscarComents.length; item++){

        const infoComent = buscarComents[item];
        const buscarUser = await Usuarios.findOne({ where: { id_usuario: infoComent.id_usuario }});
        const numeroCurtidas = await ComentariosCurtidos.findAll({ where: { id_comentario: infoComent.id_comentario }});

        const modelComentario = ComentarioFeedRes();
        modelComentario.idcomentario = infoComent.id_comentario;
        modelComentario.comentario = infoComent.ds_comentario;
        modelComentario.ultimaalteracao = infoComent.dt_atualizacao;
        modelComentario.curtidas = numeroCurtidas.length;

        modelComentario.usuario.idusuario = buscarUser.id_usuario;
        modelComentario.usuario.nome = buscarUser.nm_usuario;
        modelComentario.usuario.email = buscarUser.ds_email;
        modelComentario.usuario.datanascimento = buscarUser.dt_nascimento;
        modelComentario.usuario.linkweb = buscarUser.ds_link_web;

        listaComentarios.push(modelComentario);
    }
   
    const MeuFeed = FeedRes.FeedRes();
    MeuFeed.Postagem = infoPost;
    MeuFeed.Comentarios = listaComentarios;

    return MeuFeed;
}

async function MeuFeedUtils(postagens){

    let caixote = [];
    for(let item = 0; item < postagens.length; item++){

        const post = postagens[item];
        const postRes = await ModeloUnicoFeed(post);
        
        caixote.push(postRes);
    }

    return caixote;
}

module.exports = { ModeloUnicoFeed, MeuFeedUtils };