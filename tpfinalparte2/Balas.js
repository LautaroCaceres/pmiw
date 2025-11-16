class Balas {
  constructor(x, y, vel) {
    this.Sprite = sprite[2];
    this.PosX = x;
    this.PosY = y;
    this.Velocidad = vel;
    this.Impacto = sonido[2];
  }

  actualizar() {
    this.PosY -= this.Velocidad;
  }

  dibujar() {
   image(this.Sprite, this.PosX - 5, this.PosY - 10, 10, 20);
  }
}
