class Enemigo {
  constructor(x, y, vida, vel, esBoss = false) {
    this.PosX = x;
    this.PosY = y;
    this.Vida = vida;
    this.Velocidad = vel;
    this.SonidoMorir = sonido[3];
    this.EsBoss = esBoss;
    if (esBoss) {
      this.Sprite = sprite[4];  
    } else {
      this.Sprite = sprite[3];  
    }
  }

  actualizar() {
    this.PosY += this.Velocidad;
  }

  dibujar() {
    let tam
      if (this.EsBoss) {
    tam = 100;
  } else {
     tam = 50;
  }
    image(this.Sprite, this.PosX - tam / 2, this.PosY - tam / 2, tam, tam);
  }
}
