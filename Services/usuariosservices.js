
const TbUsuarios = require('../Models/tbusuarios').Usuarios;

async function validarLogin(req){
    
    const buscarUser = await TbUsuarios.findOne({ where: { ds_email: req.email }});
    
    if(buscarUser === null)
        throw new Error("Este usuário não foi encontrado, verifique o email e tente novamente");

    if(buscarUser.ds_senha !== req.senha)
        throw new Error("Senha de acesso incorreta");

    return buscarUser;
}

async function validarNovaConta(req){

    const Usuarios = await TbUsuarios.findAll({});
    
    if(Usuarios.filter(x => x.ds_email == req.email).length > 0)
        throw new Error("Um Usuário já esta utilizando este email");
    
    if(Usuarios.filter(x => x.nm_usuario == req.usuario).length > 0)
        throw new Error("Este nome de usuário ja esta sendo usado");

    if(req.senha.length < 8 || req.senha.length > 30)
        throw new Error("Senha inválida, por favor tente outra");

    if(req.senha.trim().includes(" ") === true)
        throw new Error("Não é permitido usar caracteres especiais, somente [!-@-#-$]");

    return req;
}

module.exports = { validarLogin, validarNovaConta };