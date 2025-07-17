let frases = [];
let numJugadores = 0;

const inputJugadores = document.getElementById("num-jugadores");
const btnEmpezar = document.getElementById("empezar");
const btnMenos = document.getElementById("btn-menos");
const btnMas = document.getElementById("btn-mas");
const btnSiguiente = document.getElementById("siguiente");

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaResultado = document.getElementById("pantalla-resultado");

const fraseEl = document.getElementById("frase");
const resultadoTexto = document.getElementById("resultado-texto");

const pantallaLogo = document.getElementById("pantalla-logo");
const btnContinuar = document.getElementById("btn-continuar");

btnContinuar.addEventListener("click", () => {
  cambiarPantalla("inicio");
});


let fraseActual = "";

fetch("frases.json")
  .then((res) => res.json())
  .then((data) => {
    frases = data;
  });

  function mostrarFrase() {
    const index = Math.floor(Math.random() * frases.length);
    fraseActual = frases[index];
    fraseEl.textContent = `Yo nunca ${fraseActual}`;
    fraseEl.classList.remove("fadeIn"); // reinicia si ya se aplicó
    void fraseEl.offsetWidth; // fuerza reflow para reiniciar animación
    fraseEl.classList.add("fadeIn");
  }
  

btnEmpezar.addEventListener("click", () => {
  const valor = parseInt(inputJugadores.value);
  if (valor >= 2) {
    numJugadores = valor;
    cambiarPantalla("juego");
    mostrarFrase();
  } else {
    alert("Debe haber al menos 2 jugadores.");
  }
});

function generarResultado() {
    const drinks = Math.floor(Math.random() * 5) + 1; // 1 a 5
    const contarHistoria = Math.random() < 0.5; // 50% de probabilidad
  
    let resultado = `👉 ${drinks} ${drinks === 1 ? "trago" : "tragos"} las que SÍ lo hicieron. `;
  
    if (contarHistoria) {
      resultado += " 😈 Además, debeis contar la historia detrás.";
    } else {
      resultado += " 😇 Esta vez no podeis contar nada.";
    }
  
    return resultado;
  }
  
  btnMenos.addEventListener("click", () => {
    mostrarResultado(generarResultado());
  });
  
  btnMas.addEventListener("click", () => {
    mostrarResultado(generarResultado());
  });
  

btnSiguiente.addEventListener("click", () => {
  cambiarPantalla("juego");
  mostrarFrase();
});

function mostrarFrase() {
  const index = Math.floor(Math.random() * frases.length);
  fraseActual = frases[index];
  fraseEl.textContent = `Yo nunca ${fraseActual}`;
}

function mostrarResultado(texto) {
  cambiarPantalla("resultado");
  resultadoTexto.textContent = texto;
}

function cambiarPantalla(nombre) {
  pantallaInicio.classList.add("hidden");
  pantallaJuego.classList.add("hidden");
  pantallaResultado.classList.add("hidden");

  document.getElementById(`pantalla-${nombre}`).classList.remove("hidden");
}

