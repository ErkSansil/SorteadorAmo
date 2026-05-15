/* =====================================================
SORTEADOR AMO
Script principal completo
===================================================== */



const sortearBtn =
    document.getElementById('sortearBtn');

const novoSorteioBtn =
    document.getElementById('novoSorteioBtn');

const sortearPlanilhaBtn =
    document.getElementById('sortearPlanilhaBtn');

const novoSorteioPlanilhaBtn =
    document.getElementById('novoSorteioPlanilhaBtn');

const confetesContainer =
    document.getElementById('confetes');

const dataHora =
    document.getElementById('dataHora');



/* =====================================================
CONTROLE ANTI DUPLO CLIQUE
===================================================== */
/*
Evita iniciar outro sorteio enquanto
já existe um em andamento.
*/

let sorteioEmAndamento = false;



/* =====================================================
ATUALIZA DATA E HORA
===================================================== */
/*
O horário fica congelado exatamente
no momento em que o resultado aparece.
*/

function atualizarDataHora(){

    const agora = new Date();

    const data =
        agora.toLocaleDateString('pt-BR');

    const hora =
        agora.toLocaleTimeString('pt-BR');

    dataHora.innerHTML =
        `Sorteado em: ${data} • ${hora}`;

}



// Começa escondido
dataHora.style.display = 'none';



/* =====================================================
TROCA DE ABAS
===================================================== */

function mostrarAba(aba){

    document.getElementById('abaAleatorio')
        .style.display = 'none';

    document.getElementById('abaPlanilha')
        .style.display = 'none';



    if(aba === 'aleatorio'){

        document.getElementById('abaAleatorio')
            .style.display = 'flex';

    }



    if(aba === 'planilha'){

        document.getElementById('abaPlanilha')
            .style.display = 'flex';

    }

}



/* =====================================================
ROLETA VISUAL
===================================================== */
/*
Efeito cassino.
Os números ficam girando até
o resultado oficial aparecer.
*/

function iniciarRoleta(
    elemento,
    min,
    max
){

    elemento.classList.add('rolando');



    return setInterval(()=>{

        const numeroFake =
            Math.floor(
                Math.random() * (max - min + 1)
            ) + min;



        elemento.textContent =
            numeroFake;

    },70);

}



/* =====================================================
PARAR ROLETA
===================================================== */

function pararRoleta(
    intervalo,
    elemento
){

    clearInterval(intervalo);

    elemento.classList.remove('rolando');

}



/* =====================================================
ANIMAÇÃO RESULTADO
===================================================== */

function animarResultado(elemento){

    elemento.classList.remove('resultado-final');

    void elemento.offsetWidth;

    elemento.classList.add('resultado-final');

}



/* =====================================================
RESET SORTEIO NORMAL
===================================================== */

function resetarSorteio(){

    document.getElementById('resultado')
        .textContent = '';

    document.getElementById('mensagem')
        .textContent = '';

    document.getElementById('contador')
        .textContent = '';

    document.getElementById('textoSorteio')
        .style.display = 'none';

    novoSorteioBtn.style.display =
        'none';



    // Esconde horário ao resetar
    dataHora.style.display =
        'none';

}



/* =====================================================
RESET SORTEIO PLANILHA
===================================================== */

function resetarSorteioPlanilha(){

    document.getElementById('resultadoPlanilha')
        .textContent = '';

    document.getElementById('mensagemPlanilha')
        .textContent = '';

    document.getElementById('contadorPlanilha')
        .textContent = '';

    document.getElementById('textoSorteioPlanilha')
        .style.display = 'none';

    novoSorteioPlanilhaBtn.style.display =
        'none';



    // Esconde horário ao resetar
    dataHora.style.display =
        'none';

}



/* =====================================================
BOTÃO NOVO SORTEIO
===================================================== */

novoSorteioBtn.addEventListener('click', ()=>{

    resetarSorteio();

});



novoSorteioPlanilhaBtn.addEventListener('click', ()=>{

    resetarSorteioPlanilha();

});



/* =====================================================
SORTEIO ALEATÓRIO
===================================================== */

sortearBtn.addEventListener('click', ()=>{

    // Bloqueia múltiplos cliques
    if(sorteioEmAndamento){

        return;

    }

    sorteioEmAndamento = true;



    const min = parseInt(
        document.getElementById('min').value
    );

    const max = parseInt(
        document.getElementById('max').value
    );



    if(
        isNaN(min) ||
        isNaN(max) ||
        min > max
    ){

        alert("Digite valores válidos!");

        sorteioEmAndamento = false;

        return;

    }



    resetarSorteio();



    let tempo = 5;



    const contador =
        document.getElementById('contador');

    const resultadoElemento =
        document.getElementById('resultado');



    contador.textContent = tempo;



    // Começa a roleta imediatamente
    const roleta =
        iniciarRoleta(
            resultadoElemento,
            min,
            max
        );



    const intervalo = setInterval(()=>{

        tempo--;

        contador.textContent = tempo;



        if(tempo <= 0){

            clearInterval(intervalo);



            pararRoleta(
                roleta,
                resultadoElemento
            );



            contador.textContent = '';



            // Resultado oficial
            const numero =
                Math.floor(
                    Math.random() * (max - min + 1)
                ) + min;



            document.getElementById('textoSorteio')
                .style.display = 'block';



            resultadoElemento.textContent =
                numero;



            animarResultado(
                resultadoElemento
            );



            document.getElementById('mensagem')
                .innerHTML =
                "PARABÉNS!! 🎉";



            gerarConfetes(400);



            // Horário exato do sorteio
            atualizarDataHora();

            dataHora.style.display =
                'block';



            novoSorteioBtn.style.display =
                'inline-block';



            // Libera novo sorteio
            sorteioEmAndamento = false;

        }

    },1000);

});



/* =====================================================
SORTEIO VIA PLANILHA
===================================================== */
/*
O fetch começa imediatamente.
A roleta é só visual.
*/

sortearPlanilhaBtn.addEventListener('click', ()=>{

    // Bloqueia múltiplos cliques
    if(sorteioEmAndamento){

        return;

    }

    sorteioEmAndamento = true;



    resetarSorteioPlanilha();



    let resultadoSorteio = null;

    let carregamentoFinalizado = false;



    const contador =
        document.getElementById('contadorPlanilha');

    const resultadoElemento =
        document.getElementById('resultadoPlanilha');



    let tempo = 5;

    contador.textContent = tempo;



    // Inicia roleta visual
    const roleta =
        iniciarRoleta(
            resultadoElemento,
            1,
            599999999
        );



    /* =========================================
    BUSCA RESULTADO IMEDIATAMENTE
    ========================================= */

    fetch(
        "https://script.google.com/macros/s/AKfycbzmRH-XW_uuh8IVtbrKPrOkC4_1in-6le5pFuDf8oFONECcN9U0NyYGLtwRPE4eng6u/exec"
    )

    .then(response => response.json())

    .then(data => {

        resultadoSorteio = data;

        carregamentoFinalizado = true;

    })

    .catch(error => {

        console.log(error);

        alert(
            "Erro ao conectar com Google Sheets"
        );



        // Libera novamente em caso de erro
        sorteioEmAndamento = false;

    });



    /* =========================================
    CONTAGEM REGRESSIVA
    ========================================= */

    const intervalo = setInterval(()=>{

        tempo--;

        contador.textContent = tempo;



        // Acabou a contagem
        if(tempo <= 0){

            clearInterval(intervalo);



            // Mantém o 0 pulsando
            contador.textContent = '0';



            /* =====================================
            ESPERA RESULTADO TERMINAR
            ===================================== */

            const esperaFinal =
                setInterval(()=>{

                    // Ainda carregando
                    if(!carregamentoFinalizado){

                        resultadoElemento.style.opacity =
                            "0.75";

                        return;

                    }



                    clearInterval(
                        esperaFinal
                    );



                    // Fade da roleta
                    resultadoElemento.style.transition =
                        "all 0.5s ease";



                    resultadoElemento.style.opacity =
                        "0";



                    // Pequena pausa
                    setTimeout(()=>{

                        pararRoleta(
                            roleta,
                            resultadoElemento
                        );



                        contador.textContent = '';



                        // Exibe resultado
                        document.getElementById('textoSorteioPlanilha')
                            .style.display = 'block';



                        resultadoElemento.style.opacity =
                            "1";



                        /* =========================================
                        NOME DA GANHADORA EM DESTAQUE
                        ========================================= */

                        resultadoElemento.innerHTML =

                            resultadoSorteio.nome +

                            "<div style='font-size:0.45em; margin-top:12px;'>#" +

                            resultadoSorteio.numero +

                            "</div>";



                        animarResultado(
                            resultadoElemento
                        );



                        document.getElementById('mensagemPlanilha')
                            .innerHTML =
                            "PARABÉNS!! 🎉";



                        gerarConfetes(400);



                        // Horário exato do sorteio
                        atualizarDataHora();

                        dataHora.style.display =
                            'block';



                        novoSorteioPlanilhaBtn.style.display =
                            'inline-block';



                        // Libera novo sorteio
                        sorteioEmAndamento = false;

                    },500);

                },100);

        }

    },1000);

});



/* =====================================================
CONFETES
===================================================== */

function gerarConfetes(qtd){

    for(let i = 0; i < qtd; i++){

        const confete =
            document.createElement('div');

        confete.classList.add('confete');



        confete.style.backgroundColor =
            coresAleatorias();



        confete.style.left =
            Math.random() * window.innerWidth + 'px';



        confete.style.animationDuration =
            (2 + Math.random() * 3) + 's';



        confetesContainer.appendChild(confete);



        setTimeout(()=>{

            confete.remove();

        },5000);

    }

}



/* =====================================================
CORES CONFETES
===================================================== */

function coresAleatorias(){

    const cores = [

        '#FF69B4',
        '#1E90FF',
        '#FFD700',
        '#00FFcc',
        '#FF4500',
        '#FF1493'

    ];



    return cores[
        Math.floor(
            Math.random() * cores.length
        )
    ];

}
