// Array para armazenar os objetos de contatos
let contatos = [
    { nome: 'Ana Souza', telefone: '(31) 98888-1111', email: 'ana@email.com' },
    { nome: 'Carlos Silva', telefone: '(31) 97777-2222', email: 'carlos@email.com' }
];

const inputNome = document.getElementById('inputNome');
const inputTelefone = document.getElementById('inputTelefone');
const inputEmail = document.getElementById('inputEmail');
const btnAdicionar = document.getElementById('btnAdicionar');

const inputBusca = document.getElementById('inputBusca');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimparBusca = document.getElementById('btnLimparBusca');
const listaContatos = document.getElementById('listaContatos');

// Máscara automática e bloqueio de dígitos extras no telefone
inputTelefone.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    
    // Bloqueia se tentar digitar mais de 11 dígitos (limite máximo de celular com DDD)
    if (v.length > 11) {
        v = v.substring(0, 11);
    }
    
    // Aplica a formatação automática padrão do Brasil
    if (v.length <= 10) {
        // Formato Fixo: (XX) XXXX-XXXX
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        // Formato Celular: (XX) 9XXXX-XXXX
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    e.target.value = v;
});

// Função para renderizar os contatos na tela
function renderizarContatos(arrayParaExibir) {
    listaContatos.innerHTML = '';

    if (arrayParaExibir.length === 0) {
        listaContatos.innerHTML = '<li class="vazio">Nenhum contato encontrado.</li>';
        return;
    }

    arrayParaExibir.forEach((contato) => {
        const li = document.createElement('li');
        
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <strong>${contato.nome}</strong><br>
            <small>📞 ${contato.telefone} | ✉️ ${contato.email}</small>
        `;
        li.appendChild(infoDiv);

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn-remover';
        btnExcluir.textContent = 'Excluir';
        
        btnExcluir.addEventListener('click', function() {
            removerContato(contato.email);
        });

        li.appendChild(btnExcluir);
        listaContatos.appendChild(li);
    });
}

// Adicionar novos contatos com validação rigorosa do padrão brasileiro
btnAdicionar.addEventListener('click', function() {
    const nome = inputNome.value.trim();
    const telefone = inputTelefone.value.trim();
    const email = inputEmail.value.trim();

    // Validação de campos vazios
    if (nome === '' || telefone === '' || email === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validação estrita do padrão de dígitos do telefone (10 para fixo, 11 para celular)
    const apenasDigitosTelefone = telefone.replace(/\D/g, '');
    if (apenasDigitosTelefone.length !== 10 && apenasDigitosTelefone.length !== 11) {
        alert('Número de telefone inválido! Insira um número no padrão brasileiro (10 dígitos para fixo ou 11 para celular com DDD).');
        return;
    }

    // Validação básica de e-mail
    if (!email.includes('@')) {
        alert('O e-mail precisa conter o caractere "@".');
        return;
    }

    // Criar objeto e adicionar ao array
    const novoContato = { nome, telefone, email };
    contatos.push(novoContato);

    // Limpar os campos do formulário
    inputNome.value = '';
    inputTelefone.value = '';
    inputEmail.value = '';

    renderizarContatos(contatos);
    alert('Contato cadastrado com sucesso!');
});

// Função para remover um contato pelo e-mail
function removerContato(email) {
    contatos = contatos.filter(contato => contato.email !== email);
    renderizarContatos(contatos);
}

// Pesquisar contatos pelo nome
btnBuscar.addEventListener('click', function() {
    const termo = inputBusca.value.trim().toLowerCase();

    if (termo === '') {
        renderizarContatos(contatos);
        return;
    }

    const filtrados = contatos.filter(contato => 
        contato.nome.toLowerCase().includes(termo)
    );

    renderizarContatos(filtrados);
});

// Limpar pesquisa
btnLimparBusca.addEventListener('click', function() {
    inputBusca.value = '';
    renderizarContatos(contatos);
});

// Inicializar listagem ao carregar a página
renderizarContatos(contatos);