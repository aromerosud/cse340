// What are the differences between var, let, and const in JavaScript?

// var tiene alcance de función (function-scoped) y puede ser redeclarada y actualizada. 
// Es elevada (hoisted), lo que significa que puede usarse antes de su declaración, pero tendrá el valor undefined hasta que se le asigne uno.
var name; // Se puede actualizar y llamar desde cualquier ambito.

// let tiene alcance de bloque (block-scoped), puede ser actualizada pero no redeclarada dentro del mismo ámbito, y no se eleva de la misma manera que var.
let name2; // Se puede actualizar pero solo dentro de su bloque.

// const también tiene alcance de bloque, no puede ser actualizada ni redeclarada, y debe inicializarse en el momento de su declaración.
const name3; // No se puede actualizar

const add = (a, b) => a + b;

const resta = (a, b) => {
    return a - b;
}

const myFunction = () => {
    // function body;
}

export {add};
export {resta};
export {myFunction};

import {add} from '.path/to/module.js';
import {resta} from '.path/to/module.js';
import {myFunction} from '.path/to/module.js';

/*
Los template literals son literales de cadena que permiten incluir expresiones incrustadas y cadenas de múltiples líneas. 
Están delimitados por comillas invertidas (`) en lugar de comillas simples o dobles.

Los template literals pueden incluir marcadores de posición para variables o expresiones usando la sintaxis ${}.

Esto se diferencia de las cadenas normales, que requieren concatenación usando el operador + y no soportan múltiples líneas sin usar caracteres especiales.
*/

/*
Las Promises son objetos que representan la finalización (o el fallo) eventual de una operación asíncrona y su valor resultante. 
Utilizan los métodos .then() y .catch() para manejar los casos de éxito y error.

Async/Await es una sintaxis más simple (syntactic sugar) construida sobre las Promises, que permite escribir código asíncrono 
de una manera más similar a código síncrono. La palabra clave async se usa para declarar una función como asíncrona, y await se
usa para pausar la ejecución hasta que una Promise se resuelva o sea rechazada, haciendo el código más fácil de leer y mantener.
 */



