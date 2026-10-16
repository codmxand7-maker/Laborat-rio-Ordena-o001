'use strict';

const formulario = document.getElementById('sort-form');
const campoNumeros = document.getElementById('numbers');
const campoAlgoritmo = document.getElementById('algorithm');
const campoOrdem = document.getElementById('order');

const botaoExemplo = document.getElementById('example-button');
const botaoLimpar = document.getElementById('clear-button');
const mensagem = document.getElementById('message');
const statusResultado = document.getElementById('result-status');

const listaOriginal = document.getElementById('original-list');
const listaResultado = document.getElementById('sorted-list');
const descricaoResultado = document.getElementById('sorted-description');
const quantidadeItens = document.getElementById('item-count');
const rotuloOrdem = document.getElementById('order-label');

const campoComparacoes = document.getElementById('comparisons');
const campoTrocas = document.getElementById('swaps');
const campoNomeAlgoritmo = document.getElementById('algorithm-used');

const campoEtapas = document.getElementById('trace-list');
const contagemEtapas = document.getElementById('step-count');
const botaoMostrarMais = document.getElementById('show-more');

const LIMITE_ETAPAS_INICIAIS = 12;
let todasEtapas = [];
let mostrandoTodasEtapas = false;

function lerNumeros(texto) {
    const entrada = texto.trim();

    if (entrada === '') {
        throw new Error('Digite pelo menos um número.');
    }

    const partes = entrada.split(/[,\s;]+/).filter(Boolean);

    if (partes.length > 100) {
        throw new Error('Digite no máximo 100 números por vez.');
    }

    return partes.map(function (parte) {
        if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(parte)) {
            throw new Error('O valor "' + parte + '" não é um número válido.');
        }

        const numero = Number(parte);

        if (!Number.isFinite(numero)) {
            throw new Error('Todos os valores precisam ser números válidos.');
        }

        return numero;
    });
}

function precisaTrocar(a, b, ordem) {
    return ordem === 'asc' ? a > b : a < b;
}

function bubbleSort(entrada, ordem) {
    const numeros = [...entrada];
    const etapas = [];
    let comparacoes = 0;
    let trocas = 0;

    for (let fim = numeros.length - 1; fim > 0; fim--) {
        let houveTroca = false;

        for (let i = 0; i < fim; i++) {
            comparacoes++;

            const a = numeros[i];
            const b = numeros[i + 1];

            if (precisaTrocar(a, b, ordem)) {
                [numeros[i], numeros[i + 1]] = [numeros[i + 1], numeros[i]];
                trocas++;
                houveTroca = true;

                etapas.push(
                    'Troca: ' + a + ' e ' + b +
                    '. Sequência: ' + numeros.join(', ')
                );
            } else {
                etapas.push(
                    'Comparação: ' + a + ' e ' + b +
                    '. Não foi necessário trocar.'
                );
            }
        }

        if (!houveTroca) {
            break;
        }
    }

    return { numeros, etapas, comparacoes, trocas };
}

function selectionSort(entrada, ordem) {
    const numeros = [...entrada];
    const etapas = [];
    let comparacoes = 0;
    let trocas = 0;

    for (let i = 0; i < numeros.length - 1; i++) {
        let escolhido = i;

        for (let j = i + 1; j < numeros.length; j++) {
            comparacoes++;

            etapas.push(
                'Comparação: ' + numeros[escolhido] +
                ' com ' + numeros[j] + '.'
            );

            const melhor = ordem === 'asc'
                ? numeros[j] < numeros[escolhido]
                : numeros[j] > numeros[escolhido];

            if (melhor) {
                escolhido = j;
            }
        }

        if (escolhido !== i) {
            [numeros[i], numeros[escolhido]] = [numeros[escolhido], numeros[i]];
            trocas++;

            etapas.push(
                'Troca: colocou ' + numeros[i] +
                ' na posição ' + (i + 1) +
                '. Sequência: ' + numeros.join(', ')
            );
        } else {
            etapas.push(
                numeros[i] + ' já estava na posição correta.'
            );
        }
    }

    return { numeros, etapas, comparacoes, trocas };
}

function mostrarNumeros(elemento, numeros) {
    elemento.replaceChildren();
    elemento.classList.remove('empty-list');

    numeros.forEach(function (numero) {
        const etiqueta = document.createElement('span');
        etiqueta.className = 'numero';
        etiqueta.textContent = String(numero);
        elemento.appendChild(etiqueta);
    });

    if (numeros.length === 0) {
        elemento.classList.add('empty-list');
    }
}

function mostrarEtapas() {
    campoEtapas.replaceChildren();

    const etapasVisiveis = mostrandoTodasEtapas
        ? todasEtapas
        : todasEtapas.slice(0, LIMITE_ETAPAS_INICIAIS);

    if (etapasVisiveis.length === 0) {
        const item = document.createElement('li');
        item.className = 'trace-empty';
        item.textContent = 'Execute a ordenação para ver as etapas aqui.';
        campoEtapas.appendChild(item);
    } else {
        etapasVisiveis.forEach(function (etapa) {
            const item = document.createElement('li');
            item.textContent = etapa;
            campoEtapas.appendChild(item);
        });
    }

    contagemEtapas.textContent =
        todasEtapas.length +
        (todasEtapas.length === 1 ? ' etapa' : ' etapas');

    botaoMostrarMais.hidden =
        todasEtapas.length <= LIMITE_ETAPAS_INICIAIS;

    botaoMostrarMais.textContent = mostrandoTodasEtapas
        ? 'Mostrar menos etapas'
        : 'Mostrar todas as etapas';
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    mensagem.textContent = '';

    try {
        const numeros = lerNumeros(campoNumeros.value);
        const ordem = campoOrdem.value;
        const algoritmo = campoAlgoritmo.value;

        const resultado = algoritmo === 'bubble'
            ? bubbleSort(numeros, ordem)
            : selectionSort(numeros, ordem);

        mostrarNumeros(listaOriginal, numeros);
        mostrarNumeros(listaResultado, resultado.numeros);

        quantidadeItens.textContent = String(numeros.length);

        rotuloOrdem.textContent =
            ordem === 'asc' ? 'Crescente' : 'Decrescente';

        descricaoResultado.textContent =
            algoritmo === 'bubble'
                ? 'Ordenado pelo Bubble Sort.'
                : 'Ordenado pelo Selection Sort.';

        campoComparacoes.textContent = String(resultado.comparacoes);
        campoTrocas.textContent = String(resultado.trocas);

        campoNomeAlgoritmo.textContent =
            algoritmo === 'bubble' ? 'Bubble Sort' : 'Selection Sort';

        statusResultado.textContent = 'Ordenação concluída';

        todasEtapas = resultado.etapas;
        mostrandoTodasEtapas = false;
        mostrarEtapas();

    } catch (erro) {
        mensagem.textContent =
            erro.message || 'Ocorreu um erro ao ordenar os números.';
    }
});

botaoExemplo.addEventListener('click', function () {
    campoNumeros.value = '8, 3, 10, -2, 3, 1';
    campoNumeros.focus();
    mensagem.textContent = '';
});

botaoLimpar.addEventListener('click', function () {
    campoNumeros.value = '';
    mensagem.textContent = '';

    listaOriginal.replaceChildren();
    listaOriginal.textContent = 'Sua lista aparecerá aqui.';
    listaOriginal.classList.add('empty-list');

    listaResultado.replaceChildren();
    listaResultado.textContent = 'Pronto para ordenar.';
    listaResultado.classList.add('empty-list');

    descricaoResultado.textContent = 'O resultado aparecerá aqui.';
    quantidadeItens.textContent = '—';
    rotuloOrdem.textContent = '—';

    campoComparacoes.textContent = '—';
    campoTrocas.textContent = '—';
    campoNomeAlgoritmo.textContent = '—';

    statusResultado.textContent = 'Aguardando sua sequência';

    todasEtapas = [];
    mostrandoTodasEtapas = false;
    mostrarEtapas();

    campoNumeros.focus();
});

botaoMostrarMais.addEventListener('click', function () {
    mostrandoTodasEtapas = !mostrandoTodasEtapas;
    mostrarEtapas();
});
