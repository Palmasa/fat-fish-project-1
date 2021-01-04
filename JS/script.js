window.onload = () => {
    const game = new Game('game-canvas')

    document.addEventListener('keypress', () => {
      game.start()
      game.addSeaweed()
    })

    document.addEventListener('keydown', (event) => {
      game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
      game.onKeyEvent(event)
    })
  
  }