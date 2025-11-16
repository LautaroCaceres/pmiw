class Jugador {
  constructor() {
    this.Sprite = sprite[1];
    this.PosX = width / 2;
    this.PosY = height - 60;
    this.Velocidad = 5;
    this.Ataque = sonido[1];
    this.Balas = [];
    this.movIzq = false;
    this.movDer = false;
  }

  mover() {
    if (this.movIzq) this.PosX -= this.Velocidad;
    if (this.movDer) this.PosX += this.Velocidad;


    this.PosX = constrain(this.PosX, 20, width - 20);
  }

  disparar() {
    let bala = new Balas(this.PosX, this.PosY - 30, 7);
    this.Balas.push(bala);
    if (this.Ataque) this.Ataque.play();
  }

  actualizar() {
    this.mover();
    for (let i = this.Balas.length - 1; i >= 0; i--) {
      let b = this.Balas[i];
      b.actualizar();
      b.dibujar();

      if (b.PosY < 0) this.Balas.splice(i, 1);
    }

    this.dibujar();
  }

  dibujar() {
    image(this.Sprite, this.PosX - 25, this.PosY - 25, 50, 50);
  }
}
