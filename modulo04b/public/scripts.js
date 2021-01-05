const modalOverlay = document.querySelector('.modal-overlay') //document e um elemento da DOM.A DOM e a modelagem de objetos que temos no html.Para o javascript a DOM,cada tag html e um objeto.O que querySelector ele vai selecionar um objeto baseado no seletor CSS que a gente tem,que e o model-overlay pois e a classe que agente tem.Então esse querySelector ele vai selecionar qualquer elemento baseado em classe,id ou baseado no próprio nome da tag por exemplo body.
//Enfim dessa maneira meu document está procurando dentro dele através do querySelector está procurando o modal-overlay quando ele acha ele vai pegar e adicionar na variavel modalOverlay

const cards = document.querySelectorAll('.card')//all significa que eu vou pegar uma coleção de valores iguais que no caso são os card,que no caso eu tenho 6 card ou seja seis thumb,ou sejá vai pegar todos os elementos com a classe card

for (let card of cards) {//Para cada cartão de cartões

    card.addEventListener("click", function () {//addEventListener e uma função que vai receber de parametros o primeiro parametro e o segundo parametro vai ser também  uma função ou addEventListener e um ouvidor de eventos,ele vai ouvir diversos eventos como por exemplo: o click,o mouse mexendo,de digitação enfim todo tipo de evento que aconteçe na página.Agora queremos o click.Nesse elemento card ele vai ouvir uma click,quando ele perceber que foi clicado ele vai executar uma ação que e a function.A ação que e eu quero e simples quero que o modalOverlay pegue o elemento e adicione a classe active
        const videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`
       // modalOverlay.classList.add('active')//na lista de classes eu vou adicionar então o classList ele também sendo um objeto nois podemos colocar uma função que e adicionar e o nome da classe active
       // modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}`
    })
}

//document.querySelector(".close-modal").addEventListener("click", function () {//ele vai achar o close-modal e vai adicionar um ouvidor de eventos e vai ouvir um click então quando eu clicar naquele x que e o close-modal ele vai executar uma function 
   // modalOverlay.classList.remove("active")
    //ou seja esse classList ele vai pegar todos elementos que tiver de classe,mas no caso ele vai pegar uma classe especifica que e a clase active
    //modalOverlay.querySelector("iframe").src = ""
//})

