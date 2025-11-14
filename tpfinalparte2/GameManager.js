class GameManager {
  constructor() {
    this.Jugador = new Jugador();
    this.Enemigos = [];
    this.Vidas = 10;
    this.CantEnemigos = 51;
    this.EnemigosMuertos = 0;
    this.Estado = 1; // 1: menú, 2: tutorial, 3: juego, 4: créditos, 5: victoria, 6: derrota
    this.Escenario = foto[1];
    this.spawnEnemigos();
  }

  spawnEnemigos() {
    for (let i = 0; i < this.CantEnemigos - 1; i++) {
      let x = random(50, width - 50);
      let y = random(-1500, -50);
      let vel = random(1, 2); // más lento
      let vida = 1; // entre 2 y 3
      this.Enemigos.push(new Enemigo(x, y, vida, vel, false));
    }
    // Boss al final
    this.Enemigos.push(new Enemigo(width / 2, -2000, 15, 1.5, true));
  }

  actualizar() {
    if (this.Estado === 3) this.juego();
    else if (this.Estado === 1) this.menu();
    else if (this.Estado === 2) this.tutorial();
    else if (this.Estado === 4) this.creditos();
    else if (this.Estado === 5) this.victoria();
    else if (this.Estado === 6) this.derrota();
  }

  menu() {
    background(20);
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Dispara al ogro", width / 2, height / 2 - 50);
    textSize(20);
    text("Presiona ENTER para jugar", width / 2, height / 2);
  }

  tutorial() {
    background(foto[3] || 30);
    textAlign(CENTER);
    fill(255);
    text("Mueve con ← → y dispara con ESPACIO", width / 2, height / 2);
    text("Presiona ENTER para comenzar", width / 2, height / 2 + 40);
  }

  creditos() {
    background(foto[2] || 50);
    textAlign(CENTER);
    fill(255);
    textSize(28);
    text("Créditos", width / 2, height / 2 - 100);
    textSize(20);
    text("Juego hecho por Lautaro Caceres y Maximo Maldonado ", width / 2, height / 2);
    text("Presiona ENTER para volver al menú", width / 2, height / 2 + 100);
  }

  juego() {
    background(foto[1] || 0);

    // Mostrar vidas y tiempo
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Vidas: " + this.Vidas, 20, 30);

    // Actualizar jugador
    this.Jugador.actualizar();

    // Actualizar enemigos
    for (let i = this.Enemigos.length - 1; i >= 0; i--) {
      let e = this.Enemigos[i];
      e.actualizar();
      e.dibujar();

      // Si llega al final => pierde vida
      if (e.PosY > height) {
        this.Enemigos.splice(i, 1);
        this.Vidas--;
        if (this.Vidas <= 0) this.Estado = 6; // Derrota
        continue;
      }

      // Colisión bala-enemigo
      for (let j = this.Jugador.Balas.length - 1; j >= 0; j--) {
        let b = this.Jugador.Balas[j];
        if (dist(b.PosX, b.PosY, e.PosX, e.PosY) < (e.EsBoss ? 50 : 25)) {
          e.Vida--;
          this.Jugador.Balas.splice(j, 1);
          if (e.Vida <= 0) {
            if (e.SonidoMorir) e.SonidoMorir.play();
            if (e.EsBoss) {
              this.Estado = 5; // Victoria
            }
            this.Enemigos.splice(i, 1);
            this.EnemigosMuertos++;
            break;
          }
        }
      }
    }

  }

  victoria() {
    background(0, 200, 100);
    textAlign(CENTER);
    fill(255);
    textSize(40);
    text("¡Victoria!", width / 2, height / 2);
    textSize(20);
    text("Presiona ENTER para créditos", width / 2, height / 2 + 50);
  }

  derrota() {
    background(200, 0, 0);
    textAlign(CENTER);
    fill(255);
    textSize(40);
    text("Derrota", width / 2, height / 2);
    textSize(20);
    text("Presiona ENTER para créditos", width / 2, height / 2 + 50);
  }

  keyPressed() {
  if (keyCode === ENTER) {
    if (this.Estado === 1) this.Estado = 2;      // Menú → Tutorial
    else if (this.Estado === 2) this.Estado = 3; // Tutorial → Juego
    else if (this.Estado === 5 || this.Estado === 6) this.Estado = 4; // Fin → Créditos
    else if (this.Estado === 4) this.reiniciar(); // Créditos → Reiniciar juego
  }

  if (this.Estado === 3) {
    if (keyCode === LEFT_ARROW) this.Jugador.movIzq = true;
    if (keyCode === RIGHT_ARROW) this.Jugador.movDer = true;
    if (key === ' ') this.Jugador.disparar();
  }
}
  keyReleased() {
    if (this.Estado === 3) {
      if (keyCode === LEFT_ARROW) this.Jugador.movIzq = false;
      if (keyCode === RIGHT_ARROW) this.Jugador.movDer = false;
    }
  }

  reiniciar() {
  // Volver al menú principal
  this.Estado = 1;

  // Reiniciar variables de juego
  this.Jugador = new Jugador();
  this.Enemigos = [];
  this.Vidas = 10;
  this.CantEnemigos = 51;
  this.EnemigosMuertos = 0;
  this.spawnEnemigos();
  this.Escenario = foto[1];
}
}
