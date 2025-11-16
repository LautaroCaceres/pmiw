// https://youtu.be/Upf4ZBdmB-g
let juego;
let sprite = [];
let sonido = [];
let foto = [];


function preload() {
 for (let i = 1; i <= 4; i++) {
    sprite[i] = loadImage('data/sprite' + i + '.png');
 }
soundFormats('mp3', 'ogg');
for (let i = 1; i <= 4; i++) {
   
    sonido[i] = loadSound('data/sonido' + i + '.mp3');
  }
  
   for (let i = 1; i <= 3; i++) {
    foto[i] = loadImage('data/foto' + i + '.jpg');
 }
}


function setup() {
  createCanvas(640, 480);
  juego = new GameManager();
}

function draw() {
  background(0);
  juego.actualizar();
}

function keyPressed() {
  juego.keyPressed();
}

function keyReleased() {
  juego.keyReleased();
}
