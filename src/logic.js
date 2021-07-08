// Speed of the player (moves)
const speedX = () => {
    if (player.dx > 15 || player.dx < -15) {
        return player.dx
    } else if (player.move === 'r') {
        return player.dx += 5
    } else player.dx -= 5
}
const speedY = () => {
    if (player.dy > 15 || player.dy < -15) {
        return player.dy
    } else if (player.move === 'd') {
        return player.dy += 5
    } else player.dy -= 5
}
// Atacks from the player
const myAtacks = []
const newAtack = () => {
    if (player.direction === 'left') {
        myAtacks.push(new Atacks(player.playerWidth, player.playerHeight, player.playerX, player.playerY, player.direction, 7))
    } else if (player.direction === 'right') {
        myAtacks.push(new Atacks(player.playerWidth, player.playerHeight, player.playerX, player.playerY, player.direction, 0))
    } else if (player.direction === 'north') {
        myAtacks.push(new Atacks(player.playerWidth, player.playerHeight, player.playerX, player.playerY, player.direction, 11))
    } else if (player.direction === 'south') {
        myAtacks.push(new Atacks(player.playerWidth, player.playerHeight, player.playerX, player.playerY, player.direction, 15))
    }
}
const updateAtacks = () => {
    for (let elem of myAtacks) {
        elem.update()
    }
}
// Soldiers
// Hago uso de los frames dentro de myGameArea para que cada cierto tiempo aparezca un nuevo soldado.
// Genero un array para ir empujando los soldados soldados en este (osea las instancias de la clase soldiers)
const soldiersArray = []
const updateSoldiers = () => {
    if (myGameArea.frames > 24 * 3.5) {
        switch (gameSpeed) {
            case 2:
                if (myGameArea.frames % 80 === 0) {
                    const randomY = Math.random() * (myGameArea.canvas.height - 115)
                    soldiersArray.push(new Soldier(randomY))
                }
                for (let elem of soldiersArray) {
                    elem.update()
                }
                break
            case 5:
                if (myGameArea.frames % 40 === 0) {
                    const randomY = Math.random() * (myGameArea.canvas.height - 115)
                    soldiersArray.push(new Soldier(randomY))
                }
                for (let elem of soldiersArray) {
                    elem.update()
                }
                break
            case 8:
                if (myGameArea.frames % 25 === 0) {
                    const randomY = Math.random() * (myGameArea.canvas.height - 115)
                    soldiersArray.push(new Soldier(randomY))
                }
                for (let elem of soldiersArray) {
                    elem.update()
                }
                break
        }
    }
}
// Colisions 
// const getDistance = (x1, y1, x2, y2) => {
//     const xDistance = x2 - x1
//     const yDistance = y2 - y1
//     const pitagoras = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
//     return pitagoras
// }
let hitEnemy = false
let recoveryTime = 0
let explotiosArray = []
const checkGameOver = () => {
    // Colision Player - Machine y tiempo de inmortalidad del personaje despues de un golpe
    if (recoveryTime === 0) {
        if (player.playerX < (enemy.enemyWidth + enemy.enemyX) * 2) {
            hitCupSound.innerHTML = `<audio src="../sounds/hitCup.mp3" autoplay></audio>`
            health.frameY++
            player.health--
            recoveryTime = 55
            player.score = 0
        }
    } else recoveryTime--
    // Colision Ataque - Machine
    for (const playerAtack of myAtacks) {
        if (playerAtack.x > enemy.enemyX + enemy.enemyWidth * 2 - 100 ||
            playerAtack.x + playerAtack.width - 100 < enemy.enemyX ||
            playerAtack.y > enemy.enemyY + enemy.enemyHeight * 2 - 100 ||
            playerAtack.y + playerAtack.height - 100 < enemy.enemyY
        ) {} else {
            myAtacks.splice(myAtacks.indexOf(playerAtack), 1)
            hitEnemySound.innerHTML = '<audio src="../sounds/hitEnemy.mp3" autoplay></audio>'
            hitEnemy = true
            enemy.health--
            player.score++
        }
    }
    // Colision Ataque - Soldier
    for (const playerAtack of myAtacks) {
        for (const sold of soldiersArray) {
            if (playerAtack.x > sold.x + sold.width - 50 ||
                playerAtack.x + playerAtack.width - 50 < sold.x ||
                playerAtack.y > sold.y + sold.height - 50 ||
                playerAtack.y + playerAtack.height - 50 < sold.y
            ) {} else {
                explotiosArray.push(new Explotion(sold.x, sold.y, sold.width, sold.height))
                myAtacks.splice(myAtacks.indexOf(playerAtack), 1)
                soldiersArray.splice(soldiersArray.indexOf(sold), 1)
                hitEnemySound.innerHTML = '<audio src="../sounds/soldier.mp3" autoplay></audio>'
                player.score++
            }
        }
    }
    for (let elem of explotiosArray) {
        elem.update()
    }
    // Colision Player - Soldier
    for (const sold of soldiersArray) {
        if (player.playerX > sold.x + sold.width - 50 ||
            player.playerX + player.playerWidth - 50 < sold.x ||
            player.playerY > sold.y + sold.height - 50 ||
            player.playerY + player.playerHeight - 50 < sold.y
        ) {} else if (recoveryTime === 0) {
            soldiersArray.splice(soldiersArray.indexOf(sold), 1)
            hitCupSound.innerHTML = `<audio src="../sounds/hitCup.mp3" autoplay></audio>`
            health.frameY++
            player.health--
            recoveryTime = 55
            player.score = 0
        } else recoveryTime--
    }
    // Winning and lose
    if (enemy.health <= 0) {
        flag.innerHTML = `<audio src="../sounds/cupWin.mp3" autoplay></audio>`
        musicTag.innerHTML = `<audio src="../sounds/missionComplete.mp3" autoplay></audio>`
        myGameArea.stop()
        winning()
    }
    if (player.health <= 0) {
        musicTag.innerHTML = `<audio src="../sounds/die.mp3" autoplay></audio>`
        myGameArea.stop()
        lose()
    }
}