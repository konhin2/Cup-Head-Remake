// Load Images
const images = {}
images.player = new Image()
images.player.src = '../images/cupHead.png'

/**
 * CANVAS OBJECT
 * Decidí meter el canvas en un objeto porque así podemos llamar varias funciones
 * generales relacionadas con el canvas e incluirlas en el mismo objeto.
 */
const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 640
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
    }
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
        this.playerX = 270
        this.playerY = 270
        // Aceleración del cup
        this.dx = 0
        this.dy = 0

    }
    // Función para dibujar los recortes de imágen en el canvas
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        const ctx = myGameArea.context
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    }
    update() {
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
    newPosition() {
        this.playerX
        this.playerY
    }
}

// Creacion de los ataques chevere
class Atacks {
    constructor(width, height, x, y, direction){
        // Dirección del ataque
        this.direction = direction
        // Ancho y alto de la imagen recortada
        this.width = width
        this.height = height
        // Posición en el espácio del ataque
        this.x = x
        this.y = y
    }
    moves(){
        switch (this.dir) {
            case value:
                
                break;
        
            default:
                break;
        }
    }
}
// Monitor del juego esta funcion se llama debtro del objeto del canvas
// Esta funcion nos permite limpiar y actualizar el area de juego y los elementos dentro de esta que se actualiza cada 20 ms por el set interval
const updateGameArea = () => {
    myGameArea.clear()
    player.newPosition()
    player.update()
}

myGameArea.start()