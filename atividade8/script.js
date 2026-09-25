// Arrays de controle (Catálogo inicial e Carrinho)
let catalogoProdutos = [
    { nome: 'Camiseta Básica', preco: 49.90 },
    { nome: 'Calça Jeans', preco: 119.90 },
    { nome: 'Tênis Esportivo', preco: 199.90 }
];

let carrinho = [];

const inputNomeProduto = document.getElementById('inputNomeProduto');
const inputPrecoProduto = document.getElementById('inputPrecoProduto');
const btnCadastrar = document.getElementById('btnCadastrar');
const gradeCatalogo = document.getElementById('gradeCatalogo');
const listaCarrinho = document.getElementById('listaCarrinho');
const divTotal = document.getElementById('totalCarrinho');

// Função para renderizar o catálogo na tela
function renderizarCatalogo() {
    gradeCatalogo.innerHTML = '';
    
    if (catalogoProdutos.length === 0) {
        gradeCatalogo.innerHTML = '<div class="vazio">Nenhum produto cadastrado no catálogo.</div>';
        return;
    }

    catalogoProdutos.forEach((produto, index) => {
        const card = document.createElement('div');
        card.className = 'card-produto-catalogo';
        card.innerHTML = `
            <span><strong>${produto.nome}</strong> - R$ ${produto.preco.toFixed(2)}</span>
            <button class="btn-adicionar-carrinho" onclick="adicionarAoCarrinho(${index})">Adicionar</button>
        `;
        gradeCatalogo.appendChild(card);
    });
}

// Função para cadastrar novos produtos no catálogo usando push()
btnCadastrar.addEventListener('click', function() {
    const nome = inputNomeProduto.value.trim();
    const preco = parseFloat(inputPrecoProduto.value);

    if (nome === '' || isNaN(preco) || preco <= 0) {
        alert('Por favor, informe um nome válido e um preço maior que zero.');
        return;
    }

    catalogoProdutos.push({ nome: nome, preco: preco });
    inputNomeProduto.value = '';
    inputPrecoProduto.value = '';
    renderizarCatalogo();
});

// Adicionar produto ao carrinho
window.adicionarAoCarrinho = function(index) {
    const produtoSelecionado = catalogoProdutos[index];
    carrinho.push(produtoSelecionado);
    renderizarCarrinho();
};

// Remover produto do carrinho usando splice()
window.removerDoCarrinho = function(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
};

// Renderizar o carrinho e calcular o total usando reduce()
function renderizarCarrinho() {
    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="vazio">O seu carrinho está vazio.</li>';
        divTotal.textContent = 'Total: R$ 0,00';
        return;
    }

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(li);
    });

    // Calculando o valor total da compra com reduce()
    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    divTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Inicialização da interface
renderizarCatalogo();
renderizarCarrinho();