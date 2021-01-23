const fs = require('fs')
const data = require("../data.json")
const { date } = require('../utils') // pegando o função que calcula a idade, é um objeto que estamos exportando então precisa ficar entre "{}", pois estamos desistruturando um objeto

exports.index = function(req, res) {
    return res. render("members/index", { members: data.members })
}


exports.create = function(req, res) {
    return res.render('members/create')
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


    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if ( lastMember ) {
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res. send("Write file error!")

        return res.redirect("/members")
    })

    //return res.send(req.body)
}
//Final da estrutura de validação

// SHOW
exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")
    


    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member })
}

// EDIT
exports.edit = function(req, res){
     //req.params
     const { id } = req.params

     const foundMember = data.members.find(function(member){
         return member.id == id
     })
 
     if (!foundMember) return res.send("Member not found!")
   
     const member = {
         ...foundMember,
         birth: date(foundMember.birth).iso
     }
   
    return res.render('members/edit',{member})
}

// PUT
exports.put = function(req, res) {
    //req.params
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundindex){
        if(id == member.id) {
            index = foundindex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) 
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })
}

// DELETE
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })
    data.members = filteredMembers
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })
}