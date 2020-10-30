
const express = require('express')/*Quando coloco require ele e uma opção do javascript para poder chamar o express para dentro da variavel express.Obs:coloquei o nome da variavel também de express*/

const nunjucks = require('nunjucks')/*Para chamar o nunjucks*/

const routes = require("./routes")

const server = express() /*Agora vou criar um servidor, e o server ele vai executar o express que agora virou uma função  que eu chamei para dentro do servidor*/

server.use(express.static('public'))
server.use(routes)/*Use e um chamado middleware*/
/*Middleware e o que vai interceptar o ponto A ao ponto B,colocando alguma coisa no meio do caminho,geralmente
uma função ou configuração*/

/*Configurando a template engine ↓ */
server.set("view engine","njk")
/*server.set("view engine","html")*//*Estou setando qualquer view engine que por enquanto vou usar tudo que for html*/

nunjucks.configure("views", {/*vou pedir para o nunjucks configurar na pasta views e vou usar o express e a variavel que eu vou usar no express e o server*/
    express:server,
    autoescape:false,
    noCache:true
})



server.listen(5000,function() {/*O servidor vai ficar ouvindo uma porta,que será a 5000.Callback geralmente e uma função que passa dentro de outra função então o primeiro parametro e um número e o segundo parametro e uma função*/
    console.log("server is running")/*Essa função vai ser executada assim que for chamado a porta 5000*/
})