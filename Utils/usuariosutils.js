
const TbNiveis = require('../Models/tbniveis').Niveis;
const TbUsuarios = require('../Models/tbusuarios').Usuarios;

const criarobjeto = require('../Models/Response/userresponse');

async function ConverterTBparaRes(obj){

    let modelRes = criarobjeto.ModelUsuarioRes();
    const infoNvl = await TbNiveis.findOne({ where: { id_nivel_acesso: obj.id_nivel_acesso } });

    modelRes.idusuario = obj.id_usuario;
    modelRes.nome = obj.nm_usuario;
    modelRes.email = obj.ds_email;
    modelRes.contacriada = obj.dt_criacao_conta;
    modelRes.ultimaatuailzacao = obj.dt_atualizacao_conta;
    modelRes.datanascimento = obj.dt_nascimento;
    modelRes.ultimologin = obj.dt_ultimo_login;
    modelRes.linkweb = obj.ds_link_web;
    modelRes.nivelacesso = infoNvl.nm_nivel_acesso;
    modelRes.status = obj.ds_status_usuario;

    return modelRes;
}

function TbUserparaModelSimples(obj){

    const ModelUser = require("../Models/Response/usuariosimplesresponse");
    const objetoRes = ModelUser.UsuarioSimplesRes();

    objetoRes.idUsuario = obj.id_usuario;
    objetoRes.nome = obj.nm_usuario;
    objetoRes.email = obj.ds_email;
    objetoRes.datanascimento = obj.dt_nascimento;
    objetoRes.linkweb = obj.ds_link_web;

    return objetoRes;
}

async function ListaModelSimplesUser(colecao){
    
    const ColecaoUsers = [];
    for(let item = 0; item < colecao.length; item++){

        const idUser = colecao[item];
        const user = await TbUsuarios.findOne({ where: { id_usuario: idUser.id_usuario }});

        const modelFormatadoUser = TbUserparaModelSimples(user);
        ColecaoUsers.push(modelFormatadoUser);
    }

    return ColecaoUsers;
}

module.exports = { ConverterTBparaRes, TbUserparaModelSimples, ListaModelSimplesUser };