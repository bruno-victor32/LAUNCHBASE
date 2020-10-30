/*Primeiro Passo,instalar o *npm init -y*/
/*Segundo Passo,instalar o npm install express*/
/*Para iniciar o servidor, npm start*/
/*Para cancelar o servido ^c*/
/*Dependencia para reiniciar o servidor npm install  -D  nodemon*/
/*Instalar o nunjucks npm install nunjucks que e uma template engine ou seja podemos associar com um motor que trabalha com templates.A ideia de ter um template engine e que podemos fazer reuso de codigo,podemos usar algumas logicas para poder apresentar  uma pagina ou outra*/

/*NPM - gerenciador de pacotes,ele busca na nuvem repositorios,dependências e programas que outras pessoas já fizeram para dentro do nosso trabalho*/
/*-----------------------------------------------*/
/*npm init -y ,o menos y serve para ele não fazer pergunta.O npm init -y  vai criar um arquivo package.json*/
/*--------------------------------------------------*/
/*package.json ou sejá o .json e um arquivo de notação de objetos javascript,ele tem uma semelhança do objeto Javascript*/

/*npm install express e um programa uma serie de arquivos e possibilita a gente fazer o nosso servidor então ele e um servidor bem simples*/

/*A dependencia Nodemon vai ficar reiniciando o servidor toda hora*/

/*Colocamos o nome da página de views porque vai ser a parte de visualização do nosso site*/

/*Iniciando o Servidor*/
/*--------------------------------------------------*/
const express = require('express')/*Quando coloco require ele e uma opção do javascript para poder chamar o express para dentro da variavel express.Obs:coloquei o nome da variavel também de express*/

const nunjucks = require('nunjucks')/*Para chamar o nunjucks*/

const routes = require("./routes")

const server = express() /*Agora vou criar um servidor, e o server ele vai executar o express que agora virou uma função  que eu chamei para dentro do servidor*/


server.use(express.urlencoded({ extended: true}))/*Essa linha vai ser responsavel por fazer funcionar meu "req.body"*/
server.use(express.static('public'))

server.use(routes)/*"Use" e um chamado middlewares ou seja ele está configurando as coisas para a gente.Middleware vai interceptar o ponto "A" que e a criação do servidor ao ponto "B" que e a indicação da porta,colocando alguma coisa no meio do caminho geralmente:função,configuração*/

/*Configurando a template engine ↓ */
server.set("view engine","njk")
/*server.set("view engine","html")*//*Estou setando qualquer view engine que por enquanto vou usar tudo que for html*/

nunjucks.configure("views",{/*vou pedir para o nunjucks configurar na pasta views e vou usar o express e a variavel que eu vou usar no express e o server*/
    express:server,
    autoescape:false,
    noCache:true
})



server.listen(5000,function(){/*O servidor vai ficar ouvindo uma porta,que será a 5000.Callback geralmente e uma função que passa dentro de outra função então o primeiro parametro e um número e o segundo parametro e uma função*/
    console.log("server is running")/*Essa função vai ser executada assim que for chamado a porta 5000*/
})