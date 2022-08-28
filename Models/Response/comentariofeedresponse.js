
function comentarioFeed(){

    return {
        idcomentario: 0,
        comentario: '',
        ultimaalteracao: '',
        curtidas: 0,
        usuario: {
            idusuario: 0,
            nome: '',
            email: '',
            datanascimento: '',
            linkweb: ''
        }
    }
}

module.exports = { comentarioFeed };