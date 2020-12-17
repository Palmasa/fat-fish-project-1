class Game {
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 700
        this.canvas.height = 500
        this.ctx = this.canvas.getContext('2d')

    }

}