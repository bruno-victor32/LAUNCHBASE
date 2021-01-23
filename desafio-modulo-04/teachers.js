
const fs = require('fs')
const data = require("./data.json")
const { age, graduation, date } = require('./utils') // pegando o função que calcula a idade, é um objeto que estamos exportando então precisa ficar entre "{}", pois estamos desistruturando um objeto



// show
exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")
    


    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),// split = tranforma uma string em um array, eu só preciso falar para ele aonde eu quero quebrar a string, no caso vai quebrar quando achar uma vírgula
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
        select: graduation(foundTeacher.select)// Intl é um constructor que podemos passar como método o DateTimeFormat('pt-BR').format(found...) ele irá formatar a data do create_at de acordo com o pt-br;
    }

    return res.render("teachers/show", { teacher })
}

// create
exports.post = function(req, res) {

    //Estrutura de validação de antes de enviar os dados para o banco de dados
    const keys = Object.keys(req.body)

    for( key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    let {avatar_url, birth, name, subjects, classe, school,select} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)


    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        subjects,
        classe,
        school,
        select,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res. send("Write file error!")

        return res.redirect("/teachers")
    })

    //return res.send(req.body)
}
//Final da estrutura de validação

// edit
exports.edit = function(req, res){
     //req.params
     const { id } = req.params

     const foundTeacher = data.teachers.find(function(teacher){
         return teacher.id == id
     })
 
     if (!foundTeacher) return res.send("Teacher not found!")
   
     const teacher = {
         ...foundTeacher,
         birth: date(foundTeacher.birth)
     }
   
    return res.render('teachers/edit',{teacher})
}
