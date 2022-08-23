
const TbComentarios = require('../Models/tbcomentarios').Comentarios;

const validar = require('../Services/comentariosservices');
const conversor = require('../Utils/comentariosutils');

const escreverComentario = async (req, res) => {

    try{
        const { idPost, idUser } = req.params;
        const { comentario } = req.body;

        await validar.novoComentario(comentario, idPost, idUser);

        TbComentarios.create({

            ds_comentario: comentario,
            dt_publicacao: new Date(),
            dt_atualizacao: new Date(),
            id_usuario: idUser,
            id_postagem: idPost
        }).then(async (data) => {

            const caixote = await conversor.converterTbparaRes(data);
            return res.status(200).json(caixote);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { escreverComentario };