class Seaweed {
    constructor (ctx, x, y, r, color) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.r = r

        this.vx = -2
        this.vy = 0.2
        this.ay = 0.4

        this.color = color
    }

    draw() {
        this.ctx.save()
        
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.restore()
    }

    move() {
        this.x += this.vx

        this.vy += this.ay
        this.y += this.vy

        // ABAJO
        if (this.y + this.r >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.r // AQUÍ EL RANGO
            this.vy *= -1
        }

        // DERECHA
        if (this.x + this.r >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.r
            this.vx *= -1
        }

        // INQUIERDA
        /* if (this.x - this.r <= 0) {
            this.x = this.r
            this.vx *= -1
        } */

        // ARRIBA 
        
    }

}