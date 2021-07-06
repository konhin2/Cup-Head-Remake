
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
    } else if (player.direction === 'south'){
        myAtacks.push(new Atacks(player.playerWidth, player.playerHeight, player.playerX, player.playerY, player.direction, 15))
    }
}
const updateAtacks = () => {
    for (let elem of myAtacks) {
        elem.update()
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
const checkGameOver = () => {
    if (player.playerX < enemy.enemyWidth * 2 + enemy.enemyX - player.playerWidth) {
        console.log("loser")
    }
    for (const playerAtack of myAtacks) {
        if (playerAtack.x > enemy.enemyX + enemy.enemyWidth * 2 - 100 ||
            playerAtack.x + playerAtack.width - 100 < enemy.enemyX ||
            playerAtack.y > enemy.enemyY + enemy.enemyHeight * 2 - 100 ||
            playerAtack.y + playerAtack.height - 100 < enemy.enemyY
        ) {
        } else {
            myAtacks.splice(myAtacks.indexOf(playerAtack),1)
            hitEnemySound.innerHTML = '<audio src="../sounds/hitEnemy.mp3" autoplay></audio>'
            hitEnemy = true
            enemy.health--
        }
    }
    if (enemy.health <= 0) {
        myGameArea.stop()
        console.log("You win")
        
    }
}