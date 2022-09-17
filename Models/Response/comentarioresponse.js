
function comentariosRes(){

    return {
        idcomentario: '',
        comentario: '',
        datapublicacao: '',
        dataatualizacaocomentario: '',
        curtidas: 0,
        statuscomentario: '',
        usuariocomentador: {},
        postagem: {}
    }
}

module.exports = { comentariosRes };