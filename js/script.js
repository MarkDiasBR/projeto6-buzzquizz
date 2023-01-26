/* BOTOES TELA DE NOVO QUIZZ */

function toggleVisualisarPerguntas(ionicon) {
    //Buscar o container-pai
    console.log(ionicon.parentNode);
    //Mudar a classe do container adicionando a classe .esconde
    ionicon.parentNode.classList.toggle("esconde");
}

function prosseguirPraCriarNovoQuizz() {
    //Buscar o main
    const main = document.querySelector("main");

    //remover deste a classe visível
    main.classList.remove("visivel");

    //Buscar o container-tela2
    const containerTela2 = document.querySelector(".container-tela2");

    //adicionar ao container-tela2 a classe visível
    containerTela2.classList.add("visivel");
}

function prosseguirPraCriarPerguntas() {
    //Buscar o container-tela2
    const containerTela2 = document.querySelector(".container-tela2");

    //remover deste a classe visivel
    containerTela2.classList.remove("visivel");

    //Buscar o container-tela3
    const containerTela3 = document.querySelector(".container-tela3");

    //adicionar ao container-tela3 a classe visível
    containerTela3.classList.add("visivel");

    //adicionar as perguntas com base na quantidade de perguntas na pagina anterior
    let perguntasHTML = `
    <p class="titulo-tela3">Crie suas perguntas</p>
    <div class="container-tela3-a pergunta">
        <ion-icon name="create-outline" onclick="toggleVisualisarPerguntas(this)"></ion-icon>
        <p class="titulo-pergunta contexto-pergunta">Pergunta <span class="numero-pergunta">1</span></p>
        <input type="text" name="title" id="" placeholder="Texto da pergunta">
        <input type="color" name="color" id="" placeholder="Cor de fundo da pergunta">
        <p class="titulo-pergunta">Resposta correta</p>
        <input type="text" name="text" id="" placeholder="Resposta correta">
        <input type="url" name="image" id="" placeholder="URL da imagem">
        <p class="titulo-pergunta">Respostas incorretas</p>
        <input type="text" name="text" id="" placeholder="Resposta incorreta 1">
        <input type="url" name="image" id="" placeholder="URL da imagem 1">
        <input type="text" name="text" id="" placeholder="Resposta incorreta 2">
        <input type="url" name="image" id="" placeholder="URL da imagem 2">
        <input type="text" name="text" id="" placeholder="Resposta incorreta 3">
        <input type="url" name="image" id="" placeholder="URL da imagem 3">
    </div>
    `;
    
    for (let i = 2; i <= document.querySelector("#numero-de-perguntas").value; i++) {
        perguntasHTML += `
    <div class="container-tela3-a pergunta esconde">
        <ion-icon name="create-outline" onclick="toggleVisualisarPerguntas(this)"></ion-icon>
        <p class="titulo-pergunta contexto-pergunta">Pergunta <span class="numero-pergunta">${i}</span></p>
        <input type="text" name="title" id="" placeholder="Texto da pergunta">
        <input type="color" name="color" id="" placeholder="Cor de fundo da pergunta">
        <p class="titulo-pergunta">Resposta correta</p>
        <input type="text" name="text" id="" placeholder="Resposta correta">
        <input type="url" name="image" id="" placeholder="URL da imagem">
        <p class="titulo-pergunta">Respostas incorretas</p>
        <input type="text" name="text" id="" placeholder="Resposta incorreta 1">
        <input type="url" name="image" id="" placeholder="URL da imagem 1">
        <input type="text" name="text" id="" placeholder="Resposta incorreta 2">
        <input type="url" name="image" id="" placeholder="URL da imagem 2">
        <input type="text" name="text" id="" placeholder="Resposta incorreta 3">
        <input type="url" name="image" id="" placeholder="URL da imagem 3">
    </div>        
    `;
    }

    perguntasHTML += `
    <button type="submit" id="button-tela3" onclick="prosseguirPraCriarNiveis()">
        Prosseguir pra criar níveis
    </button>
    `;

    containerTela3.innerHTML = perguntasHTML;
}

function prosseguirPraCriarNiveis() {
    //Buscar o container-tela3
    const containerTela3 = document.querySelector(".container-tela3");
    //remover deste a classe visivel
    containerTela3.classList.remove("visivel");
    //Buscar o container-tela4
    const containerTela4 = document.querySelector(".container-tela4");
    //adicionar ao container-tela4 a classe visível
    containerTela4.classList.add("visivel");
}










const formNovoQuiz = document.querySelector("#form-novo-quiz");

formNovoQuiz.addEventListener("submit", function(evento) {
    submitForm(evento, this);
});

function construirDadosFormJSON(form) {
    const dadosFormJSON = {};

    for (const par of new FormData(form)) {
        dadosFormJSON[par[0]] = par[1];
    }

    return dadosFormJSON;
}

/*
function construirHeaders() {
    
}
*/

function submitForm(evento, form) {
    //Não permitir a página ser recarregada
    evento.preventDefault();

    //dar Submit no Form
    //Interação do usuário
    const botaoSubmit = document.querySelector("#button-submit-tela2");
    botaoSubmit.disabled = true;
    setTimeout(() => botaoSubmit.disabled = false, 2000);

    //Construir corpo JSON
    const dadosFormJSON = construirDadosFormJSON(form);

    console.log("dadosFormJSON");
    console.log(dadosFormJSON);

    const dataform = new FormData(form);

    console.log("dataform");
    console.log(dataform);
    alert("pause");

    /*
    //construir headers
    const headers = construirHeaders();
    */

    //post AXIOS

};