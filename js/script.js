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