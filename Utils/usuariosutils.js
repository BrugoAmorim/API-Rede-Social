
const criarobjeto = require('../Models/Response/userresponse');

function ConverterTBparaRes(obj){

    let modelRes = criarobjeto.ModelUsuarioRes();

    modelRes.idusuario = obj.id_usuario;
    modelRes.nome = obj.nm_usuario;
    modelRes.email = obj.ds_email;
    modelRes.contacriada = obj.dt_criacao_conta;
    modelRes.ultimaatuailzacao = obj.dt_atualizacao_conta;
    modelRes.datanascimento = obj.dt_nascimento;
    modelRes.ultimologin = obj.dt_ultimo_login;
    modelRes.linkweb = obj.ds_link_web;
    modelRes.nivelacesso = obj.id_nivel_acesso;
    
    return modelRes;
}

module.exports = { ConverterTBparaRes };