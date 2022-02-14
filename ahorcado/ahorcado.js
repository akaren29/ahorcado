import { pincel,canvas,soporte,cabeza,cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda,piernaDerecha } from '../canvas/canvas.js'
let palabrasSecretas = ['JAVASCRIPT','HTML','CSS','REACT','PHP','CONSOLA','JUGO','VERDAD','SABOR','RELOJ','SOMBRA','SOMBRILLA','ESCOBA','JAVA','PENSAMIENTO','ESTRUCTURA','ALGORITMO','SOCIEDAD','PROGRAMACION','LENGUAJE'];
let btnJugar = document.querySelector('#btnJuego');
let btnReiniciar = document.querySelector('#reiniciar');
let btnAgregarPalabra = document.querySelector('#btnAgregar');
let inputAgregar = document.querySelector('#inputAgregar');


let juegoIniciado = false;
let palabraSorteada; //elegira la palabra sorteada en el array
let palabraSeparada; // separa la palabra con espacios
let indices= []; 
let arrayLetraIngresada = [];
let letrasUnicas = [];
let arrayPalabra;
let letrasIncorrectas = [];
let letrasCorrectas = [];


function elegirPalabraAlAzar(){
    palabraSorteada = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];//elige palabra
}

function arrayPalabraSeparada(){
    palabraSeparada = palabraSorteada.split('');
    arrayPalabra = palabraSeparada;
    console.log(palabraSeparada);
}

function omitirLetrasRepetidas(){
    for(let i=0; i < palabraSorteada.length; i++){
        if(!letrasUnicas.includes(palabraSorteada[i])){
            letrasUnicas.push(palabraSorteada[i])
        }
    }
}

function dibujarGuiones(){
    let inicioX = 650;
    let inicioY = 610;
    for(let i=0; i < palabraSorteada.length; i++){
      pincel.fillStyle = 'black';
      pincel.fillRect(inicioX + (40*[i]), inicioY, 30, 7);
    }
 }

function dibujarLetras(arrOrden){
    let inicioX= 655;
    let inicioY = 600;
        for(let i=0; i < arrOrden.length; i++){
            pincel.fillStyle = "#755c48";
            pincel.font = "35px Indie Flower bolder";
            pincel.fillText(arrayLetraIngresada[0], inicioX + (40 * arrOrden[i]), inicioY)
        }
        indices = [];
}


function iniciarJuego(){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    soporte()
    elegirPalabraAlAzar()
    dibujarGuiones()
    omitirLetrasRepetidas()
    arrayPalabraSeparada(palabraSorteada);
    juegoIniciado = true;
    arrayLetraIngresada = [];
    letrasCorrectas = [];
    letrasIncorrectas = [];
}

function buscarIndices(){
    if(juegoIniciado){
        let indiceBuscado = arrayPalabra.indexOf(arrayLetraIngresada[0]);
        while(indiceBuscado != -1){
            indices.push(indiceBuscado);
            indiceBuscado = arrayPalabra.indexOf(arrayLetraIngresada[0], indiceBuscado +1 )
        }
    }
}

btnJugar.addEventListener('click', iniciarJuego);

document.addEventListener('keyup',(event)=>{
    arrayLetraIngresada = [];
    let letra = event.key.toUpperCase();
    let codigo = letra.charCodeAt();
    if(juegoIniciado){
        if(codigo>64 && codigo<91){
            arrayLetraIngresada.push(letra);
            buscarIndices();
            dibujarLetras(indices)
            let comparar = letrasIncorrectas.length;
            if(arrayPalabra.includes(letra)){
                if(!letrasCorrectas.includes(letra)){
                    letrasCorrectas.push(letra)
                }
            }else if(!letrasIncorrectas.includes(letra)){
                letrasIncorrectas.push(letra)
            }
            if(comparar < letrasIncorrectas.length){
                dibujarLetrasIncorrectas(letrasIncorrectas)
            }
            dibujarAhorcado();
        }
        ganador();
        perdedor();
    }
});

function dibujarLetrasIncorrectas(letrasIncorrectas){
    let inicioX = 400;
    let inicioY = 200;
    pincel.fillStyle = "black";
    pincel.font = "25px Georgia";
    pincel.fillText(`Letras incorrectas ingresadas: ${letrasIncorrectas.toString()}`,inicioX, inicioY)
}

function ganador(){
    let palabraOriginal = letrasUnicas.sort().toString();
    let letrasCorrectasIngresadas = letrasCorrectas.sort().toString();
    if(palabraOriginal === letrasCorrectasIngresadas){
        pincel.fillStyle= "#6a5d4d";
        pincel.lineWidth = 4.0;
        pincel.font = "70px Indie Flower";
        pincel.strokeStyle = "Black";
        pincel.strokeText(`¡Felicidades Ganaste!`, 550, 400);
        pincel.fillText(`¡Felicidades Ganaste!`, 550, 400);
        juegoIniciado = false;
        letrasUnicas = [];
        btnReiniciar.style.display = 'block';
    }
}

function perdedor(){
    if(letrasIncorrectas.length > 5){
        pincel.fillStyle = "red";
        pincel.lineWidth = 4.0;
        pincel.font = "70px Indie Flower";
        pincel.strokeStyle = "Black";
        pincel.strokeText(`¡Perdiste!`, 550, 400);
        pincel.fillText(`¡Perdiste!`, 550, 400);
        palabraCorrectaMensaje()
        letrasUnicas=[];
        btnReiniciar.style.display = 'block';
    }
}

function palabraCorrectaMensaje(){
    pincel.fillStyle = 'black';
    pincel.font = '25px Georgia bolder';
    pincel.fillText(`La palabra correcta era: ${palabraSorteada}`, 550, 450); 
}

function dibujarAhorcado(){
    let contador = letrasIncorrectas.length;
    if(contador === 1){
        cabeza();
    }else if(contador === 2){
        cuerpo();
    }else if(contador === 3){
        brazoIzquierdo();
    }else if(contador === 4){
        brazoDerecho();
    }else if(contador === 5){
        piernaIzquierda();
    }else if( contador === 6){
        piernaDerecha();
    }
}

btnReiniciar.addEventListener('click', ()=>{
    iniciarJuego()
    btnReiniciar.style.display = 'none';
})

btnAgregarPalabra.addEventListener('click', (e)=>{
    e.preventDefault();
    palabrasSecretas.push(inputAgregar.value.toUpperCase());
    inputAgregar.value = '';
    inputAgregar.focus();
    mensajeDeAgregado()
})

function mensajeDeAgregado(){
    let p= document.createElement('p');
    p.innerText = 'Se agrego palabra';
    p.classList.add('mensajeDeAgregado');
    btnAgregar.appendChild(p);

    setTimeout(() => {
        p.remove()
        console.log('se elimino');
    }, 1500);
}