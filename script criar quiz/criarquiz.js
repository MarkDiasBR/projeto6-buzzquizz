
// ################################################## CRIAÇÃO DE UM NOVO QUIZ ##############################################################

// Variável para guardar o input do título do novo quiz da tela 3.1 - Informações básicas do quiz
const inputTitulo = document.querySelector(".input-titulo-novo-quiz");
// Variável para guardar o input para a url da imagem do novo quiz da tela 3.1 - Informações básicas do quiz
const inputImagem = document.querySelector(".input-imagem-novo-quiz");
// Variável para guardar o input para a quantidade de perguntas do novo quiz da tela 3.1 - Informações básicas do quiz
const inputQuantidadePerguntas = document.querySelector(".input-quantidade-perguntas-novo-quiz");
// Variável para guardar o input para a quantidade de níveis do novo quiz da tela 3.1 - Informações básicas do quiz
const inputQuantidadeNiveis = document.querySelector(".input-quantidade-niveis-novo-quiz");

// mensagemErroTitulo guarda o elemento que vai receber o texto sobre o erro no título do novo quiz
const mensagemErroTitulo = document.querySelector(".erro-titulo-novo-quiz");
// mensagemErroImagem guarda o elemento que vai receber o texto sobre o erro na URL da imagem do do novo quiz
const mensagemErroImagem = document.querySelector(".erro-imagem-novo-quiz");
// mensagemErroQuantidadePerguntas guarda o elemento do texto sobre o erro na quantidade de perguntas do novo quiz
const mensagemErroQuantidadePerguntas = document.querySelector(".erro-perguntas-novo-quiz");
// mensagemErroQuantidadeNiveis guarda o elemento do texto sobre o erro na quantidade de níveis do novo quiz
const mensagemErroQuantidadeNiveis = document.querySelector(".erro-niveis-novo-quiz");

// Função que será chamada no onclick no botão de CRIAR QUIZ da tela 1 - Lista de quizzes
function AbrirTelaCriarQuiz(){

    // Abrir a tela de informações básicas do novo quiz (Tela 3.1: Informações básicas do quizz)
    const telaNovoQuizInformacoes = document.querySelector(".tela-informacoes-novo-quiz");
    telaNovoQuizInformacoes.classList.remove("escondida");

}
// Função para ativar o botão de criar perguntas para um novo quiz após verificar se todas as 
// informações básicas do novo quiz foram preenchidas, deve ser executada no onclick dos inputs 
// da tela 3.1 - Informações básicas do quiz (título, imagem, #perguntas e #níveis)
function AtivarBotaoCriarPerguntas(){
    const todasInformacoesPreenchidas = inputTitulo.value.length > 0 && 
          inputImagem.value.length > 0 && inputQuantidadePerguntas.value.length > 0 &&
          inputQuantidadeNiveis.value.length > 0;
    if (todasInformacoesPreenchidas){
        const botaoCriarPerguntas = document.querySelector(".botao-criar-perguntas");
        // Deixa o botão com uma cor diferente (#EC362D;) e talvez mude a cor do texto do botão também
        botaoCriarPerguntas.classList.add("botao-habilitado");
        botaoCriarPerguntas.removeAttribute("disabled");
    }
}
// Função que será chamada no onclick no botão de CRIAR PERGUNTAS da 3.1 - Informações básicas do quiz
function ValidarInformacoesNovoQuiz(){
// Tela 3.1: Informações básicas do quizz    
    
    let tudoCerto = true;

    // Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres
    const titulo = inputTitulo.value;    
    if (titulo.trim().length < 20 || titulo.trim().length > 65){
        tudoCerto = false;
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input   
        inputTitulo.style.backgroundColor = "#FFE9E9";
        mensagemErroTitulo.innerHTML = "O titulo deve ter entre 20 e 65 caracteres";
    }
    
    // URL da Imagem: deve ter formato de URL
    const imagem = inputImagem.value;     
    if (FormatoURLInvalido(imagem.trim())){
        tudoCerto = false;
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input     
        inputImagem.style.backgroundColor = "#FFE9E9";
        mensagemErroImagem.innerHTML = "O valor informado não é uma URL válida";          
    }
    
    // Quantidade de perguntas: no mínimo 3 perguntas
    const quantidadePerguntas = parseInt(inputQuantidadePerguntas.value);   
    if (isNaN(quantidadePerguntas)){
        tudoCerto = false;
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input
        inputQuantidadePerguntas.style.backgroundColor = "#FFE9E9";
        mensagemErroQuantidadePerguntas.innerHTML = "Deve ser informado um número válido maior que dois";  
    }
    else if (quantidadePerguntas < 3){
        tudoCerto = false;
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input
        inputQuantidadePerguntas.style.backgroundColor = "#FFE9E9";
        mensagemErroQuantidadePerguntas.innerHTML = "O quiz deve ter no mínimo 3 perguntas";   
    }
        
    // Quantidade de níveis: no mínimo 2 níveis
    const quantidadeNiveis = parseInt(inputQuantidadeNiveis.value);   
    if (isNaN(quantidadeNiveis)){
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input
        inputQuantidadeNiveis.style.backgroundColor = "#FFE9E9";
        mensagemErroQuantidadeNiveis.innerHTML = "Deve ser informado um número válido maior que um"; 
    }
    else if (quantidadeNiveis < 2){
        tudoCerto = false;
        // Alterar a cor do input e exibir o texto avisando do erro embaixo do input
        inputQuantidadeNiveis.style.backgroundColor = "#FFE9E9";
        mensagemErroQuantidadeNiveis.innerHTML = "O quiz deve ter no mínimo dois níveis"; 
    }        

    // Se estiver tudo certo com as informações básicas do quiz abre a tela de criação das perguntas
    if (tudoCerto){
        // Fechar a tela de informações do novo quiz (Tela 3.1: Informações básicas do quizz)
        telaNovoQuizInformacoes.classList.add("escondida");
        CriarPerguntasQuiz();
    }    
}
// Funções para validar a URL da imagem para o novo quiz
async function FormatoURLInvalido(urlImagem){

    // Verifica a criação de uma imagem com a URL da imagem informada
    try {
        const resultadoVerificacaoURL = await VerificaURLImagemNovoQuiz(urlImagem);
    }
    // A função de verificação retornou um erro então a URL da imagem é inválida
    catch {
        // URL da imagem é inválida, returna true
        console.log("Imagem inválida! ");
        return true;
    }
    // URL da imagem é válida, returna false
    console.log("Imagem válida! ");
    return false;
}
async function VerificaURLImagemNovoQuiz(urlImagem){
    // Verifica a criação de uma imagem com a URL informada
    const promessa = await new Promise(function(deuCerto,deuErrado){
                                    const imagem = new Image();
                                    imagem.src = urlImagem;
                                    imagem.onload = deuCerto;
                                    imagem.onerror = deuErrado;
                                });
    // Retorna uma promessa para ser tratada na função FormatoURLInvalido(url)
    return promessa;
}
// Função para resetar a formatação dos inputs e apagar mensagens de erro da tela 3.1 - Informações básicas do quiz
// Tem que ser chamada após sucesso na validação das informações básicas do quiz 
function ResetarInputsEMensagensDeErro (){

    inputTitulo.style.backgroundColor = "white";
    inputImagem.style.backgroundColor = "white";
    inputQuantidadePerguntas.style.backgroundColor = "white";
    inputQuantidadeNiveis.style.backgroundColor = "white";

    if (elementoInput.classList.contains("input-titulo-novo-quiz")){
        document.querySelector(".erro-titulo-novo-quiz").classList.add("escondida");
    }
    if (elementoInput.classList.contains("input-imagem-novo-quiz")){
        document.querySelector(".erro-imagem-novo-quiz").classList.add("escondida");
    }
    if (elementoInput.classList.contains("input-quantidade-perguntas-novo-quiz")){
        document.querySelector(".erro-perguntas-novo-quiz").classList.add("escondida");
    }
    if (elementoInput.classList.contains("input-quantidade-niveis-novo-quiz")){
        document.querySelector(".erro-niveis-novo-quiz").classList.add("escondida");
    }
}

// ########################################################################################################################################