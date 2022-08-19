
const Express = require('express');
const myapp = Express();

myapp.use(Express.json());
myapp.use(Express.urlencoded({extended: true}));

module.exports = { myapp }

myapp.listen(3000, () => {

    console.log("Server Connected!");
    console.log("Url: http://localhost:3000/");
})