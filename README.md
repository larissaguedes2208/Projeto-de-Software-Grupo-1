# PlayMatch

O PlayMatch é um projeto desenvolvido para facilitar a organização de partidas esportivas casuais. A ideia surgiu a partir de um problema comum: muitas vezes as pessoas querem jogar, mas acabam dependendo de grupos de mensagem, combinações desorganizadas ou da disponibilidade de amigos.

Com o sistema, o usuário pode visualizar partidas, buscar jogos disponíveis, criar novas partidas e acompanhar informações como esporte, local, data, horário, número de jogadores e status.

## Objetivo do projeto

O objetivo do PlayMatch é tornar mais simples o processo de encontrar e organizar partidas esportivas. Em vez de depender apenas de grupos de WhatsApp ou de uma equipe já formada, a proposta é centralizar essas informações em uma aplicação.

Assim, o usuário consegue ter uma visão mais clara das partidas disponíveis e também pode criar uma partida informando os dados principais do jogo.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

* Python
* Django
* HTML
* CSS
* SQLite

## Funcionalidades desenvolvidas

Até o momento, foram desenvolvidas algumas telas e funcionalidades básicas do sistema, como:

* Listagem de partidas
* Busca de partidas
* Criação de partidas
* Edição de partidas
* Exclusão de partidas
* Tela de edição de usuário
* Tela de remoção de usuário
* Tela de confirmação de participação
* Navegação entre páginas

## Sprint 7

Na Sprint 7, o foco foi avançar na parte funcional do projeto, principalmente com a implementação de um CRUD básico de partidas.

CRUD significa:

* Criar uma partida
* Listar partidas cadastradas
* Editar informações de uma partida
* Excluir uma partida

Com isso, o projeto deixa de ser apenas um conjunto de telas estáticas e começa a trabalhar com dados cadastrados no banco de dados.

## Estrutura do projeto

A estrutura principal do projeto está organizada da seguinte forma:

```txt
RemocaoUsuario/
├── requirements.txt
├── README.md
├── ProjetoRemocao/
│   ├── manage.py
│   ├── ProjetoRemocao/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── usuarios/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       ├── admin.py
│       └── templates/
│           └── usuarios/
│               ├── listar_partidas.html
│               ├── criar_partida.html
│               ├── editar_partida.html
│               ├── excluir_partida.html
│               ├── buscar_partidas.html
│               ├── confirmar_participacao.html
│               ├── editar_usuario.html
│               └── remover_usuario.html
```

## Como executar o projeto

Entre na pasta do projeto:

```bash
cd RemocaoUsuario
```

Ative o ambiente virtual:

```bash
source venv/bin/activate
```

Entre na pasta onde está o arquivo `manage.py`:

```bash
cd ProjetoRemocao
```

Execute as migrações do banco de dados:

```bash
python manage.py makemigrations
python manage.py migrate
```

Inicie o servidor:

```bash
python manage.py runserver 0.0.0.0:8000
```

Depois disso, basta abrir o endereço gerado pelo Codespaces ou pelo terminal no navegador.

## Principais rotas

Algumas das rotas utilizadas no projeto são:

```txt
/usuarios/listar-partidas/
/usuarios/criar-partida/
/usuarios/buscar-partidas/
/usuarios/editar-partida/<id>/
/usuarios/excluir-partida/<id>/
/usuarios/confirmar-participacao/
/usuarios/editar-usuario/
/usuarios/remover-usuario/
```

## Model principal

O principal model utilizado nesta etapa é o model `Partida`, que representa uma partida esportiva cadastrada no sistema.

Ele possui informações como:

* esporte
* local
* cidade
* data
* horário
* número de jogadores
* status

## Próximos passos

O projeto ainda está em desenvolvimento. Algumas melhorias que podem ser feitas nas próximas etapas são:

* Implementar login e autenticação de usuários
* Criar cadastro de usuário
* Melhorar a confirmação de participação nas partidas
* Relacionar usuários reais às partidas
* Melhorar o visual das telas
* Adicionar validações nos formulários
* Organizar melhor permissões e acessos

## Integrantes

* Clarissa
* Eric Quintela
* Larissa Guedes
* Miguel Zarour

## Observação

Este projeto foi desenvolvido como parte da disciplina de Projeto de Software ENG-4021. A aplicação ainda está em construção, mas já possui telas, rotas, navegação e uma estrutura inicial de CRUD utilizando Django.
