

const validacoes = require('../Services/arquivarpostagensservices');
const TbPostagens = require('../Models/tbpostagens').Postagens;

const conversor = require('../Utils/feedutils');

const arquivarPostagemUsuario = async (req, res) => {

    try{

        const { idAdminouMod, idPost } = req.params;
        await validacoes.arquivarPost(idAdminouMod, idPost);

        await TbPostagens.update({
            ds_status_postagem: "ARQUIVADO"
        }, { where: { id_postagem: idPost } });

        await TbPostagens.findOne({ where: { id_postagem: idPost } }).then(async (postArquivado) => {

            const caixote = await conversor.ModeloUnicoFeed(postArquivado);
            return res.status(200).json(caixote);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { arquivarPostagemUsuario };