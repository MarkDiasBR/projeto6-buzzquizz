// ###################################### TELA 1 - LISTA DE QUIZZES #############################################

listarQuizzes();

function listarQuizzes(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(exibirQuizzes);
    promessa.catch(() => {console.log("Erro ao receber lista de quizzes")});
}

function exibirQuizzes(resposta){

    // Ao atualizar a página inicial (tela 1 - Lista de Quizzes) ela volta para o topo
    document.querySelector("#topo").scrollIntoView();

    const listaQuizzes = resposta.data;
    // Se o id for do usuário exibe na lista de quizzes do usuário
    // const listaQuizzesUsuario = JSON.parse(localStorage.getItem("listaQuizzesUsuario"));
    const listaQuizzesUsuario = [{ id: 18835, key: 20 }, { id: 18841, key: 30 }];

    for (let i=0; i < listaQuizzes.length; i++){
        // console.log(listaQuizzes[i]);
        if (listaQuizzesUsuario.find(elemento => elemento.id === listaQuizzes[i].id) !== undefined){
            // Exibir o quiz na lista de quizzes do usuário
            ExibirQuiz(listaQuizzes[i], i, "container-conteudo-seus-quizzes", "quiz-seus-quizzes");
        }
        else {
            // Exibir o quiz na lista geral de quizzes
            ExibirQuiz(listaQuizzes[i], i, "container-conteudo-todos-os-quizzes", "quiz-todos-os-quizzes");
        }   
    }
}

function ExibirQuiz(quiz, posicao,container, tipo){
    const containerQuizzes = document.querySelector(`.${container}`);
    const novoQuiz = `<div id="quiz-${posicao}" class="quiz ${tipo}" onclick="BuscarQuiz(${quiz.id});">
                        <p>${quiz.title}</p>
                        <div class="botoes-laterais-quiz">
                            <ion-icon name="create-outline" onclick="EditarQuiz(${quiz.id});"></ion-icon>
                            <ion-icon name="trash-outline" onclick="ApagarQuiz(${quiz.id});"></ion-icon>
                        </div>
                      </div>`;
    containerQuizzes.innerHTML += novoQuiz;    
    document.querySelector(`#quiz-${posicao}`).style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url(${quiz.image})`;
    document.querySelector(`#quiz-${posicao}`).style.backgroundSize = "cover";
    document.querySelector(`#quiz-${posicao}`).style.backgroundColor = quiz.questions[0].color;

    if (tipo === "quiz-seus-quizzes"){
        document.querySelector(".container-criar-quizz").id = "desativado";
        document.querySelector(".container-titulo-seus-quizzes").id = "ativado"
    }
}


// ###################################### TELA 2 - PÁGINA DE UM QUIZ #############################################

/*
function BuscarQuiz(id){

    // Obter o quiz
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/' + id.toString());
    promessa.then(MostrarTelaQuiz);
    promessa.catch(() => {console.log("Erro ao receber o quiz")});
}

function MostrarTelaQuiz (resposta){

    const quiz = resposta.data;
    // Fechar a tela 1 - Lista de quizzes
    // Abrir a tela 2 - Página de um quiz
    // ... 
}*/




// ###################################### TELA 3.4 - SUCESSO NA CRIAÇÃO DO QUIZ ############################################
 
/* 
// objetoQuiz recebe o objeto novo quiz validado e já no formato pedido 
function ArmazenarNovoQuiz (objetoQuiz){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetoQuiz);
    promessa.then(SalvarDadosNovoQuiz);
    promessa.catch(() => {console.log("Erro ao armazenar o novo quiz")});
}


function SalvarDadosNovoQuiz(resposta){
    const quiz = resposta.data;
    const listaQuizzesUsuario = [];
    const stringListaQuizzesUsuario = "";
    const informacoesNovoQuiz = { 
                                    id: quiz.id,
                                    key: quiz.key
                                }
    if (localStorage.getItem("listaQuizzesUsuario") !== null){
        stringListaQuizzesUsuario = localStorage.getItem("listaQuizzesUsuario");
        listaQuizzesUsuario = JSON.parse(stringListaQuizzesUsuario);
    }

    listaQuizzesUsuario.push(informacoesNovoQuiz);
    stringListaQuizzesUsuario = JSON.stringify(listaQuizzesUsuario);
    localStorage.setItem("listaQuizzesUsuario", stringListaQuizzesUsuario);
}
*/



// ################################################ BÔNUS APAGAR QUIZ ######################################################
 

/*
function ApagarQuiz(idQuiz){

    const opcao = confirm("Deseja mesmo apagar o quiz?");
    const stringListaQuizzesUsuario = "";

    if (opcao === true){

        const listaQuizzesUsuario = JSON.parse(localStorage.getItem("listaQuizzesUsuario"));
        // Buscar a chave secreta do quiz (key)
        const quiz = listaQuizzesUsuario.find(elemento => elemento.id === idQuiz);

        if (quiz !== undefined){
            listaQuizzesUsuario = listaQuizzesUsuario.filter(quizUsuario => quizUsuario.id !== idQuiz);
            stringListaQuizzesUsuario = JSON.stringify(listaQuizzesUsuario);
            localStorage.setItem("listaQuizzesUsuario", stringListaQuizzesUsuario);
            // Enviar a key no cabeçalho da requisição
            const promessa = axios.delete ('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/' + idQuiz, {headers: {"Secret-Key": quiz.key}});
            promessa.then(listarQuizzes);
            promessa.catch(() => {console.log("Erro ao apagar o novo quiz")});    
        }           
    }
}
*/


// ###################################### TELA 2 - PÁGINA DE UM QUIZ #############################################
//aqui

function BuscarQuiz(id){
    // Obter o quiz
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/' + id.toString());
    promessa.then(MostrarTelaQuiz);
    promessa.catch(() => {console.log("Erro ao receber o quiz")});
}

function MostrarTelaQuiz (resposta){
    const quiz = resposta.data;
    // Fechar a tela 1 - Lista de quizzes
    document.querySelector('main').id = "desativado";
    document.querySelector('.container-tela5').id = 'desativado';

    // ######################################################################
    // Mostrar o topo da tela ao entrar no quiz
    document.querySelector("#topo").scrollIntoView();   
    // ###################################################################### 

    // Abrir a tela 2 - Página de um quiz
    const paginaQuiz = document.querySelector('.pagina-de-um-quiz');
    paginaQuiz.classList.add('visivel');
    
    // ######################################################################
    document.querySelector(".titulo-de-um-quiz").innerHTML = quiz.title;
    document.querySelector(".header-quiz").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quiz.image})`;
    document.querySelector(".header-quiz").style.backgroundSize = "cover";
    document.querySelector(".header-quiz").style.backgroundPosition = "center";
    document.querySelector(".header-quiz").style.backgroundColor = quiz.questions[0].color;
    
    let listaPerguntas = quiz.questions;

    let novaPergunta = "";
    let tituloPergunta;
    let listaRespostas;


    for (let i=0; i<listaPerguntas.length; i++){

        novaPergunta += `<div id="${quiz.id.toString()} + ${i.toString()}" class="pergunta-do-quiz">`;
        tituloPergunta = `<div id="COR${quiz.id}${i}" class="container-titulo-pergunta-do-quiz">
                             <p class="titulo-pergunta-do-quiz">${listaPerguntas[i].title}</p>
                          </div>`;
        novaPergunta += tituloPergunta;
        novaPergunta += '<div class="container-respostas-do-quiz">';

        listaRespostas = listaPerguntas[i].answers;

        listaRespostas = listaRespostas.sort(comparador);
        listaRespostas = listaRespostas.sort(comparador);
        
        for (let j=0; j<listaRespostas.length; j++){
            
            novaPergunta +=  `<div id="${quiz.id.toString()} + ${i.toString()} + ${j.toString()}"class="resposta-do-quiz" onclick="escolherOpcao(this);">
                                    <img src=${listaRespostas[j].image} alt="" srcset="">
                                    <p class="titulo-da-resposta-do-quiz">${listaRespostas[j].text}</p>
                              </div>`;
        }    
        novaPergunta += "</div> </div>";

        paginaQuiz.insertAdjacentHTML('beforeend',novaPergunta);
        document.querySelector(`#COR${quiz.id}${i}`).style.backgroundColor = listaPerguntas[i].color;
        novaPergunta = "";
    }
}

function escolherOpcao(elemento){

    let idQuiz = [];
    let posicao;
    let novaPosicao;
    let numPergunta = [];
    let numOpcao = [];

    if (elemento.parentNode.classList.contains("bloqueada")){

    }
    else {
        elemento.parentNode.classList.add("bloqueada");
    
        for (i=0; i<elemento.parentNode.childNodes.length; i++){
            elemento.parentNode.childNodes[i].classList.add("esbranquicado");
        }

        elemento.classList.remove("esbranquicado");

        for(let i=0; i<elemento.id.length; i++){
            if(elemento.id[i] === "+"){
                posicao = i;
                i=elemento.id.length;            
            }else {
                idQuiz += elemento.id[i];
            }        
        }

        for (let j=posicao+1; j<elemento.id.length; j++){
            if (elemento.id[j] === "+"){
                novaPosicao = j;
                j=elemento.id.length;
            }
            else {
                numPergunta += elemento.id[j];
            }
        }

        for (let k=novaPosicao+1; k<elemento.id.length; k++){
            if(elemento.id[k] !== undefined){
                numOpcao += elemento.id[k];
            }        
        }

        /*
        elemento = elemento.parentNode
        let elementopai = elemento.parentNode;
        let podeVerificarRespostas = false;
        let cont = 0;

        if (elementopai )

*/

        //const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/' + idQuiz);
        //promessa.then(mostraRespostas);
        //const pergunta = quiz.questions[numPergunta];
        //const opcao = quiz.questions[numPergunta].answers[numOpcao];

        //console.log(pergunta);
        //console.log(opcao);
        
    }
    
}


function comparador() { 
	return Math.random() - 0.5; 
}





// ###################################### TELA 3.4 - SUCESSO NA CRIAÇÃO DO QUIZ ############################################


// objetoQuiz recebe o objeto novo quiz validado e já no formato pedido 
function ArmazenarNovoQuiz (objetoQuiz){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetoQuiz);
    promessa.then(SalvarDadosNovoQuiz);
    promessa.catch(() => {console.log("Erro ao armazenar o novo quiz")});
}

function SalvarDadosNovoQuiz(resposta){
    const quiz = resposta.data;
    const listaQuizzesUsuario = []; document.querySelector("#topo").scrollIntoView();
    const stringListaQuizzesUsuario = "";
    const informacoesNovoQuiz = { 
                                    id: quiz.id,
                                    key: quiz.key
                                }
    if (localStorage.getItem("listaQuizzesUsuario") !== null){
        stringListaQuizzesUsuario = localStorage.getItem("listaQuizzesUsuario");
        listaQuizzesUsuario = JSON.parse(stringListaQuizzesUsuario);
    }
    listaQuizzesUsuario.push(quiz.id);
    listaQuizzesUsuario.push(informacoesNovoQuiz);
    stringListaQuizzesUsuario = JSON.stringify(listaQuizzesUsuario);
    localStorage.setItem("listaQuizzesUsuario", stringListaQuizzesUsuario);
}




// #########################################################################################################################




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

    // Atualiza a lista de quizzes para incluir o quiz criado
    listarQuizzes();

    //Buscar o container-tela5
    const containerTela5 = document.querySelector(".container-tela5");

    //remover deste a classe visivel
    containerTela5.classList.remove("visivel");

    //Buscar o main
    const main = document.querySelector("main");

    //adicionar deste a classe visível
    main.classList.add("visivel");
    document.querySelector("#topo").scrollIntoView();
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

//document.querySelector('.pagina-de-um-quiz').classList.remove("visivel");
