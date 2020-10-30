/*Aqui estamos exportando arquivos,podendo ser um objeto,array,variavel,function
module.exports ={}*/

const fs = require('fs')/*Um modulo do node,que vai trabalhar com arquivos do sistema*/
const data = require("./data.json")
/*Create*/
exports.post = function (req, res) {
    /*req.query*/
    /*Vamos usar agora o "req.body" porque estamo colocando isso como um corpo da requisição post*/

    /*if( req.body.name !=""){*//*quero validar si meu name não está vazio,si ele for diferente de vazio ele pode mostrar só o nome*/
    /* return res.send(req.body.name)
 }*/

    //req.body ele retornou isso
    //{"avatar_url":"https://www.techtudo.com.br/noticias/2020/08/dell-g3-vs-lenovo-ideapad-gaming-3i-saiba-qual-notebook-gamer-e-melhor.ghtml","name":"Bruno Victor da Silva Vicente","birth":"2020-08-06","gender":"on","services":"kkkkkkkkkkk"}


    //["avatar_url","name","birth","gender","services"]
    /*Aqui eu fiz que todos os cantos são obrigatorios*/
    const keys = Object.keys(req.body)//Aqui eu estou usando uma constructor chamando "Object".O constructor e uma função que vai criar um objeto para mim,e ele sendo um objeto nesse caso eu tenho varias funcionalidades para aplicar em objetos.Uma delas que vou usar aqui e o Object keys

    for(key of keys) {
        //Essa linha de baixo e a mesma coisa de eu fazer "req.body.avatar_url"
        if (req.body[key] == ""){ 
        return res.send('Por favor,preencha todos os campos')//Estou verificando para cada uma das chaves que eu tenho no meu req.body si alguma chave está vazio,si alguma chave estiver vazio envia essa mensagem
        }
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now() /*Date.now e um metodo que vai criar uma data de agora,do momento que está sendo salvo.Ele vai criar uma data no formato númerica,um número que vai valer de milisegundos */
    req.body.id = Number(data.instructors.length + 1)

    /*Tenho um array[] e ele está vazio*/
    data.instructors.push(req.body)/*Quando ele rodar o push ele vai voltar como um array nesse caso como um objeto[{...}] ai eu vou salvar novamente.Da proxima vez o data.instructors já vai ter um ali.A segunda vez que eu adicionar um req.body ele vai adicionar mais uma entrada*/ 

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){//Uma callback function ela vai ter 2 caracteristicas,uma delas e executar depois de um certo tempo e a segunda e uma função que passo dentro de uma função
        if(err) return res.send("Erro de escrita")

        return res.redirect("/instructors")
    })

   //return res.send(req.body)
}


/*Update*/


/*delete*/