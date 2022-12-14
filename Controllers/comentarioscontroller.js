
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

const Comentarios = async (req, res) => {

    try{
        const { usuario } = req.query;

        if(usuario !== ""){
            const docs = await validar.buscarComentarios(usuario);

            const comentarios = await conversor.listaComentariosRes(docs);
            return res.status(200).json(comentarios);
        }

        const ComentariosAll = await TbComentarios.findAll({ where: { ds_status_comentario: "ATIVO" } });
        const caixote = await conversor.listaComentariosRes(ComentariosAll);

        return res.status(200).json(caixote)
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

const editarComentario = async (req, res) => {

    try{
        const { idUser, idComment } = req.params;
        const { comentario } = req.body;

        await validar.editarComentario(comentario, idComment, idUser);
        await TbComentarios.update({
            
            ds_comentario: comentario,
            dt_atualizacao: new Date()
        }, { where: { id_comentario: idComment } })

        await TbComentarios.findOne({ where: { id_comentario: idComment }}).then(async Comment => {

            const caixote = await conversor.converterTbparaRes(Comment);
            return res.status(200).json(caixote);
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400});
    }
}

const apagarComentario = async (req, res) => {

    try{
        const { idUser, idComment } = req.params;
        await validar.apagarComentario(idUser, idComment);
    
        await TbComentarios.destroy({ where: { id_usuario: idUser, id_comentario: idComment }}).then(() => {

            return res.status(200).json({ message: "Coment??rio exclu??do com ??xito", code: 200 });
        })
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

module.exports = { escreverComentario, curtirComentario, Comentarios, editarComentario, apagarComentario };