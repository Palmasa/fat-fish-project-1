class Game {
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 900
        this.canvas.height = 500
        this.ctx = this.canvas.getContext('2d')

        this.drawInterval = undefined
        this.fps = 1000 / 60

        this.background = new Background(this.ctx)
        this.fish = new Fish(this.ctx, 0, this.canvas.height/2) // menos la mitad del pez tanto en w como en h
        this.seaweeds = [
          new Seaweed (this.ctx, this.canvas.width + 50, 1, 50, 'red')
        ]
  
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
      this.seaweeds.forEach((seaweed) => {
        seaweed.draw()
      })
    }

    move() {
        this.background.move()
        this.fish.move()
        this.seaweeds.forEach((seaweed) => {
          seaweed.move()
        })
      }

    onKeyEvent(event) {
      this.fish.onKeyEvent(event)
    }
      
    addSeaweed() {
      const seaweed = new Seaweed(
        this.ctx,
        Math.random() * this.canvas.width,
        100,
        Math.random() * 50,
        'blue'
      )

      this.seaweeds.push(seaweed)
    }
}