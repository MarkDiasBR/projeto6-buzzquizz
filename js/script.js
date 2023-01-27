// ###################################### TELA 1 - LISTA DE QUIZZES #############################################

listarQuizzes();

function listarQuizzes(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(exibirQuizzes);
    promessa.catch(() => {console.log("Erro ao receber lista de quizzes")});
}

function exibirQuizzes(resposta){
    const listaQuizzes = resposta.data;

    // Se o id for do usuário exibe na lista de quizzes do usuário
    const idUsuario = localStorage.getItem("idLocal");

    for (let i=0; i < listaQuizzes.length; i++){
        if (listaQuizzes[i].id === idUsuario){
            // Exibir o quiz na lista de quizzes do usuário
            ExibirQuizLocal(listaQuizzes[i]);
        }
        else {
            // Exibir o quiz na lista geral de quizzes
            ExibirQuiz(listaQuizzes[i], i);
        }   
    }
}

function ExibirQuiz(quiz, posicao){
    const containerQuizzes = document.querySelector(".container-conteudo-todos-os-quizzes");
    const novoQuiz = `<div id="quiz-${posicao}" class="quiz quiz-todos-os-quizzes">
                        <p>${quiz.title}</p>
                        <div class="botoes-laterais-quiz">
                            <ion-icon name="create-outline"></ion-icon>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                      </div>`;
    containerQuizzes.innerHTML += novoQuiz; 
    document.querySelector(`#quiz-${posicao}`).style.background =  `url(${quiz.image})`;   
}

// ##############################################################################################################




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
    
    //atribui ao HTML as perguntas criadas no JS
    containerTela3.innerHTML = perguntasHTML;
}

function toggleVisualisarNiveis(ionicon) {
    //Buscar o container-pai
    console.log(ionicon.parentNode);
    //Mudar a classe do container adicionando a classe .esconde
    ionicon.parentNode.classList.toggle("esconde");
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

    //adicionar os niveis com base na quantidade de niveis na pagina anterior
    let niveisHTML = `
    <p class="titulo-tela4">Agora, decida os níveis!</p>
    <div class="container-tela4-a">
        <ion-icon name="create-outline" onclick="toggleVisualisarNiveis(this)"></ion-icon>
        <p class="titulo-nivel contexto-nivel">Nível <span class="numero-nivel">1</span></p>
        <input type="text" name="title" id="" placeholder="Título do nível">
        <input type="number" name="&&&&&" id="" placeholder="% de acerto mínima">
        <input type="url" name="image" id="" placeholder="URL da imagem do nível">
        <textarea name="&&&&&" id="" form="form-novo-quiz"></textarea>
    </div>
    `;
    
    for (let i = 2; i <= document.querySelector("#quantidade-de-niveis").value; i++) {
        niveisHTML += `
    <div class="container-tela4-a esconde">
        <ion-icon name="create-outline" onclick="toggleVisualisarNiveis(this)"></ion-icon>
        <p class="titulo-nivel contexto-nivel">Nível <span class="numero-nivel">${i}</span></p>
        <input type="text" name="title" id="" placeholder="Título do nível">
        <input type="number" name="&&&&&" id="" placeholder="% de acerto mínima">
        <input type="url" name="image" id="" placeholder="URL da imagem do nível">
        <textarea name="&&&&&" id="" form="form-novo-quiz"></textarea>
    </div> 
    `;
    }

    niveisHTML += `
    <button type="submit" id="button-tela4" onclick="finalizarQuizz()">
        Finalizar Quizz
    </button>
    `;
    
    //atribui ao HTML as perguntas criadas no JS
    containerTela4.innerHTML = niveisHTML;
}

function finalizarQuizz() {
    //Buscar o container-tela4
    const containerTela4 = document.querySelector(".container-tela4");

    //remover deste a classe visivel
    containerTela4.classList.remove("visivel");

    //Buscar o container-tela5
    const containerTela5 = document.querySelector(".container-tela5");

    //adicionar ao container-tela5 a classe visível
    containerTela5.classList.add("visivel");
}


function voltarPraHome() {
    //Buscar o container-tela5
    const containerTela5 = document.querySelector(".container-tela5");

    //remover deste a classe visivel
    containerTela5.classList.remove("visivel");

    //Buscar o main
    const main = document.querySelector("main");

    //adicionar deste a classe visível
    main.classList.add("visivel");
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


/* --------------------------------------------- T E M P O R A R I O ---------------------------------- */

document.querySelector('main').classList.remove("visivel");
