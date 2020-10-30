const express = require('express')

const nunjucks = require('nunjucks')


const routes = express.Router() /*Constante routes que usa o express.E o express serve para a gente um metodo chamado Router e ele e capaz de fazer uma variavel routes sejá responsavel pelas rotas*/

const instructors = require('./instructors')

routes.get('/', function (req, res) {/*Seria  a pagina inicial*/
    return res.redirect("/instructors")/*"REDIRECT" vai redirecionar para instructor*/
})

routes.get('/instructors',function (req, res) {/*Seria  a pagina inicial*/
    return res.render("instructors/index")
})

routes.get('/instructors/create', function (req, res) {
    return res.render("instructors/create")
})

routes.post('/instructors',instructors.post )



routes.get('/members', function (req, res) {/*Seria  a pagina inicial*/
    return res.send("members")
})

module.exports = routes/*Para exportar*/