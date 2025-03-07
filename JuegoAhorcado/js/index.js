/* Desarrollar un código en javascript que permita jugar al ahorcado. 
El usuario debe adivinar una palabra de 5 letras.
El usuario tiene 6 oportunidades para adivinar la palabra.
Si el usuario adivina la palabra, se muestra un mensaje de felicitaciones.
Si el usuario se queda sin oportunidades, se muestra un mensaje de derrota.
El usuario puede jugar de nuevo.
*/

let listaPalabras = ["perro", "gato", "elefante", "jirafa", "mono","gallina","tigre","oso","leon","serpiente"];
let palabraSecreta;
let intentosRestantes = 6;
let letrasUsadas = [];
let letrasAcertadas = [];
let juegoTerminado = false; // Variable para controlar si el juego ha terminado
document.getElementById("jugar").disabled = false;
document.getElementById("validar").disabled = true;
document.getElementById("reiniciar").disabled = true;

//Función para obtener la palabra segun los aciertos del usuario
function obtenerPalabra() {
    let palabra = "";
    
    for(let i = 0; i < palabraSecreta.length; i++){
        if(letrasAcertadas.includes(palabraSecreta[i])){
            palabra += palabraSecreta[i] + " ";
        } else {
            palabra += "_ ";
        }
    }
    
    return palabra;
}

//Función para iniciar el juego
function jugar() {
    intentosRestantes = 6;
    letrasUsadas = [];
    letrasAcertadas = [];
    juegoTerminado = false; // Reiniciar el estado del juego
    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    document.getElementById("intentosRestantes").textContent = intentosRestantes;
    document.getElementById("letrasUsadas").textContent = letrasUsadas.join(", ");
    document.getElementById("palabra").textContent = obtenerPalabra();
    document.getElementById("jugar").disabled = true;
    document.getElementById("validar").disabled = false;
    document.getElementById("reiniciar").disabled = false;
    document.getElementById("letra").value = "";
    document.getElementById("letra").focus();
    
}   

//Función para reiniciar el juego
function reiniciar() {
    juegoTerminado = false; // Reiniciar el estado del juego
    document.getElementById("jugar").disabled = false;
    document.getElementById("validar").disabled = true;
    document.getElementById("reiniciar").disabled = true;
    document.getElementById("palabra").textContent = "";
    document.getElementById("letrasUsadas").textContent = "";
    document.getElementById("intentosRestantes").textContent = "6";
    document.getElementById("letra").value = "";
    
}

//Función para validar la letra ingresada por el usuario
function validarLetra() {
    // Verificar si el juego ya terminó
    if (juegoTerminado) {
        return;
    }
    
    let letra = document.getElementById("letra").value.toLowerCase();
    
    // Validar que se haya ingresado una letra
    if (letra === "" || !letra.match(/[a-z]/i)) {
        alert("Por favor, ingresa una letra válida");
        document.getElementById("letra").value = "";
        document.getElementById("letra").focus();
        return;
    }
    
    if (letrasUsadas.includes(letra)) {
        alert("La letra ya ha sido usada");
    } else {
        letrasUsadas.push(letra);
        document.getElementById("letrasUsadas").textContent = letrasUsadas.join(", ");
        
        if (palabraSecreta.includes(letra)) {
            // La letra está en la palabra
            letrasAcertadas.push(letra);
            document.getElementById("palabra").textContent = obtenerPalabra();
            
            // Verificar si el usuario ha ganado
            if (!obtenerPalabra().includes("_")) {
                juegoTerminado = true; // Marcar el juego como terminado
                alert("¡Felicidades! Has adivinado la palabra: " + palabraSecreta);
                document.getElementById("validar").disabled = true;
                setTimeout(reiniciar, 2000); // Reinicia después de 2 segundos
            }
        } else {
            // La letra no está en la palabra
            intentosRestantes--;
            
            // Asegurarse de que los intentos no sean negativos
            intentosRestantes = Math.max(0, intentosRestantes);
            document.getElementById("intentosRestantes").textContent = intentosRestantes;
            
            // Actualizar dibujo del ahorcado
            actualizarDibujoAhorcado(6 - intentosRestantes);
            
            // Verificar si el usuario ha perdido
            if (intentosRestantes = 0) {
                juegoTerminado = true; // Marcar el juego como terminado
                document.getElementById("palabra").textContent = palabraSecreta;
                document.getElementById("validar").disabled = true;
                alert("¡Juego terminado! La palabra era: " + palabraSecreta);
                setTimeout(reiniciar, 2000); // Reinicia después de 2 segundos
            }
        }
    }
    
    document.getElementById("letra").value = "";
    document.getElementById("letra").focus();
}

// Función para manejar tecla Enter en el input
document.getElementById("letra").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !document.getElementById("validar").disabled && !juegoTerminado) {
        validarLetra();
    }
});

//Agregar el evento click al los botones
document.getElementById("jugar").addEventListener("click", jugar);
document.getElementById("validar").addEventListener("click", validarLetra);
document.getElementById("reiniciar").addEventListener("click", reiniciar);

