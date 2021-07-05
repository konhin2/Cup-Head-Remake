// EVENTS
const player = new Cuphead()
const startGameButton = document.getElementById('btn-start')



// Movimiento de Cuphead en lógica
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 39:
            player.direction = 'right'
            player.playerFrameY = 3
            player.move = 'r'
            speedX()
            break
        case 37:
            player.direction = 'left'
            player.playerFrameY = 2
            player.move = 'l'
            speedX()
            break
        case 38:
            player.direction = 'north'
            player.playerFrameY = 0
            player.move = 'u'
            speedY()
            break
        case 40:
            player.direction = 'south'
            player.playerFrameY = 6
            player.move = 'd'
            speedY()
        case 32:
    }
})
document.addEventListener('keyup', (event) => {
    player.dx = 0
    player.dy = 0
    player.move = 's'
})