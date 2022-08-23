
const Comentarios = require('../Models/tbcomentarios').Comentarios;
const Usuarios = require('../Models/tbusuarios').Usuarios;
const FeedRes = require('../Models/Response/feedresponse');

const utilsPostagem = require('../Utils/postagemutils');

async function ModeloUnicoFeed(obj){

    const infoPost = await utilsPostagem.TBpostagemparaRes(obj);
    const listaComentarios = [];

    const buscarComents = await Comentarios.findAll({ where: { id_postagem: infoPost.idpostagem }});
    for(let item = 0; item < buscarComents.length; item++){

        const infoComent = buscarComents[item];
        const buscarUser = await Usuarios.findOne({ where: { id_usuario: infoComent.id_usuario }});

        const modelComentario = {
            idcomentario: infoComent.id_comentario,
            comentario: infoComent.ds_comentario,
            ultimaalteracao: infoComent.dt_atualizacao,
            usuario: {    
                idusuario: buscarUser.id_usuario,
                nome: buscarUser.nm_usuario,
                email: buscarUser.ds_email,
                linkweb: buscarUser.ds_link_web
            }
        };

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