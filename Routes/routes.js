
const { myapp } = require('../myapp');

const controllerusers = require('../Controllers/usuarioscontroller');
const controllerPostagens = require('../Controllers/postagenscontroller');
const controllerComentarios = require('../Controllers/comentarioscontroller');

// Rotas do usuario
myapp.post('/login', controllerusers.Login);

myapp.post('/criar-conta', controllerusers.CriarConta);

// Rotas postagem e feed
myapp.post('/publicar/:idUser', controllerPostagens.publicarPostagem);

myapp.post('/curtir-post/:idPost/:idUser', controllerPostagens.curtirPostagem);

myapp.get('/feed', controllerPostagens.feed);

// Rotas comentarios
myapp.post('/escrever-comentario/:idPost/:idUser', controllerComentarios.escreverComentario);