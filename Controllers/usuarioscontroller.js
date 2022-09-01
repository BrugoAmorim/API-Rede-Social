
const TbUsuarios = require('../Models/tbusuarios').Usuarios;
const validacoes = require('../Services/usuariosservices');

const conversor = require('../Utils/usuariosutils');

const Login = async (req, res) => {

    try{

        const body = { email, senha } = req.body;

        const modelTB = await validacoes.validarLogin(body);
        const modelRes = await conversor.ConverterTBparaRes(modelTB);

        return res.status(200).json(modelRes);
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 })
    }
}

const CriarConta = async (req, res) => {

    try{
        
        const bodyform = { usuario, email, senha, datanascimento, linkweb } = req.body;    
        const itemreq = await validacoes.validarNovaConta(bodyform);
        
        await TbUsuarios.create({
            nm_usuario: itemreq.usuario,
            ds_email: itemreq.email,
            ds_senha: itemreq.senha,
            dt_criacao_conta: new Date(),
            dt_atualizacao_conta: new Date(),
            dt_nascimento: itemreq.datanascimento,
            dt_ultimo_login: new Date(),
            ds_link_web: itemreq.linkweb,
            id_nivel_acesso: 3,
        }).then((data) => {

            return res.status(200).json(data);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

const AtualizarConta = async (req, res) => {

    try{
        
        const { idUser } = req.params;
        const info = { usuario, email, nascimento, linkweb, senha, novasenha } = req.body; 
        await validacoes.validareditConta(info, idUser);

        await TbUsuarios.update({ 

            nm_usuario: usuario,
            ds_email: email,
            ds_senha: novasenha,
            dt_atualizacao_conta: new Date(),
            dt_nascimento: nascimento,
            ds_link_web: linkweb  
        },
        {
            where: { id_usuario: idUser }
        })

        await TbUsuarios.findOne({ where: { id_usuario: idUser }}).then(async (data) => {

            const caixote = await conversor.ConverterTBparaRes(data);
            return res.status(200).json(caixote);
        })
    }
    catch(err){

        return res.status(400).json({error: err.message, code: 400});   
    }

}

//funcoes: apagar conta, banir usuario
module.exports = { Login, CriarConta, AtualizarConta };