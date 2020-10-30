/*Inicio da configuração de rotas*/

const express = require('express')
const routes = express.Router()/*Criando uma variavel que usa o express,e o express serve para a gente um metodo router que e capaz de essa variavel seja responsavel pelas rotas*/

/*Criando as rotas*/
routes.get('/',function(req, res){
    return res.redirect("/teachers")
})

/*Criando as rotas*/
routes.get('/teachers', function(req,res){
    return res.render("teachers/index")
})

/*Criando as rotas*/
routes.get('/students',function(req,res){
    return res.send("students")
})

module.exports = routes