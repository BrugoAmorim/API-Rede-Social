
const { myapp } = require('../myapp');

const controllerusers = require('../Controllers/usuarioscontroller');
const controllerPostagens = require('../Controllers/postagenscontroller');
const controllerComentarios = require('../Controllers/comentarioscontroller');

// Rotas do usuario
myapp.post('/login', controllerusers.Login);

myapp.post('/criar-conta', controllerusers.CriarConta);

myapp.put('/editar-informacoes/:idUser', controllerusers.AtualizarConta);

myapp.delete('/excluir-conta/:idUser', controllerusers.ExcluirConta);

myapp.put('/banir-conta/:idAdmin/:idUser', controllerusers.BanirUsuario);

myapp.put('/desbanir-conta/:idAdmin/:idUser', controllerusers.DesbanirUsuario);


// Rotas postagem e feed
myapp.post('/publicar/:idUser', controllerPostagens.publicarPostagem);

myapp.post('/curtir-post/:idPost/:idUser', controllerPostagens.curtirPostagem);

myapp.get('/feed', controllerPostagens.Feed);

myapp.put('/editar-postagem/:idUser/:idPost', controllerPostagens.editarPostagem);

myapp.delete('/excluir-postagem/:idUser/:idPost', controllerPostagens.excluirPost);


// Rotas comentarios
myapp.post('/escrever-comentario/:idPost/:idUser', controllerComentarios.escreverComentario);

myapp.post('/curtir-comentario/:idComment/:idUser', controllerComentarios.curtirComentario);

myapp.get('/buscar-comentarios', controllerComentarios.Comentarios);

myapp.put('/editar-comentario/:idUser/:idComment', controllerComentarios.editarComentario);