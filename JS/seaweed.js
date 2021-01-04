class Seaweed {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y

        this.vx = - 2
        this.vy = - 0.5

        this.weed = new Image ()
        this.weed.src = '../assets/seaWeed-1.png'
        this.weed.isReady = false

        this.weed.horizontalFrames = 5
        this.weed.verticalFrames = 8

        // Estado inicial
        this.weed.horizontalFrameIndex = 3
        this.weed.verticalFrameIndex = 0

        this.width = 0
        this.height = 0

        this.weed.drawCount = 0 

        this.weed.onload = () => {
            this.weed.isReady = true

            this.weed.frameWidth = Math.floor(this.weed.width / this.weed.horizontalFrames)
            this.weed.frameHeight = Math.floor(this.weed.height / this.weed.verticalFrames)

            this.width = this.weed.frameWidth // !!!!! aquí se toca el tamaño
            this.height = this.weed.frameHeight // !!!!! aquí se toca el tamaño
            console.log(`Fish width now = ${this.width}`)
            console.log(`Fish height now = ${this.height}`)

            // MÁXIMOS (aquí para coger el tamaño)
            this.maxYsurface = 80
            this.maxYfloor = 450 - this.height
        }

        this.movements = {
            right: false
        }
    }

    isReady() {
        return this.weed.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.weed,
                this.weed.horizontalFrameIndex * this.weed.frameWidth, // min 2:42' posicion en la que yo quiero cortar
                this.weed.verticalFrameIndex * this.weed.frameHeight,
                this.weed.frameWidth, // CUANTO QUIERO RECORTAR DE ANCHO
                this.weed.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            ) 
            
            this.animate()
            this.weed.drawCount++
        }
    }

    move() {
        //if (this.movements.right) {
            this.x += this.vx
        //} else if (!this.movements.right) {
           // this.y += this.vy
            //this.x += 0
        //}

        if (this.y <= 80) {
            this.resetAnimation()
            this.y = 80 // conseguir que suban y bajen como el mar POR HACER
        }
    }

    stop() {
        if (this.movements.right || !this.movements.right) {
            this.vx = 0
        }
    }

    onKeyEvent (event) {
        const status = event.type === 'keydown'
  
        switch (event.keyCode) {
          case KEY_RIGHT:
              this.movements.right = status
              break;
          
          default:
              break;
        }
    }

    animate() {
        this.animateweed()
    }

    resetAnimation() {
        this.weed.horizontalFrameIndex = 3
        this.weed.verticalFrameIndex = 0
    }

    animateweed() {
        // para morir aquí otro if (hora 3 minuto 23)
        if (this.weed.drawCount % MOVEMENT_FRAMES === 0) { // 0 velocidad del cambio de weeds
            if (this.weed.verticalFrameIndex === 7) {
                this.weed.verticalFrameIndex = 0
            } else {
                this.weed.verticalFrameIndex++
            }
        }
    }

}