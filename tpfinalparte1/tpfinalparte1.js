//https://youtu.be/ukl8zddp7h0
let textos = [];
let imagenes = []; 
let sonidos = [];
let pantallaActual = 1;

function setup() {
  createCanvas(640, 480);
  textAlign(LEFT, TOP);
  textSize(20);
}

function preload() {
  for (let i = 1; i <= 20; i++) {
    imagenes[i] = loadImage('data/foto' + i + '.jpg');
  }
  textos = loadStrings('data/texto.txt');
  for (let i = 1; i <= 2; i++) {
    soundFormats('mp3', 'ogg');
    sonidos[i] = loadSound('data/sonido' + i + '.mp3');
  }
}

function draw() {
  background(0);
  mostrarPantalla(pantallaActual);
}

function mostrarPantalla(n) {
  if (esFinal(n)) {
    mostrarFinal(n); 
  } else if (esCreditos(n)) {
    mostrarCreditos(); 
  } else {
    mostrarNormal(n);
  }
}

function esFinal(n) {
  return n == 16 || n == 17 || n == 18;
}

function mostrarFinal(n) {
  image(imagenes[n], 0, 0, width, height);
  fill(0, 150);
  rect(30, height - 220, width - 60, 130, 20);
  fill(255);
  text(textos[n], 50, height - 210, width - 100, 120);
  botonCreditos();
}

function botonCreditos() {
  fill(200);
  rect(width / 2 - 100, height - 60, 200, 40, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Avanzar a créditos", width / 2, height - 40);
  textAlign(LEFT, TOP);
}

function esCreditos(n) {
  return n == 20;
}

function mostrarCreditos() {
  image(imagenes[20], 0, 0, width, height);
  fill(0, 150);
  rect(30, height - 220, width - 60, 130, 20);
  fill(255);
  text(textos[20], 50, height - 210, width - 100, 120);
  mostrarBotonReiniciar(); 
}

function mostrarBotonReiniciar() {
  fill(200);
  rect(width / 2 - 80, height - 60, 160, 40, 10); 
  fill(0);
  textAlign(CENTER, CENTER);
  text("Empezar de nuevo", width / 2, height - 40); 
  textAlign(LEFT, TOP);
}

function mostrarNormal(n) {
  image(imagenes[n], 0, 0, width, height);
  fill(0, 150);
  rect(30, height - 220, width - 60, 130, 20);
  fill(255);
  text(textos[n], 50, height - 210, width - 100, 120);
  
  if (esDecision(n)) {
    mostrarDosOpciones(); 
  } else {
    mostrarBotonAvanzar(); 
  }
}

function esDecision(n) {
  return n == 4 || n == 7 || n == 9 || n == 11 || n == 12 || n == 14;
}

function mostrarDosOpciones() {
  fill(200);
  rect(width / 2 - 150, height - 100, 100, 40, 10);
  rect(width / 2 + 50, height - 100, 100, 40, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Opción A", width / 2 - 100, height - 80);
  text("Opción B", width / 2 + 100, height - 80);
  textAlign(LEFT, TOP);
}

function mostrarBotonAvanzar() {
  fill(200);
  rect(width / 2 - 60, height - 60, 120, 40, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Avanzar", width / 2, height - 40);
  textAlign(LEFT, TOP);
}

function mousePressed() {
  if (esFinal(pantallaActual)) {
    avanzarCreditos();
  } 
  else if (esCreditos(pantallaActual)) {
    reiniciarFinal();
  }
  else if (esDecision(pantallaActual)) {
    avanzarDecision();
  } 
  else {
    avanzarNormal();
  }
}



function avanzarCreditos() {
  if (sobreRect(width / 2 - 100, height - 60, 200, 40)) {
    reproducirClick(1);
    pantallaActual = 20; 
  }
}

function avanzarDecision() {
  if (sobreRect(width / 2 - 150, height - 100, 100, 40)) {
    reproducirClick(1);
    pantallaActual = obtenerOpcionA(pantallaActual);
  } else if (sobreRect(width / 2 + 50, height - 100, 100, 40)) {
    reproducirClick(2);
    pantallaActual = obtenerOpcionB(pantallaActual);
  }
}

function avanzarNormal() {
  if (sobreRect(width / 2 - 60, height - 60, 120, 40)) {
    reproducirClick(1);
    pantallaActual++;
  }
}

function reiniciarFinal() {
  if (sobreRect(width / 2 - 80, height - 60, 160, 40)) {
    reproducirClick(1);
    pantallaActual = 1;
  }
}



function obtenerOpcionA(n) {
  if (n == 4) return 5;
  if (n == 7) return 8;
  if (n == 9) return 10;
  if (n == 11) return 18;
  if (n == 12) return 18;
  if (n == 14) return 15;
}

function obtenerOpcionB(n) {
  if (n == 4) return 17;
  if (n == 7) return 17;
  if (n == 9) return 11;
  if (n == 11) return 13;
  if (n == 12) return 13;
  if (n == 14) return 17;
}

function sobreRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}



function reproducirClick(i) {
  if (sonidos[i] && !sonidos[i].isPlaying()) {
    sonidos[i].play();
  }
}
