
function PostagemRes(){

    return {
        idpostagem: 0,
        titulo: '',
        conteudo: '',
        dataPostagem: '',
        dataultimaAlteracao: '',
        numeroCurtidas: 0,
        statuspostagem: '',
        usuarioPublicador: {},
    };
}

module.exports = { PostagemRes };