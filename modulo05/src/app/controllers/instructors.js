
const { age, date } = require('../../lib/utils') // pegando o função que calcula a idade, é um objeto que estamos exportando então precisa ficar entre "{}", pois estamos desistruturando um objeto

module.exports = {
    index(req, res) {

        return res. render("instructors/index")

    },
    create(req, res) {

        return res.render('instructors/create')

    },
    post(req, res) {

            //Estrutura de validação de antes de enviar os dados para o banco de dados
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        let {avatar_url, birth, name, services, gender} = req.body

        return

    },
    show(req, res) {

        return

    },
    edit(req, res) {

        return
    },
    put(req, res) {

        //Estrutura de validação de antes de enviar os dados para o banco de dados
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        return
    },
    delete(req, res) {
        return
    },
}
