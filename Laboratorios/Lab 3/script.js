//Problema 1
function esPalindromoDobleBase(numero) {
    // Convierte en base a 10
    let base10String = numero.toString();

    // Aqui verifica si es base 10
    let esPalindromoBase10 = base10String === base10String.split('').reverse().join('');

    // Convierte en base a 2
    let base2String = numero.toString(2);

    // Aqui verifica si es base 2
    let esPalindromoBase2 = base2String === base2String.split('').reverse().join('');

    // Retornara verdadero si es palíndromo en ambas bases, falso de lo contrario
    if (esPalindromoBase10 && esPalindromoBase2) {
        return "Es palíndromo de doble base";
    } else {
        return "No es palíndromo de doble base";
    }
}

document.getElementById('verificarBtn').addEventListener('click', ()=> {
    let numeroInput = document.getElementById('numeroInput').value;
    let resultado = document.getElementById('resultadopalindromo');

    if (numeroInput.trim() === "") {
        resultado.textContent = "Por favor ingrese un número.";
    } else {
        let numero = parseInt(numeroInput);
        if (isNaN(numero)) {
            resultado.textContent = "Por favor ingrese un número válido.";
        } else {
            let esPalindromo = esPalindromoDobleBase(numero);
            resultado.textContent = `¿El número ${numero} es un palíndromo de doble base? ${esPalindromo}`;
        }
    }
});

// Problema 2
function contarCaracteres(cadena) {

    // Cadena a Array
    let caracteres = cadena.split('');
    
    // Creo un objeto para almacenar la cantidad de cada caracter
    let contador = {};

    // Filtro los caracteres y los cuento
    caracteres.filter((caracter) => {
        if (contador[caracter]) {
            contador[caracter]++;
        } else {
            contador[caracter] = 1;
        }
    });

    return contador;
}

function mostrarResultado() {
    let cadenaInput = document.getElementById('cadenaInput').value;
    let resultadoDiv = document.getElementById('resultadoletras');
    let contador = contarCaracteres(cadenaInput);

    // Tabla Html para mostrar el resultado
    let tablaHTML = '<table>';
    tablaHTML += '<tr><th>Carácter</th><th>Cantidad</th></tr>';
    for (let caracter in contador) {
        tablaHTML += `<tr><td>${caracter}</td><td>${contador[caracter]}</td></tr>`;
    }
    tablaHTML += '</table>';

    // Se muestra tabla en el elemento resultadoDiv
    resultadoDiv.innerHTML = tablaHTML;
}

//Problema 3
function esBisiesto(año) {
    //Condicion que verifica si el año es divisible por 4 o 400 pero no por 100
    if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
        return `${año} es un año bisiesto`;
    } else {
        return `${año} no es un año bisiesto`;
    }
}

function verificarBisiesto() {
    let añoInput = document.getElementById('añoInput').value;
    let resultadoParrafo = document.getElementById('resultadoaño');
    let año = parseInt(añoInput);
    
    if (!isNaN(año)) {
        resultadoParrafo.textContent = esBisiesto(año);
    } else {
        resultadoParrafo.textContent = "Por favor, ingrese un año válido.";
    }
}

//Problema 4
// Verifica si un número dado es primo. 
function esPrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}
// Suma todos los números primos debajo del número dado 
function sumatoriaNumerosPrimos(n) {
    let sumatoria = 0;
    for (let i = 2; i < n; i++) {
        if (esPrimo(i)) {
            sumatoria += i;
        }
    }
    return sumatoria;
}

function calcularSumatoria() {
    let numeroInput = document.getElementById('numeroIn').value;
    let resultadoParrafo = document.getElementById('resultadoprimos');
    let numero = parseInt(numeroInput);
    
    if (!isNaN(numero) && numero > 0 && numero < 1000000) {
        resultadoParrafo.textContent = `La sumatoria de los números primos debajo de ${numero} es: ${sumatoriaNumerosPrimos(numero)}`;
    } else {
        resultadoParrafo.textContent = "Por favor, ingrese un número válido (0 < n < 1000000).";
    }
}