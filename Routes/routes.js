
const { myapp } = require('../myapp');

const controllerusers = require('../Controllers/usuarioscontroller');
const controllerPostagens = require('../Controllers/postagenscontroller');
const controllerComentarios = require('../Controllers/comentarioscontroller');
const controllerAdmeMod = require('../Controllers/admemodcontrollers');

// Rotas do usuario
myapp.post('/login', controllerusers.Login);

myapp.post('/criar-conta', controllerusers.CriarConta);

myapp.put('/conta/editar/:idUser', controllerusers.AtualizarConta);

myapp.delete('/conta/excluir/:idUser', controllerusers.ExcluirConta);

// Rotas postagem e feed
myapp.get('/feed', controllerPostagens.Feed);

myapp.post('/postagem/publicar/:idUser', controllerPostagens.publicarPostagem);

myapp.put('/postagem/editar/:idUser/:idPost', controllerPostagens.editarPostagem);

myapp.post('/postagem/curtir/:idPost/:idUser', controllerPostagens.curtirPostagem);

myapp.delete('/postagem/excluir/:idUser/:idPost', controllerPostagens.excluirPost);


// Rotas comentarios
myapp.get('/comentarios/buscar', controllerComentarios.Comentarios);

myapp.put('/comentario/editar/:idUser/:idComment', controllerComentarios.editarComentario);

myapp.post('/comentario/curtir/:idComment/:idUser', controllerComentarios.curtirComentario);

myapp.post('/comentario/escrever/:idPost/:idUser', controllerComentarios.escreverComentario);

myapp.delete('/comentario/excluir/:idUser/:idComment', controllerComentarios.apagarComentario);


// Rotas Administradores e Moderadores
myapp.put('/administrador/banir/:idAdmin/:idUser', controllerusers.BanirUsuario);

myapp.put('/administrador/desbanir/:idAdmin/:idUser', controllerusers.DesbanirUsuario);

myapp.put('/moderador/arquivar-postagem/:idAdminouMod/:idPost', controllerAdmeMod.arquivarPostagemUsuario);

myapp.put('/moderador/desarquivar-postagem/:idAdminouMod/:idPost', controllerAdmeMod.desarquivarPostagemUsuario);

myapp.put('/moderador/arquivar-comentario/:idAdminouMod/:idComment', controllerAdmeMod.arquivarComentarioUsuario);

myapp.put('/moderador/desarquivar-comentario/:idAdminouMod/:idComment', controllerAdmeMod.desarquivarComentarioUsuario);