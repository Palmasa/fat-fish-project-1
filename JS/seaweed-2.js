class Seaweed {
    constructor (ctx, x, y, color, radius) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.color = color
        this.radius = radius

        this.seaweedInterval = undefined

        this.vx = -2

        this.vy = - 0.1

        this.movements = {
            right: false
          }
    }

    draw() {

        this.ctx.save()
            
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.restore()
    }

    move() {
        if (this.movements.right) {
            this.x += this.vx
        } else if (!this.movements.rigth) {
            this.y += this.vy
                /*if (this.y >= 0) {
                this.vy = - 0.1
                } else if (this.seaY <= -10) {
                this.vy = 0.1
                } */ //conseguir que siban y bajen. no se cual es la y
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
}