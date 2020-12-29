class Game {
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 900
        this.canvas.height = 500
        this.ctx = this.canvas.getContext('2d')

        this.drawInterval = undefined
        this.fps = 1000 / 60

        this.background = new Background(this.ctx)
        this.fish = new Fish(this.ctx, 0, 0)

    }

    start() {
        if (!this.drawInterval) {
          this.drawInterval = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
          }, this.fps);
        }
      }
    
      clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
    
      draw() {
        this.background.draw()
        this.fish.draw()
      }

      move() {
          this.background.move()
        }

}