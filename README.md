<h1 align="center"> Food Explorer by Caio Guimarães </h1>

<p align="center">Projeto para avaliação de conhecimentos da formação explorer, na <a href="https://app.rocketseat.com.br/journey/explorer/overview">RocketSeat.</a> <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-repos">Repositórios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="projeto Food Explorer by Caio Guimarães" src="https://caioguimaraes.net/filehost/preview_food_explorer.png" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML e CSS
- JavaScript
- React
- Styled-components - React
- Git e Github
- Vite
- Node.js
- Express
- Knex
- Sqlite
- JWT

## 💻 Projeto

O Food Explorer é uma aplicação web para restaurantes.
A formação comnpreende o desenvolvimento full-Stack com front-end em React e back-end em Node.js
Usuários em geral, podem visualizar pratos, detalhar o prato escolhido e comprá-los.
Usuários administradores podem visualizar pratos, detalhar pratos, criar, atualizar e excluir pratos.
A etapa de compra não é um requisito da entrega para avaliação e obtenção do certificado na formação explorer, sendo esta funcionalidade, um adicional para aprofundar os estudos(Vem na v2, hehehe.)

- [Acesse o projeto finalizado, online](https://foodexplorerbycaio.netlify.app/)

Usuários:
user@email.com | senha: 123
admin@e-mail.com | senha: 123

## 🔖 Layout

O layout não foi o foco deste treinamento, sendo assim, recebemos o projeto concluído do ponto de vista de UI.

- [Acesse o layout fornecido pela RocketaSeat](https://www.figma.com/community/file/1196874589259687769)

## repos

- [Front-end](https://github.com/caio-guimaraes-web/foodExplorer-front-end)
- [Back-end](https://github.com/caio-guimaraes-web/foodExplorer-back-end)

- Se você vai instalar o projeto localmente, pode utilizar a base de dados inicial, incluindo usuários e pratos, caso queira.<br>
- Você pode apagar a base de dados no back-end em src/database/database.db<br>
- Após apagar a base de dados, ao rodar o comando "npm run dev"no back-end a base de dados sqlite para a tabela user é criada automáticamente.<br>
- Após criar a base de dados, você precisará criar as outras tabelas através do comando: npm run migrate<br>
- Após criar a base e as tabelas, você pode repopular a base de dados, mas vai precisar criar um usuário admin.<br>
- Para criar um usuário admin você vai precisar alterar a coluna "is_admin" para o valor booleano 1, na tabela users. Você pode fazer isso manualmente ou através de um visualizador de base de dados como o beekeper studio, pois, não criei um painel para editar usuário.<br>
- Apenas usuários admin podem criar, editar e excluir pratos.<br>

## Licença

Esse projeto está sob a licença MIT.

---

Feito com ♥ by Caio Guimarães :wave: [Visite meu site(logo ele também será atualizado :)](https://caioguimaraes.net/)
