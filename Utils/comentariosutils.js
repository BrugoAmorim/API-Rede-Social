
const Usuarios = require('../Models/tbusuarios').Usuarios;
const Postagens = require('../Models/tbpostagens').Postagens;
const TbComentariosCurtidos = require('../Models/tbcomentarioscurtidos').ComentariosCurtidos;

const criarModel = require('../Models/Response/comentarioresponse');
const criarModelUser = require('../Models/Response/usuariosimplesresponse');
const utilspostagem = require('../Utils/postagemutils');

async function converterTbparaRes(obj){

    const buscarPost = await Postagens.findOne({ where: { id_postagem: obj.id_postagem } });
    const infoPost = await utilspostagem.TBpostagemparaRes(buscarPost);

    const buscarUser = await Usuarios.findOne({ where: { id_usuario: obj.id_usuario } });
    
    const infoUser = criarModelUser.UsuarioSimplesRes();
    infoUser.idUsuario = buscarUser.id_usuario;
    infoUser.nome = buscarUser.nm_usuario;
    infoUser.email = buscarUser.ds_email;
    infoUser.datanascimento = buscarUser.dt_nascimento;
    infoUser.linkweb = buscarUser.ds_link_web;
    
    const comentarioRes = criarModel.comentariosRes();
    comentarioRes.idcomentario = obj.id_comentario
    comentarioRes.comentario = obj.ds_comentario;
    comentarioRes.datapublicacao = obj.dt_publicacao;
    comentarioRes.dataatualizacaocomentario = obj.dt_atualizacao;
    comentarioRes.statuscomentario = obj.ds_status_comentario;
    comentarioRes.usuariocomentador = infoUser;
    comentarioRes.postagem = infoPost;
    
    return comentarioRes;
}

async function listaComentariosRes(docs){
    
    const comentarios = [];
    for(let item = 0; item < docs.length; item++){

        const caixote = await converterTbparaRes(docs[item]);

        const curtidas = await TbComentariosCurtidos.findAll({ where: { id_comentario: caixote.idcomentario }});
        caixote.curtidas = curtidas.length;

        comentarios.push(caixote);
    }

    return comentarios;
}

module.exports = { converterTbparaRes, listaComentariosRes };
