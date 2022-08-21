
const { myapp } = require('../myapp');
const Controllers = require('../Controllers/postagenscontroller');

myapp.post('/publicar/:idUser', Controllers.publicarPostagem);