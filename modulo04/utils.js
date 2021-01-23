module.exports = {
    age: function(timestamp) {
        const today = new Date()// Criando um objeto de data
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()// ano de hoje - ano do aniversário = idade (let pois essa idade pode alterar)
        const month = today.getMonth() - birthDate.getMonth()// mês do ano - mês do aniversário
    
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) { // se o mês for menor ou igual a 0 e o dia de hoje for menor que o dia do seu aniversário...
            age = age - 1 // vai tirar -1 ano da idade pois quer dizer que ainda não fez aniversário
            }
    
        return age
    },
    date: function(timestamp) {

        const date = new Date(timestamp)

         // quando colocamos sem UTC ele pega a data local, quando colocamos o UTC ele transforma para data global
        // yyyy
        const year = date.getUTCFullYear()

        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // a propridade slice nesse caso está pegando sempre os dois últimos digitos

        // dd
        const day = `0${date.getUTCDate()}`.slice(-2) 

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`, //ESSE RETORNO E DO TIPO ISO
            birthDay: `${day}/${month}`
        }
    }
}
