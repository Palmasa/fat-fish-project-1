class Background {
    constructor(ctx) {
        this.ctx = ctx

        // floor positions and v
        this.x = 0
        this.y = 460

        this.vx = -2

        // sea positions and v
        this.seaX = 0
        this.seaY = 0

        this.vy = 0.1
  
        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width
    
        this.imgBlue = new Image()
        this.imgBlue.src = '../assets/bg-fx-6.png' //no ruta html
        this.imgBlue.isReady = false
        this.imgBlue.onload = () => {
          this.imgBlue.isReady = true
        }

        this.imgFloor = new Image()
        this.imgFloor.src = '../assets/floor.png'
        this.imgFloor.isReady = false
        this.imgFloor.onload = () => {
          this.imgFloor.isReady = true
        }

        this.movements = {
            right: false
          }

    }

    isReady() {
        return this.imgBlue.isReady && this.imgFloor.isReady
    }
        
    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.imgBlue,
                this.x,
                this.seaY,
                this.w,
                this.h
            )
            this.ctx.drawImage(
              this.imgBlue,
              this.x + this.w,
              this.seaY,
              this.w,
              this.h
          )
            

            this.ctx.drawImage(
                this.imgFloor,
                this.x,
                this.y,
                this.w,
                this.h - 450
            )
            this.ctx.drawImage(
              this.imgFloor,
              this.x + this.w,
              this.y,
              this.w,
              this.h - 450
            )
        }
    }

    move() {

      // Floor - dependant on the fish
        
        this.x += this.vx
    
        if (this.x + this.w <= 0) {
          this.x = 0
        }

      // Sea - fixed movement
        this.seaY += this.vy
    
        if (this.seaY >= 0) {
          this.vy = - 0.2
        } else if (this.seaY <= -10) {
          this.vy = 0.2
        }
    }
      
}