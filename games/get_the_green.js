/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Get the GREEN!
@author: Dhyan99
@tags: ["endless"]
@addedOn: 2024-06-28
*/

const player = "p"
const green = "s"
const grey = "g"
const red = "r"
var gameOver = false
var ingameLevel = 1
var timer = 10;
let countdownInterval;

const melody = tune`
150: B5~150 + A5~150 + G5~150 + F5~150 + E5~150,
150: B5^150 + A5^150 + G5^150 + F5^150 + E5^150,
150: B5-150 + A5-150 + G5-150 + F5-150 + E5-150,
150: B5/150 + A5/150 + G5/150 + F5/150 + E5/150,
150: D5~150 + C5~150 + B4~150 + A4~150 + G4~150,
150: D5^150 + C5^150 + B4^150 + A4^150 + G4^150,
150: D5-150 + C5-150 + B4-150 + A4-150 + G4-150,
150: D5/150 + C5/150 + B4/150 + A4/150 + G4/150,
150: F4~150 + E4~150 + D4~150 + C4~150,
150: F4^150 + E4^150 + D4^150 + C4^150,
150: F4-150 + E4-150 + D4-150 + C4-150,
150: F4/150 + E4/150 + D4/150 + C4/150,
150: B5~150 + A5~150 + G5~150 + F5~150 + E5~150,
150: B5^150 + A5^150 + G5^150 + F5^150 + E5^150,
150: B5-150 + A5-150 + G5-150 + F5-150 + E5-150,
150: B5/150 + A5/150 + G5/150 + F5/150 + E5/150,
150: D5~150 + C5~150 + B4~150 + A4~150 + G4~150,
150: D5^150 + C5^150 + B4^150 + A4^150 + G4^150,
150: D5-150 + C5-150 + G4-150 + A4-150 + B4-150,
150: D5/150 + C5/150 + B4/150 + A4/150 + G4/150,
150: F4~150 + E4~150 + D4~150 + C4~150,
150: F4^150 + E4^150 + D4^150 + C4^150,
150: F4-150 + E4-150 + D4-150 + C4-150,
150: F4/150 + E4/150 + D4/150 + C4/150,
150: B5~150 + A5~150 + G5~150 + F5~150 + E5~150,
150: B5^150 + A5^150 + G5^150 + F5^150 + E5^150,
150: B5-150 + A5-150 + G5-150 + F5-150 + E5-150,
150: B5/150 + A5/150 + G5/150 + F5/150 + E5/150,
150: B4~150 + D5~150 + C5~150 + A4~150 + G4~150,
150: G4^150 + A4^150 + B4^150 + C5^150 + D5^150,
150: D5-150 + C5-150 + B4-150 + G4-150 + A4-150,
150: D5/150 + C5/150 + B4/150 + A4/150 + G4/150`

const playback = playTune(melody, Infinity)


setLegend(
  [ player, bitmap`
................
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
..999CCCCCC999..
..999CCCCCC999..
..999CCCCCC999..
..000999999000..
..000999999000..
..DDD999999DDD..
.....LLLLLL.....
.....LLLLLL.....
................` ],
  [green,bitmap`
2222222222222222
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2222222222222222`],
  [red, bitmap`
2222222222222222
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2222222222222222`],
  [grey,bitmap`
2222222222222222
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2111111111111112
2222222222222222`],
)

setSolids([ green, red ])

let level = 0
const levels = [
  map`
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
ggggggggggggg
.............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(5,4,player);

      const randomX = Math.floor(Math.random() * 13);
      const randomY = Math.floor(Math.random() * 9);
      addSprite(randomX, randomY, red)
      const randomX1 = Math.floor(Math.random() * 13);
      const randomY1 = Math.floor(Math.random() * 9);
      addSprite(randomX1, randomY1, red)
      const randomX3 = Math.floor(Math.random() * 13);
      const randomY3 = Math.floor(Math.random() * 9);
      clearTile(randomX3,randomY3)
      addSprite(randomX3, randomY3, grey)
      addSprite(randomX3, randomY3, green)
addText("Level "+ingameLevel, { 
  x: 2,
  y: 14,
  color: color`.`
})

function checkGreen() {
  const playerSprite = getFirst(player);
  const greenSprite = getFirst(green);
  const redSprites = getAll(red)
    if (playerSprite.x === greenSprite.x && playerSprite.y === greenSprite.y && gameOver === false) {
      resetTimer()
      greenSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      ingameLevel += 1
      for(let i = 0;i < ingameLevel * 2 - 2;i++){
      const randomX = Math.floor(Math.random() * 13);
      const randomY = Math.floor(Math.random() * 9);
      addSprite(randomX, randomY, red)
      }

      const randomX = Math.floor(Math.random() * 13);
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX,randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, green)

      if(playerSprite.x === randomX && playerSprite.y === randomY){
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x,playerSprite1.y)
      addSprite(playerSprite1.x,playerSprite1.y, grey)
      addSprite(playerSprite1.x,playerSprite1.y, player)
      addText("Level "+ingameLevel, { 
  x: 2,
  y: 14,
  color: color`.`
})
      startTimer()
      
      
    }
  for (const redSprite of redSprites) {
    if(playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false){
      resetTimer()
      clearText()
      addText("Game Over! Lvl "+ingameLevel, { 
  x: 2,
  y: 14,
  color: color`.`
})
      gameOver = true;
  }
  }
}

function startTimer() {
  timer = 10;
  addText(timer.toString(), { 
  x: 15,
  y: 14,
  color: color`.`
})
  countdownInterval = setInterval(() => {
    timer--;
      addText("0"+timer.toString(), { 
  x: 15,
  y: 14,
  color: color`.`
})
    if (timer === 0) {
      clearInterval(countdownInterval);
           clearText()
      addText("Game OVER! Lvl "+ingameLevel, { 
  x: 2,
  y: 14,
  color: color`.`
})
      gameOver = true;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timer = 10;
}

onInput("w", () => {
  getFirst(player).y -= 1
  checkGreen()
})


onInput("a", () => {
  getFirst(player).x -= 1
  checkGreen()
})

onInput("s", () => {
  getFirst(player).y += 1
  checkGreen()
})

onInput("d", () => {
  getFirst(player).x += 1
  checkGreen()
})

onInput("i", () => {
  getFirst(player).x -= 1
  getFirst(player).y -= 1
  checkGreen()
})

onInput("j", () => {
  getFirst(player).x -= 1
  getFirst(player).y += 1
  checkGreen()
})

onInput("k", () => {
  getFirst(player).x += 1
  getFirst(player).y += 1
  checkGreen()
})

onInput("l", () => {
  getFirst(player).x += 1
  getFirst(player).y -= 1
  checkGreen()
})
