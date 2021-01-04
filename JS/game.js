class Game {
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 900
        this.canvas.height = 500
        this.ctx = this.canvas.getContext('2d')

        this.drawInterval = undefined
        this.fps = 1000 / 60

        // this.apperanceFPS = Math.floor(Math.random() * (5 - 3) + 3) * 1000 // tiempo de seaweeds
        // this.seaweedInterval = undefined
        this.drawCount = 0

        this.background = new Background(this.ctx)
        this.fish = new Fish(this.ctx, 0, this.canvas.height/2 - 50) // menos (a ojo) para equipararlo con el fondo
        this.seaweeds = []

        this.points = 0
    }

    start() {
        if (!this.drawInterval) { 
          this.drawInterval = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
            this.drawCount ++
            this.checkCollitions()

            if (this.drawCount % DRAW_WEED_FRAMES === 0) {
              this.addSeaweed()
              this.drawCount = 0
            }

          }, this.fps);
        }
    }

    end() {
      clearInterval(this.drawInterval)
    }
    
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.seaweeds = this.seaweeds.filter((weed) => weed.x >= -weed.width)
    }
  
    draw() {
      this.background.draw()
      this.fish.draw()
      this.seaweeds.forEach((seaweed) => {
        seaweed.draw()
      })
    }

    move() {
        this.fish.move()

        this.background.moveSea()
        if (this.fish.x === this.fish.maxX) {
          this.background.move()
        }

        this.seaweeds.forEach((seaweed) => {
          seaweed.move()
        })
      }

    onKeyEvent(event) {
      this.fish.onKeyEvent(event)
      this.background.onKeyEvent(event)
      this.seaweeds.forEach((seaweed) => {
        seaweed.onKeyEvent(event)
      })
    }
      
    addSeaweed() {
    
      //this.seaweedInterval = setInterval(() => {
        const seaweed = new Seaweed(
          this.ctx,
          this.canvas.width + 78, // Math.floor(Math.random() * (this.canvas.width * 2 - this.canvas.width) + this.canvas.width),
          Math.floor(Math.random() * (460 - 80) + 80)
        )

        this.seaweeds.push(seaweed)
        console.log('new green SEAWEED')
      //}, this.apperanceFPS);
    }

    checkCollitions() {
      if (this.seaweeds.some(weed => this.fish.collideWith(weed))) {
        this.fish.fat()
      }
    }
}

/*
this.fish.dead()

        this.background.stop()
        this.seaweeds.forEach((seaweed) => {
          seaweed.stop()
        })

        setTimeout(()=> {
          this.end()
        }, 2100) // Una ventana de segundos para morir */