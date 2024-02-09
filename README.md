# NLW-Notes (ROCKETSEAT)

## Visão Geral:

O projeto NLW-Notes é uma aplicação web desenvolvida com o objetivo de fornecer aos usuários uma plataforma para criar e gerenciar notas de forma eficiente. Utilizando tecnologias modernas como React, Firebase, Tailwind CSS, Lucide e Sonner, o NLW-Notes oferece uma experiência amigável, intuitiva e responsiva.

### Tecnologias Utilizadas:

## Expanding the ESLint configuration

* React: O framework JavaScript utilizado para a construção da interface do usuário, oferecendo uma experiência dinâmica e responsiva.

* Firebase: O Firebase é utilizado como banco de dados para armazenar as notas dos usuários, além de fornecer autenticação para gerenciar o registro e login dos usuários de forma segura e eficiente.

* Tailwind CSS: Um framework de estilização utilizado para garantir um design moderno e responsivo para a aplicação, permitindo uma fácil customização e manutenção do estilo.

* Lucide: Biblioteca de ícones SVG utilizada para adicionar ícones apropriados e intuitivos à interface do usuário, facilitando a identificação de diferentes elementos e funcionalidades.

* Sonner: Uma biblioteca utilizada para implementar notificações na aplicação, permitindo que os usuários sejam informados sobre eventos importantes de forma proativa.

## Funcionalidades Principais:

### Autenticação de Usuário:
Ao acessar a aplicação pela primeira vez, o usuário é direcionado para o processo de cadastro, onde ele pode criar uma conta utilizando um e-mail e senha.

Após o cadastro, o usuário pode fazer login utilizando suas credenciais previamente cadastradas.

### Gerenciamento de Notas:
Após o login, o usuário é redirecionado para a área de notas, onde pode visualizar todas as notas previamente criadas e criar novas.

As notas podem ser criadas utilizando texto convencional ou utilizando o recurso de voz do SpeechRecognition, proporcionando uma experiência de uso mais versátil e eficiente.

### Notificações:
A aplicação utiliza a biblioteca Sonner para enviar notificações aos usuários sobre eventos importantes, como novas notas criadas ou atualizações relevantes.

### Perfil e Upload de foto do perfil:
O usuário poderá ver no canto superior direito, um card com as informações preenchidas no cadastro, e também fazer upload de uma foto para o sistema.

## Rodar o Projeto:

Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial: Node.js.
Tenha o gerenciador de pacotes npm ou Yarn instalado em seu sistema.

Para rodar o projeto NLW-Notes em React com Vite, siga os passos abaixo:

Pré-requisitos
Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo e instalá-lo a partir do site oficial: Node.js.
Tenha o gerenciador de pacotes npm ou Yarn instalado em seu sistema.

### Instalação
Clone o repositório do projeto do NLW-Notes do GitHub:
`git clone https://github.com/ThomazHilario/Notes.git)https://github.com/ThomazHilario/Notes.git`

### Navegue até o diretório do projeto:
`cd nlw-notes`

### Instale as dependências do projeto utilizando npm ou Yarn:
`npm install`
      ou
`yarn` 

### Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:
`npm run dev`
     ou
`yarn dev`
