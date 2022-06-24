let nome;

// CADASTRO DO USUÁRIO

function start() {
    nome = prompt("Digite seu lindo nome:");
    
    console.log(nome);
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        {name: nome}
    );
    console.log(promise);
    promise.then(nomeValido);
    promise.catch(nomeInvalido);
}

function nomeValido(sinal) {
    console.log(sinal);
    alert ('Deu bom');
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

// PROXIMA FUNÇÃO


function refresh() {
    // Atualizar as mensagens a cafa 3 seg
    // Substituir qual é a imagem mais recente com a classe
    // Usar o scrollIntoView() no elemento com a classe
}


