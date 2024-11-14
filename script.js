document.getElementById('calculate').addEventListener('click', function() {
    const func = document.getElementById('function').value;
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    const precision = parseFloat(document.getElementById('precision').value);
    const resultsTable = document.getElementById('results');

    resultsTable.innerHTML = ''; // Limpar resultados anteriores
    // Função para avaliar a função matemática
    function evaluateFunction(x) {
        return eval(func.replace(/x/g, x));
    }

    let iteration = 0;
    let c, fa, fb, fc;

    do {
        fa = evaluateFunction(a);
        fb = evaluateFunction(b);
        c = (a + b) / 2;
        fc = evaluateFunction(c);
        
        // Adicionar a linha de resultados
        const row = `<tr>
            <td>${iteration}</td>
            <td>${a.toFixed(4)}</td>
            <td>${b.toFixed(4)}</td>
            <td>${fa.toFixed(4)}</td>
            <td>${fb.toFixed(4)}</td>
            <td>${c.toFixed(4)}</td>
            <td>${fc.toFixed(4)}</td>
            <td>${(b - a).toFixed(4)}</td>
        </tr>`;
        resultsTable.innerHTML += row;

        // Aplicar o método da bisseção
        if (fa * fc < 0) { 
            b = c;
        } else {
            a = c;
        }

        iteration++;
    } while (Math.abs(b - a) >= precision);

    // Mostrar a última linha da tabela
    resultsTable.innerHTML += `<tr>
        <td>${iteration}</td>
        <td>${a.toFixed(4)}</td>
        <td>${b.toFixed(4)}</td>
        <td>${evaluateFunction(a).toFixed(4)}</td>
        <td>${evaluateFunction(b).toFixed(4)}</td>
        <td>${c.toFixed(4)}</td>
        <td>${fc.toFixed(4)}</td>
        <td>${(b - a).toFixed(4)}</td>
    </tr>`;

    // Exibir resultado final
    const finalResult = document.createElement('div');
    finalResult.innerHTML = `<h2>Resultado Final:</h2><p>X<sub>${iteration}</sub> = ${c.toFixed(4)} => f(X<sub>${iteration}</sub>) = ${fc.toFixed(4)}</p>`;
    document.querySelector('.container').appendChild(finalResult);
});