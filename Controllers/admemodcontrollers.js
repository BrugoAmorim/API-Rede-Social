

const validacoes = require('../Services/arquivarservices');
const postsUtils = require('../Utils/feedutils');
const commentsUtils = require('../Utils/comentariosutils');

const TbPostagens = require('../Models/tbpostagens').Postagens;
const TbComentarios = require('../Models/tbcomentarios').Comentarios;

const arquivarPostagemUsuario = async (req, res) => {

    try{

        const { idAdminouMod, idPost } = req.params;
        await validacoes.arquivarPost(idAdminouMod, idPost);

        await TbPostagens.update({
            ds_status_postagem: "ARQUIVADO"
        }, { where: { id_postagem: idPost } });

        await TbPostagens.findOne({ where: { id_postagem: idPost } }).then(async postArquivado => {

            const caixote = await postsUtils.ModeloUnicoFeed(postArquivado);
            return res.status(200).json(caixote);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

const desarquivarPostagemUsuario = async (req, res) => {

    try{

        const { idAdminouMod, idPost } = req.params;
        await validacoes.desarquivarPostagem(idAdminouMod, idPost);

        await TbPostagens.update({

            ds_status_postagem: "ATIVO"
        }, { where: { id_postagem: idPost } });

        const postDesarquivado = await TbPostagens.findOne({ where: { id_postagem: idPost } });
        postsUtils.ModeloUnicoFeed(postDesarquivado).then(caixoteres => {

            return res.status(200).json(caixoteres);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }

}

const arquivarComentarioUsuario = async(req, res) => {

    try{
        const { idAdminouMod, idComment } = req.params;
        await validacoes.arquivarComentario(idAdminouMod, idComment);

        await TbComentarios.update({
            ds_status_comentario: "ARQUIVADO"
        }, 
        {
            where: { id_comentario: idComment }
        });

        const comentario = await TbComentarios.findOne({ where: { id_comentario: idComment }});
        await commentsUtils.converterTbparaRes(comentario).then(caixoteres => {

            return res.status(200).json(caixoteres);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

const desarquivarComentarioUsuario = async (req, res) => {

    try{
        
        const { idAdminouMod, idComment } = req.params;    
        await validacoes.desarquivarComentario(idAdminouMod, idComment);

        await TbComentarios.update({
            ds_status_comentario: "ATIVO"
        }, 
        {
            where: { id_comentario: idComment }
        });

        await TbComentarios.findOne({ where: { id_comentario: idComment }}).then(async comment => {

            const caixoteres = await commentsUtils.converterTbparaRes(comment);
            return res.status(200).json(caixoteres);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { arquivarPostagemUsuario, desarquivarPostagemUsuario, arquivarComentarioUsuario, desarquivarComentarioUsuario };