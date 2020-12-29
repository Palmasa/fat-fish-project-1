class Fish {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.imgfish = new Image()
        this.imgfish.src = '../assets/MAMAFISH.png' //no ruta html
        this.imgfish.isReady = false
        this.imgfish.onload = () => {
          this.imgfish.isReady = true
        }
    }

    isReady() {
        return this.imgfish.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.imgfish,
                this.x,
                this.y,
                300,
                250
            )
        }
    }
}