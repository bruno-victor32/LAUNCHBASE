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

const server = express() /*Agora vou criar um servidor, e o server ele vai executar o express que agora virou uma função  que eu chamei para dentro do servidor*/

const videos = require("./data")/*Para chamar um arquivo que está na pasta raiz do projeto,que não está no node_modules e que não foi instalado pelo node pelo npm eu coloco um ponto e barra e o nome do arquivo sem precisar colocar o ponto js*/

server.use(express.static('public'))

/*Configurando a template engine ↓ */
server.set("view engine","njk")
/*server.set("view engine","html")*//*Estou setando qualquer view engine que por enquanto vou usar tudo que for html*/

nunjucks.configure("views",{/*vou pedir para o nunjucks configurar na pasta views e vou usar o express e a variavel que eu vou usar no express e o server*/
    express:server,
    autoescape:false,
    noCache:true
})

server.get("/",function(req, res){/*A "/" e sempre a rota principal,si eu não colocar a barra no final do http://localhost:5000 ele sempre vai procurar a barra*/
/*Get e uma função que tem o primeiro parametro sendo a "/" e o segundo parametro e uma função que no caso, quando der certo o "get" eu posso colocar req e res que significa request(req) ou seja uma requisição o servidor ouvir alguma coisa.O res(response) que vai ter resposta do servidor*/
/*Servidor pegue essa barra e execute essa função,si o usuario enviar alguma coisa vai está dentro do  "req"  e você responde alguma coisa para o usuario que no caso vai ser um oi*/

const about ={
    avatar_url:"https://avatars2.githubusercontent.com/u/62918478?s=460&u=e9fa67692817bbee158b6c83f3e786fcf75c99a3&v=4",
    name:"Bruno Victor",
    role:"Estudante de Engenharia da computação",/*Função*/
    description:' Estudante focado em desevolver habilidades em programação.Estudante da Universidade<a href="https://www.esamc.br/unidade/Santos/" target="_blank">Esamc Santos</a>',
    links:[
        {name:"Github",url:"https://github.com/bruno-victor32"},
        {name:"Twitter",url:"https://twitter.com/explore" },
        {name:"Linkedin",url:"https://www.linkedin.com/in/bruno-victor-7058b899/"}
    ]
}
    /*return res.send("Hi")*//*send e uma função do objeto res*/

    return res.render("about",{about})
})

server.get("/portfolio",function(req,res){/*Rota*/
    return res.render("portfolio",{items:videos})
})

server.get("/video", function(req, res){
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id/*Forma simplificada*/

        /*if(video.id == id){
            return true
        }*/
    })

    if (!video) {
        return res.send("video not found!")
    }

    return res.render("video",{ item: video })
})

server.listen(5000,function(){/*O servidor vai ficar ouvindo uma porta,que será a 5000.Callback geralmente e uma função que passa dentro de outra função então o primeiro parametro e um número e o segundo parametro e uma função*/
    console.log("server is running")/*Essa função vai ser executada assim que for chamado a porta 5000*/
})