console.log('Esta funcionando')

// Problema 2

    // variables
    var variable1 = 10;
    var variable2 = 5;
    
    var suma = variable1 + variable2;
    var resta = variable1 - variable2;
    var multiplicacion = variable1 * variable2;
    var division = variable1 / variable2;
    
    // Mensaje
 var mensaje = "Suma: " + suma + "<br>" +
               "Resta: " + resta + "<br>" +
               "Multiplicación: " + multiplicacion + "<br>" +
               "División: " + division;
    
// Mostrar con id
document.getElementById("resultado1").innerHTML = mensaje;

//Problema 3

 // let
 let variableA = "tortilla";
 let variableB = "con ketchup";

 // Concatenación
 let concatenacion = variableA + " " + variableB;

 // Mostrar con id
    document.getElementById("concatenacion").innerHTML = "Concatenación: " + concatenacion;

//Problema 4

// variables
const variable3 = 14;
const variable4 = "SalsaDePepinillo";

// Obtener el tipo de datos de las variables
const tipoVariable3 = typeof variable3;
const tipoVariable4 = typeof variable4;

// Mostrar con id
document.getElementById("tipodedato").innerHTML = "El tipo de dato de variable3 es: " + tipoVariable3 + "<br>" +
                                                  "El tipo de dato de variable4 es: " + tipoVariable4;

//Problema 5

 // Declaración de variable tipo objeto
 var miObjeto = {
    numero: 9,
    cadena: "Mostaza",
    booleano: true,
    objetoVacio: {}
  };

  // Convierte en un objeto json
  var objetoJSON = JSON.stringify(miObjeto, null, 2);

  // Muestra la cadena JSON por id
  document.getElementById("objeto").innerText = objetoJSON;

//Problema 6

function sumaMultiplos(numero) {
    let suma = 0;
    for (let i = 1; i < numero; i++) {
      if (i % 3 === 0 || i % 5 === 0) {
        suma += i;
      }
    }
    return suma;
  }

  // Ejemplo que uso el prof
  let resultado = sumaMultiplos(10);

  // Mostrar por id
  document.getElementById("numero").innerText = "La suma de los múltiplos de 3 o 5 menores que 10 es: " + resultado;

