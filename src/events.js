// EVENTS
const player = new Cuphead()
const startGameButton = document.getElementById('btn-start')
const health = new Health(player.health)
const enemy = new AssyNero()

// Sounds
const soundTag = document.querySelector('#sounds')
const hitEnemySound = document.querySelector('#hit-enemy')
const hitCupSound = document.querySelector('#hit-cup')
const flag = document.querySelector('#flag')
const voice = document.querySelector('#voice')
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
            break
        case 32:
            newAtack()
            soundTag.innerHTML = `<audio src="../sounds/hadouken.mp3" autoplay></audio>`
            break
    } 
})
document.addEventListener('keyup', (event) => {
    player.dx = 0
    player.dy = 0
    player.move = 's'
})

// Start button
const button = document.createElement('button')
button.setAttribute('id', 'btn-start')
const span = document.createElement('span')
span.innerText = "Let's play"
button.appendChild(span)
const createButton = () => {
    document.body.appendChild(button)
}
const musicTag = document.querySelector('#music')
const instructionsTag = document.querySelector('.instructions')
button.addEventListener('click', () => {
    myGameArea.start() 
    button.style.display = 'none'
    voice.innerHTML = `<audio src="../sounds/voice.mp3" autoplay></audio>`
    musicTag.innerHTML = `<audio src="../sounds/botanic-panic.mp3" autoplay loop></audio>`
    myGameArea.canvas.style.display = 'block'
    loser.style.display = 'none'
    win.style.display = 'none'
    instructionsTag.style.display = 'none'
})
