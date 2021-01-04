class Fish {
    constructor(ctx, x, y) { // añadir tamaño del pez aquí para que cambie
        this.ctx = ctx

        this.x = x
        // max de y y de x más abajo para coger el tamaño del pez

        this.vx = 0

        this.y = y

        this.vy = 0

        this.sprite = new Image ()
        this.sprite.src = '../assets/spritesFish-2.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 3
        this.sprite.verticalFrames = 2

        // estado por defecto (parado)
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.drawCount = 0

        this.width = 0
        this.height = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true

            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)

            this.width = this.sprite.frameWidth / 3 // !!!!! aquí se toca el tamaño
            this.height = this.sprite.frameHeight / 3 // !!!!! aquí se toca el tamaño
            console.log(`Fish width now = ${this.width}`)
            console.log(`Fish height now = ${this.height}`)

            // MÁXIMOS (aquí para coger el tamaño)
            this.maxYsurface = 80
            this.maxYfloor = 460 - this.height + 15 // background floor y - el sprite completo entre para que sea el fish en particular entre el doble de lo que se divide el tamaño del fish + 15 (a ojo) para ajustarlo mejor
            this.maxX = (this.ctx.canvas.width / 2) - this.width * 2 // tope del medio

        }

        this.movements = {
            up: false,
            down: false,
            right: false
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth, // min 2:42' posicion en la que yo quiero cortar
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth, // CUANTO QUIERO RECORTAR DE ANCHO
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )

            this.animate()
            this.sprite.drawCount++
        }

    }

    onKeyEvent(event) {
        const status = event.type === 'keydown'

        switch (event.keyCode) {
            case KEY_UP:
                this.movements.up = status
                break;
            case KEY_DOWN:
                this.movements.down = status
                break;
            case KEY_RIGHT:
                this.movements.right = status
                break;
            
            default:
                break;
        }
    }

    move() { // 2:53 mins mario

        if (this.movements.down) {
            this.vy = SPEED
        } else if (this.movements.up) {
            this.vy = - SPEED
        } else { // si quiero que nunca frene no se pone este ultumo else
            this.vy = 0
        }
        
        //if (this.movements.right) {
        //    this.vx = SPEED
        //} else { // si quiero que nunca frene no se pone este ultumo else
            
        //}

        this.x += this.vx
        this.y += this.vy

        if (this.y >= this.maxYfloor) {
            this.y = this.maxYfloor
            this.vy = 0
            // AÑADIR AGUA DE PSSSSSS
        } else if (this.y <= this.maxYsurface) {
            this. y = this.maxYsurface
            this.vy = 0
            // AÑADIR ARENA DE DERRAPE
        }

        if (this.x >= this.maxX) {
            this.x = this.maxX
        }
    }

    animate() {

        //if (this.isAboutEat) { // VIDEO:sobre la hora 3 y 5 mins
        //    this.animateEat()
        //} else 
        if (this.movements.down || this.movements.right || this.movements.up) {
            this.animateSprite()
        } else {
            this.resetAnimation()
        }
    }

    resetAnimation () {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
    }

    animateEat() {
        this.sprite.horizontalFrameIndex = 2
        this.sprite.verticalFrameIndex = 0
    }

    animateSprite() {
        // para morir aquí otro if (hora 3 minuto 23)
        if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) { // 0 velocidad del cambio de sprites
            if (this.sprite.horizontalFrameIndex === 1) {
                this.sprite.horizontalFrameIndex = 0
            } else {
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    fat() {
        this.width * 1.5// !!!!! aquí se toca el tamaño
        this.height * 1.5
        console.log(`Fish width now = ${this.width}`)
        console.log(`Fish height now = ${this.height}`)
    }

    dead() {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 1
        

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 1
            this.sprite.verticalFrameIndex = 1
            this.vy += 10
        }, 2000)
    }

    collideWith(element) {
        return this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }
}