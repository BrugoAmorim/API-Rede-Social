
const { myapp } = require('../myapp');
const controllerusers = require('../Controllers/usuarioscontroller');

myapp.post('/login', controllerusers.Login);

myapp.post('/criar-conta', controllerusers.CriarConta);