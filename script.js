```javascript
const campoNumeros = document.getElementById("numeros");
const campoAlgoritmo = document.getElementById("algoritmo");
const campoOrdem = document.getElementById("ordem");

const botaoOrdenar = document.getElementById("ordenar");
const botaoLimpar = document.getElementById("limpar");

const mensagem = document.getElementById("mensagem");
const listaOriginal = document.getElementById("original");
const listaResultado = document.getElementById("resultado");
const campoComparacoes = document.getElementById("comparacoes");
const campoTrocas = document.getElementById("trocas");
const campoNomeAlgoritmo = document.getElementById("nome-algoritmo");
const campoEtapas = document.getElementById("etapas");

function lerNumeros(texto) {
    const entrada = texto.trim();

    if (entrada === "") {
        throw new Error("Digite pelo menos um número.");
    }

    const partes = entrada.split(/[,\s;]+/).filter(Boolean);

    if (partes.length > 100) {
        throw new Error("Digite no máximo 100 números por vez.");
    }

    const numeros = partes.map(function(parte) {
        if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(parte)) {
            throw new Error('O valor "' + parte + '" não é um número válido.');
        }

        const numero = Number(parte);

        if (!Number.isFinite(numero)) {
            throw new Error("Todos os valores precisam ser números finitos.");
        }

        return numero;
    });

    return numeros;
}

function precisaTrocar(a, b, ordem) {
    if (ordem === "asc") {
        return a > b;
    }

    return a < b;
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
                numeros[i] = b;
                numeros[i + 1] = a;
                trocas++;
                houveTroca = true;

                etapas.push(
                    "Troca: " + a + " e " + b +
                    ". Sequência: " + numeros.join(", ")
                );
            } else {
                etapas.push(
                    "Comparação: " + a + " e " + b +
                    ". Não foi necessário trocar."
                );
            }
        }

        if (!houveTroca) {
            break;
        }
    }

    return {
        numeros,
        etapas,
        comparacoes,
        trocas
    };
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
                "Comparação: " + numeros[escolhido] +
                " com " + numeros[j] + "."
            );

            const melhor = ordem === "asc"
                ? numeros[j] < numeros[escolhido]
                : numeros[j] > numeros[escolhido];

            if (melhor) {
                escolhido = j;
            }
        }

        if (escolhido !== i) {
            const temporario = numeros[i];
            numeros[i] = numeros[escolhido];
            numeros[escolhido] = temporario;
            trocas++;

            etapas.push(
                "Troca: colocou " + numeros[i] +
                " na posição " + (i + 1) +
                ". Sequência: " + numeros.join(", ")
            );
        } else {
            etapas.push(
                numeros[i] + " já estava na posição correta."
            );
        }
    }

    return {
        numeros,
        etapas,
        comparacoes,
        trocas
    };
}

function mostrarNumeros(elemento, numeros) {
    elemento.replaceChildren();

    numeros.forEach(function(numero) {
        const etiqueta = document.createElement("span");
        etiqueta.className = "numero";
        etiqueta.textContent = String(numero);
        elemento.appendChild(etiqueta);
    });
}

function mostrarEtapas(etapas) {
    campoEtapas.replaceChildren();

    if (etapas.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma comparação foi necessária.";
        campoEtapas.appendChild(item);
        return;
    }

    etapas.forEach(function(etapa) {
        const item = document.createElement("li");
        item.textContent = etapa;
        campoEtapas.appendChild(item);
    });
}

botaoOrdenar.addEventListener("click", function() {
    mensagem.textContent = "";

    try {
        const numeros = lerNumeros(campoNumeros.value);
        const ordem = campoOrdem.value;
        const algoritmo = campoAlgoritmo.value;

        let resultado;

        if (algoritmo === "bubble") {
            resultado = bubbleSort(numeros, ordem);
            campoNomeAlgoritmo.textContent = "Bubble Sort";
        } else {
            resultado = selectionSort(numeros, ordem);
            campoNomeAlgoritmo.textContent = "Selection Sort";
        }

        mostrarNumeros(listaOriginal, numeros);
        mostrarNumeros(listaResultado, resultado.numeros);
        mostrarEtapas(resultado.etapas);

        campoComparacoes.textContent = resultado.comparacoes;
        campoTrocas.textContent = resultado.trocas;
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

botaoLimpar.addEventListener("click", function() {
    campoNumeros.value = "";
    mensagem.textContent = "";

    listaOriginal.textContent = "Aguardando números...";
    listaResultado.textContent = "O resultado aparecerá aqui.";

    campoComparacoes.textContent = "0";
    campoTrocas.textContent = "0";
    campoNomeAlgoritmo.textContent = "—";

    campoEtapas.replaceChildren();

    const item = document.createElement("li");
    item.textContent = "Digite números e clique em Ordenar.";
    campoEtapas.appendChild(item);
});
```
