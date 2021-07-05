const speedX = () => {
    if (player.dx > 10 || player.dx < -10) {
        return player.dx
    } else if (player.move === 'r') {
        return player.dx += 4
    } else player.dx -= 4
}
const speedY = () => {
    if (player.dy > 10 || player.dy < -10) {
        return player.dy
    } else if (player.move === 'd') {
        return player.dy += 4
    } else player.dy -= 4
}