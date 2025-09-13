//https://youtu.be/9SbV9lK0raA
let movX = 0;
let img;
let c1, c2, c3;
let efectoTam = true;
let contador = 0;


function preload() {
  img = loadImage('data/foto1.jpg');
}

function setup() {
  createCanvas(800, 400);
  c1 = color(202, 38, 29);
  c2 = color(255, 89, 47);
  c3 = color(255, 193, 55);
}

function draw() {
  if (contador<600) {
    contador++;
    background(0);
    textSize(30);
    fill(255);
    text("R/r para reiniciar", 50, 100);
    text("Mover el mouse en en eje x de la obra para una animacion", 50, 140);
    text("T/t para descativar/activar el efecto del tamaño", 50, 180);
    text("Mover el mouse por la obra para modificar los tamaños", 50, 220);
    text("Hacer click para cambiar colores", 50, 260);
  } else {
    if (mouseDerecha()) {
      movX = 10;
    } else {
      movX = 0;
    }
    background(0);
    dibujar1();
    dibujar2();
    dibujar3();
    dibujar4();
    dibujar5();
    image(img, 0, 0);
  }
}

function mouseDerecha() {
  return mouseX >= 600;
}

function dibujar1() {
  fill(c1);
  noStroke();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ellipse((470 + i * 130), (70 + j * 130), 125, 125);
    }
  }
}

function dibujar2() {
  fill(c2);
  noStroke();
  let tam = 95;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let circulox = 465 + i * 130 + movX;
      let circuloy = 80 + j * 130;
      let d = dist(mouseX, mouseY, circulox, circuloy);
      if (efectoTam) {
        tam = calcularTam(d, 105, 85);
      }
      ellipse(circulox, circuloy, tam, tam);
    }
  }
}

function dibujar3() {
  fill(c3);
  noStroke();
  let tam = 70;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let circulox = 460 + i * 130 + movX * 2;
      let circuloy = 85 + j * 130;
      let d = dist(mouseX, mouseY, circulox, circuloy);
      if (efectoTam) {
        tam = calcularTam(d, 80, 60);
      }
      ellipse(circulox, circuloy, tam, tam);
    }
  }
}

function dibujar4() {
  fill(c2);
  noStroke();
  let tam = 50;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let circulox = 455 + i * 130 + movX * 3;
      let circuloy = 90 + j * 130;
      let d = dist(mouseX, mouseY, circulox, circuloy);
      if (efectoTam) {
        tam = calcularTam(d, 60, 40);
      }
      ellipse(circulox, circuloy, tam, tam);
    }
  }
}

function dibujar5() {
  let tam = 25;
  fill(c3);
  noStroke();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let circulox = 450 + i * 130 + movX * 4;
      let circuloy = 95 + j * 130;
      let d = dist(mouseX, mouseY, circulox, circuloy);
      if (efectoTam) {
        tam = calcularTam(d, 35, 15);
      }
      ellipse(circulox, circuloy, tam, tam);
    }
  }
}

function calcularTam(distancia, tamMax, tamMin) {
  return map(distancia, 0, width, tamMax, tamMin);
}

function activarEfectoTamaño(activar) {
  efectoTam = activar;
}

function mousePressed() {
  c1 = color(random(255), random(255), random(255));
  c2 = color(random(255), random(255), random(255));
  c3 = color(random(255), random(255), random(255));
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    c1 = color(202, 38, 29);
    c2 = color(255, 89, 47);
    c3 = color(255, 193, 55);
    contador = 0;
    fill(255);
  }

  if (key === 't' || key === 'T') {
    activarEfectoTamaño(!efectoTam);
  }
}
