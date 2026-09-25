document.getElementById('btnVerificar').addEventListener('click', function() {
    const inputAno = document.getElementById('anoNascimento');
    const divResultado = document.getElementById('resultado');

    divResultado.classList.remove('oculto');

    const anoNascimento = parseInt(inputAno.value);
    
    // Obtém o ano atual dinamicamente via JavaScript
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    // Validação de entrada
    if (isNaN(anoNascimento) || anoNascimento <= 1900 || anoNascimento > anoAtual) {
        divResultado.style.backgroundColor = '#ffe5e5';
        divResultado.style.color = '#d90429';
        divResultado.style.borderColor = '#ffb3b3';
        divResultado.textContent = 'Por favor, insira um ano de nascimento válido.';
        return;
    }

    // Cálculo da idade
    const idade = anoAtual - anoNascimento;
    let faixaEtaria = '';

    // Classificação da faixa etária
    if (idade >= 0 && idade <= 12) {
        faixaEtaria = 'Criança';
    } else if (idade >= 13 && idade <= 17) {
        faixaEtaria = 'Adolescente';
    } else if (idade >= 18 && idade <= 59) {
        faixaEtaria = 'Adulto';
    } else {
        faixaEtaria = 'Idoso';
    }

    // Estilo de sucesso
    divResultado.style.backgroundColor = '#f1faee';
    divResultado.style.color = '#1d3557';
    divResultado.style.borderColor = '#a8dadc';

    // Exibição na tela
    divResultado.textContent = `Idade aproximada: ${idade} anos. Classificação: ${faixaEtaria}.`;
});