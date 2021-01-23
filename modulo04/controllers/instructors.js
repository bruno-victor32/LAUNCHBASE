const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils') // pegando o função que calcula a idade, é um objeto que estamos exportando então precisa ficar entre "{}", pois estamos desistruturando um objeto

exports.index = function(req, res) {
    return res. render("instructors/index", { instructors: data.instructors })
}

exports.create = function(req, res) {
    return res.render('instructors/create')
}

// CREATE
exports.post = function(req, res) {

    //Estrutura de validação de antes de enviar os dados para o banco de dados
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res. send("Write file error!")

        return res.redirect("/instructors")
    })

    //return res.send(req.body)
}
//Final da estrutura de validação

// SHOW
exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")
    


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),// split = tranforma uma string em um array, eu só preciso falar para ele aonde eu quero quebrar a string, no caso vai quebrar quando achar uma vírgula
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),// Intl é um constructor que podemos passar como método o DateTimeFormat('pt-BR').format(found...) ele irá formatar a data do create_at de acordo com o pt-br;
    }

    return res.render("instructors/show", { instructor })
}

// EDIT
exports.edit = function(req, res){
     //req.params
     const { id } = req.params

     const foundInstructor = data.instructors.find(function(instructor){
         return instructor.id == id
     })
 
     if (!foundInstructor) return res.send("Instructor not found!")
   
     const instructor = {
         ...foundInstructor,
         birth: date(foundInstructor.birth).iso
     }
   
    return res.render('instructors/edit',{instructor})
}

// PUT
exports.put = function(req, res) {
    //req.params
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundindex){
        if(id == instructor.id) {
            index = foundindex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instructor not found")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) 
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect(`/instructors/${id}`)
    })
}

// DELETE
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })
    data.instructors = filteredInstructors
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}