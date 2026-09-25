// Array inicial com pelo menos cinco títulos de filmes[cite: 7]
let filmes = [
    'O Poderoso Chefão',
    'Interestelar',
    'Matrix',
    'A Origem',
    'Vingadores: Ultimato'
];

const inputBusca = document.getElementById('inputBusca');
const btnPesquisar = document.getElementById('btnPesquisar');
const divResultadoBusca = document.getElementById('resultadoBusca');

const inputNovoFilme = document.getElementById('inputNovoFilme');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaFilmes = document.getElementById('listaFilmes');

// Função para exibir/atualizar a lista de filmes na tela[cite: 7]
function renderizarLista() {
    listaFilmes.innerHTML = '';
    filmes.forEach(filme => {
        const li = document.createElement('li');
        li.textContent = filme;
        listaFilmes.appendChild(li);
    });
}

// Inicializar a lista ao carregar a página
renderizarLista();

// Funcionalidade de pesquisa usando métodos de array (filter / includes)[cite: 7]
btnPesquisar.addEventListener('click', function() {
    const termoBusca = inputBusca.value.trim().toLowerCase();
    divResultadoBusca.classList.remove('oculto');

    if (termoBusca === '') {
        divResultadoBusca.textContent = 'Por favor, digite o nome de um filme para pesquisar.';
        divResultadoBusca.classList.add('nao-encontrado');
        return;
    }

    // Filtrando o array pelo termo digitado
    const filmesEncontrados = filmes.filter(filme => 
        filme.toLowerCase().includes(termoBusca)
    );

    if (filmesEncontrados.length > 0) {
        divResultadoBusca.classList.remove('nao-encontrado');
        divResultadoBusca.textContent = `Filme(s) encontrado(s): ${filmesEncontrados.join(', ')}`;
    } else {
        // Informar quando o filme não estiver cadastrado[cite: 7]
        divResultadoBusca.classList.add('nao-encontrado');
        divResultadoBusca.textContent = 'Filme não encontrado no catálogo.';
    }
});

// Funcionalidade para adicionar um novo filme usando push()[cite: 7]
btnAdicionar.addEventListener('click', function() {
    const novoFilme = inputNovoFilme.value.trim();

    if (novoFilme !== '') {
        filmes.push(novoFilme); // Adiciona ao array
        inputNovoFilme.value = '';
        renderizarLista();
        
        divResultadoBusca.classList.add('oculto');
        alert(`Filme "${novoFilme}" adicionado com sucesso!`);
    } else {
        alert('Digite o nome do filme antes de adicionar.');
    }
});