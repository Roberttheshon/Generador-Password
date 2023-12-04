const textPw = document.querySelector("#pw-text");
const displaySize = document.querySelector(".display-pw-size span");
const btnGenerarte = document.querySelector(".generate");
const clipboard = document.querySelector(".password a");

const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";  //26
const numbers = "0123456789"; //10
const symbols = "!@#$%^&*()_+="; //13


let passwordAll= "";

function showVal(value){  //Funcion que se aciva cada vez que cambiamos el input, esto modificara el numero que aparece en pantalla
    console.log(value);
    displaySize.textContent = value;
}

addEventListeners();   //llamamos a la funcion para activar el evento del boton
function addEventListeners(){
    btnGenerarte.addEventListener("click", generatePw);
    
    clipboard.addEventListener("click", copyPw);
}

function copyPw(e){
    e.preventDefault(); // Evita el comportamiento predeterminado del evento (en este caso, evitará que se ejecute un evento de clic normal)

    const password = textPw.textContent; 
    
    if (password){
        const textArea = document.createElement('textarea');
        textArea.value = password;
        
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        
        // Elimina el 'textarea' del DOM.
        textArea.remove();
    }
}

function generatePw(e) {
    // Inicializar la variable passwordAll
    passwordAll = "";

    // Condicional para asignar minimo un caracter de cada tipo si este esta chequeado
    if (upper.checked) {
        passwordAll += getUpperCase();
    }
    if (lower.checked) { 
        passwordAll += getLowerLeters();
    }
    if (number.checked) { 
        passwordAll += getNumbers();
    }
    if (symbol.checked) {
        passwordAll += getSymbols();
    }

    if (upper.checked || lower.checked || number.checked || symbol.checked){
        completePw();
    }

}
function completePw(){  // funcion donde asignamos una pocision a cada caracter 
    //y asi colocarle un lugar aleatorio en caso de que la contrasena sea larga, consideremos que el max de textcontent es 20
    while (passwordAll.length < parseInt(displaySize.textContent)){
       const numbeR = getRandom();
       
        if (upper.checked && numbeR === 0) {
            passwordAll += getUpperCase();
        }
        if (lower.checked && numbeR === 1) { 
            passwordAll += getLowerLeters();
        }
        if (number.checked && numbeR === 2) { 
            passwordAll += getNumbers();
        }
        if (symbol.checked && numbeR === 3) {
            passwordAll += getSymbols();
        }
    }
    textPw.innerHTML = passwordAll;
}

function getRandomNumber (max){  //Funcion para seleccionar un caracter aleatoreo de la lista
    return Math.floor(Math.random() * max)
}


function getRandom(){ //funcion que nos devolvera numeros aleatoreos de los tipos de caracter (4)
    return Math.floor(Math.random() * 4)
}



function getUpperCase(){
   return upperLetters[getRandomNumber(upperLetters.length)];
} 
function getLowerLeters(){
    return lowerLetters[getRandomNumber(lowerLetters.length)];
 } 
 function getNumbers(){
    return numbers[getRandomNumber(numbers.length)];
 } 
 function getSymbols(){
    return symbols[getRandomNumber(symbols.length)];
 }