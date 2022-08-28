
const TbComentarios = require('../Models/tbcomentarios').Comentarios;
const TbComentariosCurtidos = require('../Models/tbcomentarioscurtidos').ComentariosCurtidos;

const validar = require('../Services/comentariosservices');
const curtircomentario = require('../Services/curtircomentarioservices');

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

const curtirComentario = async (req, res) => {

    try{

        const { idComment, idUser } = req.params;
        const validarcomentario = await curtircomentario.validarCurtidaComentario(idUser, idComment);
        
        if(validarcomentario.comentariocurtido === false){

            await TbComentariosCurtidos.create({

                id_comentario: idComment,
                id_usuario: idUser
            }).then(() => {

                return res.status(200).json({ message: validarcomentario.message, code: 200 });
            })
        }
        else{

            return res.status(200).json({ message: validarcomentario.message, code: 200 });
        }
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { escreverComentario, curtirComentario };