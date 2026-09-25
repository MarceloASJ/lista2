document.getElementById('btnSimular').addEventListener('click', function() {
    const inputValor = document.getElementById('valorCompra');
    const inputDesconto = document.getElementById('percentualDesconto');
    const divResultado = document.getElementById('resultado');
    const divErro = document.getElementById('mensagemErro');

    // Limpar estados anteriores
    divResultado.classList.add('oculto');
    divErro.classList.add('oculto');

    const valorCompra = parseFloat(inputValor.value);
    const descontoInformado = parseFloat(inputDesconto.value);

    // Validação de campos vazios ou inválidos
    if (isNaN(valorCompra) || isNaN(descontoInformado) || valorCompra <= 0 || descontoInformado < 0) {
        divErro.textContent = 'Por favor, preencha valores numéricos válidos para a compra e o desconto.';
        divErro.classList.remove('oculto');
        return;
    }

    // Regra: Descontos informados acima de 50% não são permitidos[cite: 7]
    if (descontoInformado > 50) {
        divErro.textContent = 'Erro: Descontos acima de 50% não são permitidos.';
        divErro.classList.remove('oculto');
        return;
    }

    let descontoFinal = descontoInformado;
    let mensagemExtra = '';

    // Verificar se aplica o bónus de compra acima de R$ 500[cite: 7]
    if (valorCompra > 500) {
        if (descontoInformado + 5 <= 50) {
            descontoFinal += 5;
            mensagemExtra = '<br><small style="color: #2a9d8f;">✨ Bónus: +5% de desconto adicional aplicado por compra superior a R$ 500,00!</small>';
        } else {
            descontoFinal = 50;
            mensagemExtra = '<br><small style="color: #e63946;">⚠️ Desconto limitado a 50% (limite máximo atingido com o bónus).</small>';
        }
    }

    // Cálculos
    const valorDescontado = valorCompra * (descontoFinal / 100);
    const valorFinal = valorCompra - valorDescontado;

    // Exibir o resumo da compra na tela[cite: 7]
    divResultado.innerHTML = `
        <strong>Resumo da Compra:</strong><br>
        • Valor Original: R$ ${valorCompra.toFixed(2)}<br>
        • Desconto Aplicado: ${descontoFinal}% ${mensagemExtra}<br>
        • Valor Descontado: R$ ${valorDescontado.toFixed(2)}<br>
        • <strong>Valor Final: R$ ${valorFinal.toFixed(2)}</strong>
    `;
    divResultado.classList.remove('oculto');
});