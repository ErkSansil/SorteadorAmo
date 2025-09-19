const sortearBtn = document.getElementById('sortearBtn');
const novoSorteioBtn = document.getElementById('novoSorteioBtn');
const inputsContainer = document.getElementById('inputs');
const contador = document.getElementById('contador');
const resultado = document.getElementById('resultado');
const mensagem = document.getElementById('mensagem');
const confetesContainer = document.getElementById('confetes');
const textoSorteio = document.getElementById('textoSorteio');

sortearBtn.addEventListener('click', () => {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);

    if (isNaN(min) || isNaN(max) || min > max) {
        alert("Digite valores válidos! O mínimo deve ser menor ou igual ao máximo.");
        return;
    }

    // Reset display
    resultado.textContent = '';
    mensagem.textContent = '';
    contador.textContent = '';
    textoSorteio.style.display = 'none';
    novoSorteioBtn.style.display = 'none';

    let tempo = 5;
    contador.textContent = tempo;

    const intervalo = setInterval(() => {
        tempo--;
        contador.textContent = tempo;
        if (tempo <= 0) {
            clearInterval(intervalo);
            contador.textContent = '';
            inputsContainer.style.display = 'none';
            sortearBtn.style.display = 'none';

            // Mostra texto "E o número sorteado foi..."
            textoSorteio.style.display = 'block';

            const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
            resultado.textContent = numeroSorteado;
            mensagem.textContent = "PARABÉNS!!🎉";

            gerarConfetes(100);

            setTimeout(() => {
                novoSorteioBtn.style.display = 'inline-block';
            }, 1000);
        }
    }, 1000);
});

novoSorteioBtn.addEventListener('click', () => {
    inputsContainer.style.display = 'flex';
    sortearBtn.style.display = 'inline-block';
    resultado.textContent = '';
    mensagem.textContent = '';
    contador.textContent = '';
    textoSorteio.style.display = 'none';
    novoSorteioBtn.style.display = 'none';
});

function gerarConfetes(qtd) {
    for (let i = 0; i < qtd; i++) {
        const confete = document.createElement('div');
        confete.classList.add('confete');
        confete.style.backgroundColor = coresAleatorias();
        confete.style.left = Math.random() * window.innerWidth + 'px';
        confete.style.animationDuration = (2 + Math.random() * 3) + 's';
        confetesContainer.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 5000);
    }
}

function coresAleatorias() {
    const cores = ['#FF69B4','#1E90FF','#FFD700','#00FFcc','#FF4500','#FF1493'];
    return cores[Math.floor(Math.random() * cores.length)];
}