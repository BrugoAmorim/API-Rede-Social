
const TbNiveis = require('../Models/tbniveis').Niveis;
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

module.exports = { ConverterTBparaRes };