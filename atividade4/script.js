document.getElementById('btnConverter').addEventListener('click', function() {
    const inputTemperatura = document.getElementById('temperatura');
    const escalaOrigem = document.getElementById('escalaOrigem').value;
    const escalaDestino = document.getElementById('escalaDestino').value;
    const divResultado = document.getElementById('resultado');
    const divErro = document.getElementById('mensagemErro');

    // Limpar estados anteriores
    divResultado.classList.add('oculto');
    divErro.classList.add('oculto');

    const valorStr = inputTemperatura.value.trim();

    // Validação de campo vazio ou inválido
    if (valorStr === '' || isNaN(valorStr)) {
        divErro.textContent = 'Por favor, insira um valor numérico válido para a temperatura.';
        divErro.classList.remove('oculto');
        return;
    }

    const temp = parseFloat(valorStr);
    let resultadoCalculado = 0;
    let simboloOrigem = escalaOrigem === 'celsius' ? '°C' : '°F';
    let simboloDestino = escalaDestino === 'celsius' ? '°C' : '°F';

    // Lógica de conversão
    if (escalaOrigem === escalaDestino) {
        resultadoCalculado = temp;
    } else if (escalaOrigem === 'celsius' && escalaDestino === 'fahrenheit') {
        resultadoCalculado = (temp * 9/5) + 32;
    } else if (escalaOrigem === 'fahrenheit' && escalaDestino === 'celsius') {
        resultadoCalculado = (temp - 32) * 5/9;
    }

    // Exibir o resultado dinamicamente
    divResultado.textContent = `${temp.toFixed(1)} ${simboloOrigem} equivalem a ${resultadoCalculado.toFixed(2)} ${simboloDestino}`;
    divResultado.classList.remove('oculto');
});