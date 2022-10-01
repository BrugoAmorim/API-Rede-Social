
const Usuarios = require('../Models/tbusuarios').Usuarios;
const PostagensCurtidas = require('../Models/tbpostagenscurtidas').PostagensCurtidas;
const Comentarios = require('../Models/tbcomentarios').Comentarios;

const criarModel = require('../Models/Response/postagemresponse');
const CriarModelUser = require('../Models/Response/usuariosimplesresponse');

async function TBpostagemparaRes(obj){

    const buscarUser = await Usuarios.findOne({ where: { id_usuario: obj.id_usuario }});
    
    const infoUser = CriarModelUser.UsuarioSimplesRes();
    infoUser.idUsuario = obj.id_usuario;
    infoUser.nome = buscarUser.nm_usuario;
    infoUser.email = buscarUser.ds_email;
    infoUser.datanascimento = buscarUser.dt_nascimento;
    infoUser.linkweb = buscarUser.ds_link_web;

    let modeloRes = criarModel.PostagemRes();
    modeloRes.idpostagem = obj.id_postagem;
    modeloRes.titulo = obj.nm_titulo;
    modeloRes.conteudo = obj.ds_conteudo;
    modeloRes.dataPostagem = obj.dt_postagem;
    modeloRes.dataultimaAlteracao = obj.dt_ultima_alteracao;
    modeloRes.statuspostagem = obj.ds_status_postagem;
    modeloRes.usuarioPublicador = infoUser;

    const nrCuritdas = await PostagensCurtidas.findAll({ where: { id_postagem: obj.id_postagem }});
    modeloRes.numeroCurtidas = nrCuritdas.length;

    return modeloRes;
}

module.exports = { TBpostagemparaRes };