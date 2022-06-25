let nome;

// CADASTRO DO USUÁRIO

function start() {
    nome = document.querySelector(".input-nome").value;

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        {name: nome}
    );
    promise.then(nomeValido);
    promise.catch(nomeInvalido);
}

function nomeValido() {
    telaCarregamento();
    carregarMensagem();
    setInterval(aindaAtivo, 5000);
    setInterval(carregarMensagem, 3000);
}

function nomeInvalido(sinal) {
    let status = (sinal.response.status);
    if (status === 400) {
        alert (`Este nome já está sendo usado, tente novamente :P`);
    } else {
        alert (`Oh no! Erro ${status} encontrado x.x`);
    }
}

// MANTER CONEXÃO ATIVA

function aindaAtivo(){
    const promise = axios.post(
        'https://mock-api.driven.com.br/api/v6/uol/status',
        {name: nome}
    );
}

// CARREGAR MENSAGENS

function carregarMensagem() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(printPosts);
}

function printPosts (array){
    let NumMensagens = array.data.length;
    let chat = document.querySelector(".chat")
    chat.innerHTML = "";

    for (let i = 0; i < NumMensagens; i++){

        let post = array.data[i];
        let divMensagem;

        if (post.type === "status") {

            divMensagem =
            `<div class="${post.type}">
                <p><em>(${post.time})</em> <b>${post.from}</b> ${post.text}</p>
            </div>`

        } else if (post.type === "message") {

            divMensagem =
            `<div class="${post.type}">
                <p><em>(${post.time})</em> <b>${post.from}</b> para <b>${post.to}</b>: ${post.text}</p>
            </div>`

        } else if (post.type === "private_message" && (post.to === nome || post.from === nome)) {

            divMensagem =
            `<div class="${post.type}">
                <p><em>(${post.time})</em> <b>${post.from}</b> reservadamente para <b>${post.to}</b>: ${post.text}</p>
            </div>`

        } else {
            divMensagem = '<div class="hidden"></div>'
        }

        chat.innerHTML += divMensagem;

    }


    // Filtro do último post

    let feed = document.querySelectorAll (".chat div");
    let ultimoPost = feed[feed.length-1];

    ultimoPost.scrollIntoView();

}

// ENVIAR MENSAGEM

function postar() {

    let mensagem = document.querySelector(".input-mensagem");

    if (mensagem !== ""){


        let post = {
            from: nome,
            to: "Todos", // ou alguém específico
            text: mensagem.value,
            type: "message" // ou "private_message" para o bônus
        }

        let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', post);
        promise.then(carregarMensagem);
        promise.catch(window.location.reload);

        mensagem.value = "";

    }

}

// BÔNUS: TELA DE ENTRADA

function telaCarregamento() {

    document.querySelector(".input-nome").classList.add("hidden");
    document.querySelector(".tela-inicial button").classList.add("hidden");
    document.querySelector(".carregando").classList.remove("hidden");

    setTimeout(liberarEntrada,1500);
}

function liberarEntrada() {
    document.querySelector(".tela-inicial").classList.add("hidden");
}

// BÔNUS: ENVIAR COM ENTER

document.querySelector(".input-nome").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
        start();
    }
  });

document.querySelector(".input-mensagem").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
        postar();
    }
  });