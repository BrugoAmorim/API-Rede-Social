
const validar = require('../Services/postagemservices');
const TbPostagens = require('../Models/tbpostagens').Postagens;

const publicarPostagem = async (req, res) => {
    
    try{

        const idUser = req.params.idUser;
        const bodypostagem = { titulo, conteudo } = req.body;

        await validar.novoPost(bodypostagem, idUser);
        await TbPostagens.create({
    
            nm_titulo: bodypostagem.titulo.trim(),
            ds_conteudo: bodypostagem.conteudo.trim(),
            dt_postagem: Date.now(),
            dt_ultima_alteracao: Date.now(),
            id_usuario: idUser
        }).then((data) => {
    
            return res.status(200).json(data);
        })    
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { publicarPostagem };