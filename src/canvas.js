// Load Images
const images = {}
images.player = new Image()
images.player.src = '../images/cupHead.png'
images.enemy = new Image()
images.enemy.src = '../images/assyNero.png'
images.background = new Image()
images.background.src = '../images/floor/Brick_01.png'
images.health = new Image()
images.health.src = '../images/health.png'
images.soldier = new Image()
images.soldier.src = '../images/soldier.png'
images.hitPlayer = new Image()
images.hitPlayer.src = '../images/hitCupHead.png'
images.fire = new Image()
images.fire.src = '../images/fire.png'
/**
 * CANVAS OBJECT
 * Decidí meter el canvas en un objeto porque así podemos llamar varias funciones
 * generales relacionadas con el canvas e incluirlas en el mismo objeto.
 */
const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 840
        this.canvas.height = 640
        this.context = this.canvas.getContext('2d')
        this.canvas.style.border = '3px solid #5075EB'
        this.canvas.style.background = '#8AA5E6'

        // Insertamos el canvas al body del html, usamos insert before para que se anteponga a los scripts
        document.body.insertBefore(this.canvas, document.body.childNodes[0])

        this.interval = setInterval(updateGameArea, 1000 / 24) // Aqui inicia el motor del juego
    },
    // Funcion para limpiar el canvas trabaja en conjunto con el motor en la funcion que se pasa en el set interval (updateGameArea)
    clear: function () {
        this.context.clearRect(0, 0, innerWidth, innerHeight)
    },
    // Para el motor cuando el jugador gane o pierda (detiene el setInterval)
    stop: function () {
        clearInterval(this.interval)
    },
    frames: 0
}
// Creacion del Cuphead
class Cuphead {
    constructor() {
        // Variable que detecta que se apreto y se genera la animación correspondiente
        // s-static, r-right, l-left, u-up, i-inicio-scary
        this.move = 'i'
        this.direction = 'south'
        // Alto y ancho del recorte del source (sW, sH)
        this.playerWidth = 103.0625
        this.playerHeight = 113.125
        // Posición del cuadro a recortar
        this.playerFrameX = 0
        this.playerFrameY = 5
        // Coordenadas del elemento en el canvas 
        this.playerX = 600
        this.playerY = 270
        // Aceleración del cup
        this.dx = 0
        this.dy = 0
        // Salud del player
        this.health = 10

    }
    // Función para dibujar los recortes de imágen en el canvas
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        if (recoveryTime > 0 && recoveryTime % 4 === 0) {
            switch (this.move) {
                case 'i':
                    if (this.playerFrameX < 8) this.playerFrameX++
                    else {
                        this.playerFrameX = 0
                        this.playerFrameY = 7
                        this.move = 'scary'
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    break
                case 'scary':
                    if (this.playerFrameX < 9) this.playerFrameX++
                    else {
                        this.move = 's'
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    break
                case 's':
                    if (this.direction === 'north') {
                        this.playerFrameY = 0
                        this.playerFrameX = 0
                        this.drawSprite(images.hitPlayer,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else if (this.direction === 'south') {
                        this.playerFrameY = 5
                        this.playerFrameX = 0
                        this.drawSprite(images.hitPlayer,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else if (this.direction === 'right') {
                        this.playerFrameY = 3
                        this.playerFrameX = 0
                        this.drawSprite(images.hitPlayer,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else {
                        this.playerFrameY = 2
                        this.playerFrameX = 13
                        this.drawSprite(images.hitPlayer,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    }
                    break
                case 'u':
                    if (this.playerFrameX < 14) this.playerFrameX++
                    else {
                        this.playerFrameX = 4
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerY < -15) this.playerY
                    else this.playerY += this.dy
                    break
                case 'd':
                    if (this.playerFrameX < 12) this.playerFrameX++
                    else {
                        this.playerFrameX = 0
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerY + this.playerHeight - 10 > myGameArea.canvas.height) {
                        this.playerY
                    } else this.playerY += this.dy
                    break
                case 'r':
                    if (this.playerFrameX < 13) this.playerFrameX++
                    else {
                        this.playerFrameX = 3
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerX + this.playerWidth - 19 > myGameArea.canvas.width) {
                        this.playerX
                    } else this.playerX += this.dx
                    break
                case 'l':
                    if (this.playerFrameX > 0) this.playerFrameX--
                    else {
                        this.playerFrameX = 10
                    }
                    this.drawSprite(images.hitPlayer,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerX < -19) this.playerX
                    else this.playerX += this.dx
                    break
            }
        } else {
            switch (this.move) {
                case 'i':
                    if (this.playerFrameX < 8) this.playerFrameX++
                    else {
                        this.playerFrameX = 0
                        this.playerFrameY = 7
                        this.move = 'scary'
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    break
                case 'scary':
                    if (this.playerFrameX < 9) this.playerFrameX++
                    else {
                        this.move = 's'
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    break
                case 's':
                    if (this.direction === 'north') {
                        this.playerFrameY = 0
                        this.playerFrameX = 0
                        this.drawSprite(images.player,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else if (this.direction === 'south') {
                        this.playerFrameY = 5
                        this.playerFrameX = 0
                        this.drawSprite(images.player,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else if (this.direction === 'right') {
                        this.playerFrameY = 3
                        this.playerFrameX = 0
                        this.drawSprite(images.player,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    } else {
                        this.playerFrameY = 2
                        this.playerFrameX = 13
                        this.drawSprite(images.player,
                            this.playerWidth * this.playerFrameX,
                            this.playerHeight * this.playerFrameY,
                            this.playerWidth, this.playerHeight,
                            this.playerX, this.playerY,
                            this.playerWidth, this.playerHeight
                        )
                    }
                    break
                case 'u':
                    if (this.playerFrameX < 14) this.playerFrameX++
                    else {
                        this.playerFrameX = 4
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerY < -15) this.playerY
                    else this.playerY += this.dy
                    break
                case 'd':
                    if (this.playerFrameX < 12) this.playerFrameX++
                    else {
                        this.playerFrameX = 0
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerY + this.playerHeight - 10 > myGameArea.canvas.height) {
                        this.playerY
                    } else this.playerY += this.dy
                    break
                case 'r':
                    if (this.playerFrameX < 13) this.playerFrameX++
                    else {
                        this.playerFrameX = 3
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerX + this.playerWidth - 19 > myGameArea.canvas.width) {
                        this.playerX
                    } else this.playerX += this.dx
                    break
                case 'l':
                    if (this.playerFrameX > 0) this.playerFrameX--
                    else {
                        this.playerFrameX = 10
                    }
                    this.drawSprite(images.player,
                        this.playerWidth * this.playerFrameX,
                        this.playerHeight * this.playerFrameY,
                        this.playerWidth, this.playerHeight,
                        this.playerX, this.playerY,
                        this.playerWidth, this.playerHeight
                    )
                    if (this.playerX < -19) this.playerX
                    else this.playerX += this.dx
                    break
            }
        }
    }
    newPosition() {
        this.playerX
        this.playerY
    }
}

// Creacion de los ataques chevere
class Atacks {
    constructor(width, height, x, y, direction, sX) {
        // Dirección del ataque
        this.directionAtack = direction
        // Ancho y alto de la imagen recortada
        this.width = width
        this.height = height
        // Posicion de la imagen recortada
        this.sX = sX
        this.sY = 1
        // Posición en el espácio del ataque
        this.x = x
        this.y = y
    }
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        switch (this.directionAtack) {
            case 'left':
                this.drawSprite(images.player,
                    this.width * this.sX,
                    this.height * this.sY,
                    this.width, this.height,
                    this.x, this.y,
                    this.width, this.height
                )
                if (this.sX > 4) this.sX--
                else {
                    this.sX = 7
                }
                this.x -= 25
                break
            case 'right':
                this.drawSprite(images.player,
                    this.width * this.sX,
                    this.height * this.sY,
                    this.width, this.height,
                    this.x, this.y,
                    this.width, this.height
                )
                if (this.sX < 3) this.sX++
                else {
                    this.sX = 0
                }
                this.x += 25
                break
            case 'north':
                this.drawSprite(images.player,
                    this.width * this.sX,
                    this.height * this.sY,
                    this.width, this.height,
                    this.x, this.y,
                    this.width, this.height
                )
                if (this.sX > 8) this.sX--
                else this.sX = 11
                this.y -= 25
                break
            case 'south':
                this.drawSprite(images.player,
                    this.width * this.sX,
                    this.height * this.sY,
                    this.width, this.height,
                    this.x, this.y,
                    this.width, this.height
                )
                if (this.sX > 12) this.sX--
                else this.sX = 15
                this.y += 25
                break
        }
    }
}

// Classe del enemigo xD
class AssyNero {
    constructor() {
        // Alto y ancho del recorte del source (sW, sH)
        this.enemyWidth = 199
        this.enemyHeight = 300
        // Posición del cuadro a recortar
        this.enemyFrameX = 0
        this.enemyFrameY = 0
        // Coordenadas del elemento en el canvas 
        this.enemyX = -300
        this.enemyY = 20
        // Salud del AssyNero 
        this.health = 100
    }
    // Función para dibujar los recortes de imágen en el canvas
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        if (hitEnemy) {
            this.enemyFrameX = 7
            this.drawSprite(images.enemy,
                this.enemyWidth * this.enemyFrameX,
                this.enemyHeight * this.enemyFrameY,
                this.enemyWidth, this.enemyHeight,
                this.enemyX, this.enemyY,
                this.enemyWidth * 2, this.enemyHeight * 2
            )
            hitEnemy = false
        } else {
            if (myGameArea.frames > 24 * 1.5) {
                if (this.enemyX < -30) {
                    if (this.enemyFrameX < 6) this.enemyFrameX++
                    else {
                        this.enemyFrameX = 0
                    }
                    this.drawSprite(images.enemy,
                        this.enemyWidth * this.enemyFrameX,
                        this.enemyHeight * this.enemyFrameY,
                        this.enemyWidth, this.enemyHeight,
                        this.enemyX, this.enemyY,
                        this.enemyWidth * 2, this.enemyHeight * 2
                    )
                    this.enemyX += 10
                } else {
                    if (this.enemyFrameX < 6) this.enemyFrameX++
                    else {
                        this.enemyFrameX = 0
                    }
                    this.drawSprite(images.enemy,
                        this.enemyWidth * this.enemyFrameX,
                        this.enemyHeight * this.enemyFrameY,
                        this.enemyWidth, this.enemyHeight,
                        this.enemyX, this.enemyY,
                        this.enemyWidth * 2, this.enemyHeight * 2
                    )
                }
            }
        }

    }
    updateHealth() {
        const ctx = myGameArea.context
        ctx.lineWidth = 3
        ctx.strokeStyle = '#191045'
        ctx.fillStyle = '#8234E3'
        ctx.strokeRect(20, 620, 700, 10)
        ctx.fillRect(20, 620, this.health * 7, 10)
    }
}
class Soldier {
    constructor(newY) {
        this.health = true
        // Alto y ancho del recorte del source (sW, sH)
        this.width = 160
        this.height = 160
        // Posición del cuadro a recortar
        this.frameX = 0
        this.frameY = 0
        // Coordenadas del elemento en el canvas 
        this.x = myGameArea.canvas.width
        this.y = newY
    }
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        this.drawSprite(images.soldier,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width, this.height,
            this.x, this.y,
            120, 120
        )
        if (this.frameX > 14) {
            this.frameX = 0
        } else this.frameX++
        this.x -= 3
    }
}
class Explotion {
    constructor(x, y, width, height) {
        this.frameX = 0
        this.frameY = 0
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        this.drawSprite(images.fire,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width, this.height,
            this.x, this.y,
            120, 120
        )
        if (this.frameX < 22) {
            this.frameX++
        }
        this.x -= 3
    }
}
class Health {
    constructor(health) {
        this.health = health
        this.width = 500
        this.height = 140
        this.frameX = 0
        this.frameY = 0
        this.x = 300
        this.y = 0
    }
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
        this.drawSprite(images.health,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width, this.height,
            myGameArea.canvas.width - this.width / 3, this.y,
            this.width / 3, this.height / 3
        )
    }
}
// Creación del background
// Objeto para loopear fondo
let gameSpeed = 2
const background = {
    x1: 0,
    x2: 840,
    y: 0,
    width: 840,
    height: 640
}
const handleBackground = () => {
    if (enemy.health === 33) {
        gameSpeed = 8
    } else if (enemy.health === 66) {
        gameSpeed = 5
    }
    if (myGameArea.frames > 24 * 3.5) {
        if (background.x1 <= -background.width + gameSpeed) background.x1 = background.width
        else background.x1 -= gameSpeed
        if (background.x2 <= -background.width + gameSpeed) background.x2 = background.width
        else background.x2 -= gameSpeed
    }
    myGameArea.context.drawImage(images.background, background.x1, background.y, background.width, background.height)
    myGameArea.context.drawImage(images.background, background.x2, background.y, background.width, background.height)
}
// Monitor del juego esta funcion se llama debtro del objeto del canvas
// Esta funcion nos permite limpiar y actualizar el area de juego y los elementos dentro de esta que se actualiza cada 20 ms por el set interval
const updateGameArea = () => {
    myGameArea.clear()
    handleBackground()
    player.newPosition()
    if (myGameArea.frames > 24 * 3.5) {
        player.playerX -= gameSpeed
        player.update()
    } else player.update()
    updateSoldiers()
    enemy.update()
    enemy.updateHealth()
    updateAtacks()
    health.update()
    myGameArea.frames++
    checkGameOver()
}
// Winning and Lose
const win = document.getElementById('win')
const winning = () => {
    win.style.display = 'inline'
    myGameArea.canvas.style.display = 'none'
}
const loser = document.getElementById('lose')
const lose = () => {
    loser.style.display = 'inline'
    myGameArea.canvas.style.display = 'none'
}