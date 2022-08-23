
const validar = require('../Services/postagemservices');
const curtir = require('../Services/curtirpostagemservices');

const TbPostagens = require('../Models/tbpostagens').Postagens;
const TbPostagensCurtidas = require('../Models/tbpostagenscurtidas').PostagensCurtidas;

const conversor = require('../Utils/feedutils');

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
        }).then(async (data) => {
    
            const informacoesPost = await conversor.TBpostagemparaRes(data);
            return res.status(200).json(informacoesPost);
        })    
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 });
    }
}

const curtirPostagem = async (req, res) => {

    try{
        const { idPost, idUser } = req.params;
        const info = await curtir.validarCurtidaPostagem(idPost, idUser);

        if(info.curtida == true){

            await TbPostagensCurtidas.create({
                id_postagem: idPost,
                id_usuario: idUser,
            }).then(() => {

                return res.status(200).json({ message: info.message, code: 200 })
            })
        }
        else{

            await TbPostagensCurtidas.destroy({ where: {
                id_postagem: idPost,
                id_usuario: idUser,
            }}).then(() => {

                return res.status(200).json({ message: info.message, code: 200 })
            })
        }
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 })
    }
}

const feed = async (req, res) => {

    try{
        const validar = require('../Services/feedservices').buscarPostsUser;
    
        let buscarPostsUser = req.query.usuario;    
        let docs = await TbPostagens.findAll({});
    
        if(buscarPostsUser != ''){
            const user = await validar(buscarPostsUser);
            docs = docs.filter(x =>  x.id_usuario == user.id_usuario);
            
            if(docs.length == 0)
                return res.status(200).json({ message: "Este usuário ainda não publicou nada", code: 200});
        }
        
        const Feed = await conversor.MeuFeedUtils(docs);
        return res.status(200).json(Feed);
    }
    catch(err){

        return res.status(400).json({ message: err.message, code: 400 })
    }
}

// criar as funcoes de editar postagem e apagar postagem
module.exports = { publicarPostagem, curtirPostagem, feed };