export let canvas = document.querySelector('canvas');
export let pincel = canvas.getContext('2d');

export function soporte(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(100,600);
    pincel.lineTo(40,650);
    pincel.lineTo(160,650);
    pincel.fill();
    pincel.fillRect(95,205,10,400);
    pincel.fillRect(95,205,200,10);
    pincel.fillRect(295,205,10,50);
}

export function cabeza(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.arc(300,295,40,0,2*3.14);
    pincel.fill();
}

export function cuerpo(){
    pincel.fillStyle = "black"
    pincel.fillRect(295,275,10,190);
}

export function brazoIzquierdo(){
    pincel.fillStyle= 'black';
    pincel.beginPath();
    pincel.moveTo(295,355);
    pincel.lineTo(220,325);
    pincel.lineTo(220,335);
    pincel.lineTo(295,365);
    pincel.fill();
}

export function brazoDerecho(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(305,355);
    pincel.lineTo(380,325);
    pincel.lineTo(380,335);
    pincel.lineTo(305,365);
    pincel.fill();
}

export function piernaIzquierda(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(295,455);
    pincel.lineTo(210,505);
    pincel.lineTo(210,515);
    pincel.lineTo(295,465);
    pincel.fill();
}

export function piernaDerecha(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(305,455);
    pincel.lineTo(390,505);
    pincel.lineTo(390,515);
    pincel.lineTo(305,465);
    pincel.fill();
}
