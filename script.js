let nome;

// CADASTRO DO USUÁRIO

function start() {
    nome = prompt("Digite seu lindo nome:");
    
    console.log(nome);
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        {name: nome}
    );
    promise.then(nomeValido);
    promise.catch(nomeInvalido);
}

function nomeValido() {
    alert ('Bem-vinde ;*');
    carregarMensagem();
    setInterval(aindaAtivo, 5000);
    setInterval(carregarMensagem, 3000);
}

function nomeInvalido(sinal) {
    let status = (sinal.response.status);
    if (status === 400) {
        alert (`Este nome já está sendo usado, tente novamente :P`);
        start();
    } else {
        alert (`Oh no! Erro ${status} encontrado x.x`);
        start();
    }
}

start();

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

        } else if (post.type === "private_message") {
            
            divMensagem = 
            `<div class="${post.type}">
                <p><em>(${post.time})</em> <b>${post.from}</b> reservadamente para <b>${post.to}</b>: ${post.text}</p>
            </div>`

        }

        chat.innerHTML += divMensagem;

    }

    let ultimoPost = document.querySelector(".chat :nth-child(100)");

    ultimoPost.scrollIntoView();

}