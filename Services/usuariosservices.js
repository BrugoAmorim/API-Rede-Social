
const TbUsuarios = require('../Models/tbusuarios').Usuarios;
const TbNiveis = require('../Models/tbniveis').Niveis;

async function validarLogin(req){
    
    const buscarUser = await TbUsuarios.findOne({ where: { ds_email: req.email }});
    
    if(buscarUser === null)
        throw new Error("Este usuário não foi encontrado. Verifique o email e tente novamente");

    if(buscarUser.ds_senha !== req.senha)
        throw new Error("Senha de acesso incorreta");
        
    if(buscarUser.ds_status_usuario === "BANIDO")
        throw new Error("Este usuário foi banido do site, por favor tente outro");

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

async function validarExcluirConta(iduser, senha){

    const usuario = await TbUsuarios.findOne({ where: { id_usuario: iduser }});

    if(usuario === null)
        throw new Error("Conta não encontrada");

    if(usuario.ds_senha !== senha)
        throw new Error("A senha não coincide com a conta");

}

async function validarBanimentoUsuario(idadmin, iduser){

    const Admin = await TbUsuarios.findOne({ where: { id_usuario: idadmin }});
    const User = await TbUsuarios.findOne({ where: { id_usuario: iduser }});

    if(Admin === null)
        throw new Error("Este administrador não foi encontrado");

    if(User === null)
        throw new Error("Este usuário não foi encontrado");

    const nvlAdmin = await TbNiveis.findOne({ where: { id_nivel_acesso: Admin.id_nivel_acesso }});

    if(nvlAdmin.ds_permissoes.includes("banir-contas") === false)
        throw new Error("Você não tem permissão para banir usuários");

    if(Admin.id_usuario === User.id_usuario)
        throw new Error("Você não pode se banir");

    if(Admin.id_nivel_acesso === User.id_nivel_acesso)
        throw new Error("Não é possivel banir outros administradores do site");

    if(User.ds_status_usuario === "BANIDO")
        throw new Error("O usuário " + User.nm_usuario + " já foi banido do site");    

}

module.exports = { validarLogin, validarNovaConta, validareditConta, validarExcluirConta, validarBanimentoUsuario };