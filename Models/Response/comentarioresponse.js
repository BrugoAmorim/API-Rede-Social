
function comentariosRes(){

    return {
        idcomentario: '',
        comentario: '',
        datapublicacao: '',
        dataatualizacaocomentario: '',
        curtidas: 0,
        usuariocomentador: {},
        postagem: {}
    }
}

module.exports = { comentariosRes };