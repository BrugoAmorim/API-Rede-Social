# API-Rede-Social
API de uma rede social fictícia desenvolvida em node-express

Neste sistema será elaborado uma API de uma rede social utilizando node express e mysql como banco de dados. O projeto tem como objetivo colocar todos os meus conhecimentos em javascript na prática, implementando todo o conhecimento estudado ao longo do ano.

## Rodar localmente

Para rodar o projeto em sua máquina, você precisa ter instalado o banco de dados MySql e o NodeJs. Após isso basta entrar no editor de código instalado em seu computador e executar os seguintes comandos no terminal:

```
npm install
```
```
cd routes
```
```
nodemon routes
```
## Tasks:
 
- [x] Login
- [x] Criar Conta
- [x] Feed
- [x] Publicar Postagem
- [x] Curtir Postagem
- [x] Editar Postagem
- [x] Banir/Desbanir Usuário (Administradores)
- [x] Comentar
- [x] Curtir Comentário
- [x] Comentários
- [x] Excluir Postagem
- [x] Editar Comentário
- [x] Apagar Comentário
- [x] Arquivar/Desarquivar Publicação do Usuário (Administradores e Moderadores)
- [x] Arquivar/Desarquivar Comentário do Usuário (Administradores e Moderadores)
- [x] QuemCurtiu

>Todas as funcionalidades da API

# Url's da aplicação

### Feed - GET
Esta url retorna todas as postagens registradas no banco de dados, exceto aquelas que estiverem com status "ARQUIVADO". Caso você queira ver as postagens de um unico usuário, você pode informar o nome dele junto a url. 

Se este usuário ainda não tiver publicado nenhuma postagem, o sistema retorna um código <strong>200</strong> informando que ele ainda não postou nada. Caso o usuário não exista, o sistema retorna um código <strong>400</strong> informando que o mesmo não foi encontrado.

<code>
  http://localhost:3000/feed?usuario=
</code>

###

O sistema retorna uma coleção de arrays, onde cada array possui 2 sub-arrays, o primeiro mostrando as informações da postagem, além tambem do usuário que a publicou, e outro mostrando os comentários referentes a essa postagem, junto das informações da pessoa que fez o comentário

```
[
    {
        Postagem: {
            idpostagem: $'ID DA POSTAGEM',
            titulo: $'TITULO DA POSTAGEM',
            conteudo: $'CONTEUDO DA POSTAGEM',
            dataPostagem: $'DATA DA POSTAGEM',
            dataultimaAlteracao: $'DATA ULTIMA ALTERACAO',
            numeroCurtidas: $'CURTIDAS DA POSTAGEM',
            statuspostagem: $'STATUS DA POSTAGEM',
            usuarioPublicador: {
                idUsuario: $'ID DO USUARIO',
                nome: $'NOME DO USUARIO',
                email: $'EMAIL DO USUARIO',
                datanascimento: $'DATA DE NASCIMENTO DO USUARIO',
                linkweb: $'LINK WEB DO USUARIO' 
            }
        },
        Comentarios: [
            {
                idcomentario: $'ID DO COMENTARIO',
                comentario: $'COMENTARIO',
                ultimaalteracao: $'DATA DA ULTIMA ALTERACAO',
                curtidas: $'CURTIDAS DO COMENTARIO',
                usuario: {
                    idusuario: $'ID DO USUARIO',
                    nome: $'NOME DO USUARIO',
                    email: $'EMAIL DO USUARIO',
                    datanascimento: $'DATA DE NASCIMENTO DO USUARIO',
                    linkweb: $'LINK WEB DO USUARIO' 
                }
            }
        ]
    }
]
```

### Publicar Postagem - POST

Url para publicar uma nova postagem. A função recebe uma requisição com apenas dois campos, o 'titulo' e o 'conteudo' da postagem, além do id do usuário que vai fazer a postagem do contéudo.

<code>
   http://localhost:3000/postagem/publicar/:idUser
</code>
 
###

```
{
  "titulo": $'TITULO DA POSTAGEM',
  "conteudo": $'CONTEUDO DA POSTAGEM'
}
```

Nesse método todos os campos são obrigatórios, portanto, se o usuário deixar um deles vazio será retornado um código <strong>400</strong>, e obviamente, se o id do usuário não existir, será exibido uma mensagem dizendo que esse usuário não foi encontrado. Caso ele não cometa nenhum desses erros o código <strong>200</strong> é retornado junto do modelo response

```
{
    idpostagem: $'ID DA POSTAGEM',
    titulo: $'TITULO DA POSTAGEM',
    conteudo: $'CONTEUDO DA POSTAGEM',
    dataPostagem: $'DATA DA POSTAGEM',
    dataultimaAlteracao: $'DATA ULTIMA ALTERACAO',
    numeroCurtidas: $'CURTIDAS DA POSTAGEM',
    statuspostagem: $'STATUS DA POSTAGEM',
    usuarioPublicador: {
        idUsuario: $'ID DO USUARIO',
        nome: $'NOME DO USUARIO',
        email: $'EMAIL DO USUARIO',
        datanascimento: $'DATA DE NASCIMENTO DO USUARIO',
        linkweb: $'LINK WEB DO USUARIO' 
    }
}
```

### Login - POST

Url pertencente a funcionalidade Login. Esse método recebe um formulário com apenas dois campos, o campo 'email' e 'senha'

<code>
  http://localhost:3000/login
</code>

###

```
{
  "email": $'EMAIL DO USUARIO',
  "senha": $'SENHA DO USUARIO'
}
```

Suas validações consistem em verificar se o email informado existe no banco de dados e se a senha informada corresponde ao email cadastrado, caso as informações estejam corretas o sistema retorna um código <strong>200</strong> junto do modelo response

```
{
    idusuario: $'ID DO USUARIO',
    nome: $'NOME DO USUARIO',
    email: $'EMAIL DO USUARIO',
    contacriada: $'DATA DA CRIACAO CONTA',
    ultimaatuailzacao: $'DATA DA ULTIMA ATUALIZACAO CONTA',
    datanascimento: $'DATA DE NASCIMENTO',
    ultimologin: $'DATA DO ULTIMO LOGIN',
    linkweb: $'LINK WEB DO USUARIO',
    nivelacesso: $'NIVEL DE ACESSO',
    status: $'STATUS DO USUARIO'
}
```

## Modelagem do banco de dados

<div display="flex">
   <img src="https://user-images.githubusercontent.com/87936511/193318141-ceb21214-86e7-4ff4-b2de-12f89290c7b0.PNG"/>
</div>

