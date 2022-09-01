const { info } = require('console');

const TbUsuarios = require('../Models/tbusuarios').Usuarios;

async function validarLogin(req){
    
    const buscarUser = await TbUsuarios.findOne({ where: { ds_email: req.email }});
    
    if(buscarUser === null)
        throw new Error("Este usuário não foi encontrado, verifique o email e tente novamente");

    if(buscarUser.ds_senha !== req.senha)
        throw new Error("Senha de acesso incorreta");
        
    if(buscarUser.ds_status_usuario === "BANIDO")
        throw new Error("Este usuário foi banido do site permanentemente, por favor tente outro");

    return buscarUser;
}

async function validarNovaConta(req){

    const Usuarios = await TbUsuarios.findAll({});
    
    if(Usuarios.filter(x => x.ds_email == req.email).length > 0)
        throw new Error("Um Usuário já esta utilizando este email");
    
    if(Usuarios.filter(x => x.nm_usuario == req.usuario).length > 0)
        throw new Error("Este nome de usuário ja esta sendo usado");

    if(req.senha.length < 8)
        throw new Error("Senha muito curta, mínimo 8 caracteres");

    if(req.senha.length > 30)
        throw new Error("Senha muito longa, máximo 30 caracteres");

    if(req.senha.trim().includes(" ") === true)
        throw new Error("Não é permitido usar caracteres especiais, somente [!-@-#-$]");

    return req;
}

async function validareditConta(body, iduser){

    const Users = await TbUsuarios.findAll({});
    const infoConta = await TbUsuarios.findOne({ where: { id_usuario: iduser }});
    
    if(infoConta === null)
        throw new Error("Usuário não encontrado");

    if(infoConta.ds_senha !== body.senha)
        throw new Error("Campo senha incorreto, tente novamente para adicionar uma nova senha")

    if(Users.filter(x => x.ds_email == body.email && x.id_usuario !== infoConta.id_usuario).length > 0)
        throw new Error("Um Usuário já esta utilizando este email");
    
    if(Users.filter(x => x.nm_usuario == body.usuario && x.id_usuario !== infoConta.id_usuario).length > 0)
        throw new Error("Este nome de usuário já esta sendo usado");

    if(body.novasenha.length < 8)
        throw new Error("Senha muito curta, mínimo 8 caracteres");

    if(body.novasenha.length > 30)
        throw new Error("Senha muito longa, máximo 30 caracteres");

    if(body.novasenha.trim().includes(" ") === true)
        throw new Error("Não é permitido usar caracteres especiais, somente [!-@-#-$]");

}

module.exports = { validarLogin, validarNovaConta, validareditConta };