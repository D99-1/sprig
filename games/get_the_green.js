/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Get the GREEN!
@author: Dhyan99
@tags: ["endless"]
@addedOn: 2024-06-28
*/

// Settings
const level_4_swap_interval_seconds = 1

const player = "p"
const green = "s"
const grey = "g"
const red = "r"
const white = "w"
const blue = "b"
const purple = "u"
const gold = "o"
const brown = "n"
var gameOver = false
var ingameLevel = 1
var timer = 10;
let countdownInterval;
let swapInterval;

setLegend(
  [player, bitmap`
................
................
................
................
................
.......00.......
.......00.......
......9CC9......
......0990......
......D99D......
.......LL.......
................
................
................
................
................`],
  [green, bitmap`
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
  [blue,bitmap`
2222222222222222
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2777777777777772
2222222222222222`],
  [purple,bitmap`
2222222222222222
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2HHHHHHHHHHHHHH2
2222222222222222`],
  [gold,bitmap`
2222222222222222
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2FFFFFFFFFFFFFF2
2222222222222222`],
  [brown, bitmap`
2222222222222222
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
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
  [grey, bitmap`
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
  [white,bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
)

setSolids([green, red, blue, purple, gold, brown])

let level = 0
const levels = [
  map`
ssswwwbbb
ssswwwbbb
ssswwwbbb
wwwwwwwww
uuuwwwooo
uuuwwwooo
uuuwwwooo`,
  map`
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.ggggggggggg.
.............`,
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
.............`,
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
.............`,
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
.............`,
]

setMap(levels[level])

setPushables({
  [player]: []
})

  addSprite(4, 2, player);

  addText("Difficulty", {
    x: 5,
    y: 8,
    color: `.`
  })

  addText("1", {
    x: 3,
    y: 3,
    color: color`0`
  })

  addText("2", {
    x: 16,
    y: 3,
    color: color`0`
  })

  addText("3", {
    x: 3,
    y: 12,
    color: color`0`
  })

  addText("4", {
    x: 16,
    y: 12,
    color: color`0`
  })

  onInput("w", () => {
    getFirst(player).y -= 1
    movementHandler()
  })

  onInput("a", () => {
    getFirst(player).x -= 1
    movementHandler()

  })

  onInput("s", () => {
    getFirst(player).y += 1
    movementHandler()

  })

  onInput("d", () => {
    getFirst(player).x += 1
    movementHandler()

  })

  onInput("i", () => {
    getFirst(player).x -= 1
    getFirst(player).y -= 1
    movementHandler()

  })

  onInput("j", () => {
    getFirst(player).x -= 1
    getFirst(player).y += 1
    movementHandler()

  })

  onInput("k", () => {
    getFirst(player).x += 1
    getFirst(player).y += 1
    movementHandler()

  })

  onInput("l", () => {
    getFirst(player).x += 1
    getFirst(player).y -= 1
    movementHandler()

  })

function movementHandler(){
if(level == 0){
  checkSelection()
} else if(level == 1){
  checkGreen()
} else if(level == 2){
  checkBlue()
}else if(level == 3){
  checkPurple()
}else if(level == 4){
  checkGold()
}
}


  function level1(){

  clearText()
    
  addSprite(5, 4, player);

  const randomX = Math.floor((Math.random() * 11)+1);
  const randomY = Math.floor(Math.random() * 9);
  addSprite(randomX, randomY, red)
  const randomX1 = Math.floor((Math.random() * 11)+1);
  const randomY1 = Math.floor(Math.random() * 9);
  addSprite(randomX1, randomY1, red)
  const randomX3 = Math.floor((Math.random() * 11)+1);
  const randomY3 = Math.floor(Math.random() * 9);
  clearTile(randomX3, randomY3)
  addSprite(randomX3, randomY3, grey)
  addSprite(randomX3, randomY3, green)
  addText("Level " + ingameLevel, {
    x: 1,
    y: 14,
    color: color`.`
  })
  }

  function level2(){
    clearText()
    addSprite(5, 4, player);

      const randomX = Math.floor(Math.random() * 13);
  const randomY = Math.floor(Math.random() * 9);
  addSprite(randomX, randomY, red)
  const randomX1 = Math.floor(Math.random() * 13);
  const randomY1 = Math.floor(Math.random() * 9);
  addSprite(randomX1, randomY1, red)
  const randomX3 = Math.floor(Math.random() * 13);
  const randomY3 = Math.floor(Math.random() * 9);
  clearTile(randomX3, randomY3)
  addSprite(randomX3, randomY3, grey)
  addSprite(randomX3, randomY3, blue)
  addText("Level " + ingameLevel, {
    x: 1,
    y: 14,
    color: color`.`
  })
  }

  function level3(){
    clearText()
    addSprite(5, 4, player);

      const randomX = Math.floor(Math.random() * 13);
  const randomY = Math.floor(Math.random() * 9);
  addSprite(randomX, randomY, red)
  const randomX1 = Math.floor(Math.random() * 13);
  const randomY1 = Math.floor(Math.random() * 9);
  addSprite(randomX1, randomY1, red)
  const randomX3 = Math.floor(Math.random() * 13);
  const randomY3 = Math.floor(Math.random() * 9);
  clearTile(randomX3, randomY3)
  addSprite(randomX3, randomY3, grey)
  addSprite(randomX3, randomY3, purple)
  addText("Level " + ingameLevel, {
    x: 1,
    y: 14,
    color: color`.`
  })
}

  function level4(){
        clearText()
    addSprite(5, 4, player);

  const randomX = Math.floor(Math.random() * 13);
  const randomY = Math.floor(Math.random() * 9);
  addSprite(randomX, randomY, red)
  const randomX1 = Math.floor(Math.random() * 13);
  const randomY1 = Math.floor(Math.random() * 9);
  addSprite(randomX1, randomY1, red)
  const randomX2 = Math.floor(Math.random() * 13);
  const randomY2 = Math.floor(Math.random() * 9);
  addSprite(randomX2, randomY2, brown)
  const randomX4 = Math.floor(Math.random() * 13);
  const randomY4 = Math.floor(Math.random() * 9);
  addSprite(randomX4, randomY4, brown)
  const randomX3 = Math.floor(Math.random() * 13);
  const randomY3 = Math.floor(Math.random() * 9);
  clearTile(randomX3, randomY3)
  addSprite(randomX3, randomY3, grey)
  addSprite(randomX3, randomY3, gold)
  addText("Level " + ingameLevel, {
    x: 1,
    y: 14,
    color: color`.`
  })
    swapTimer(level_4_swap_interval_seconds)
  }
  

  function checkSelection() {
    const playerSprite = getFirst(player);
    const greenSprites = getAll(green)
    for (const greenSprite of greenSprites) {
      if (playerSprite.x === greenSprite.x && playerSprite.y === greenSprite.y) {
        level = 1;
        setMap(levels[level])
        level1()
      }
    }
    const blueSprites = getAll(blue)
    for (const blueSprite of blueSprites) {
      if (playerSprite.x === blueSprite.x && playerSprite.y === blueSprite.y) {
        level = 2;
        setMap(levels[level])
        level2()
      }
    }
        const purpleSprites = getAll(purple)
    for (const purpleSprite of purpleSprites) {
      if (playerSprite.x === purpleSprite.x && playerSprite.y === purpleSprite.y) {
        level = 3;
        setMap(levels[level])
        level3()
      }
    }
            const goldSprites = getAll(gold)
    for (const goldSprite of goldSprites) {
      if (playerSprite.x === goldSprite.x && playerSprite.y === goldSprite.y) {
        level = 4;
        setMap(levels[level])
        level4()
      }
    }
    
  }

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
      for (let i = 0; i < ingameLevel * 2 - 2; i++) {
        const randomX = Math.floor((Math.random() * 11)+1);
        const randomY = Math.floor(Math.random() * 9);
        addSprite(randomX, randomY, red)
      }

      const randomX = Math.floor((Math.random() * 11)+1);
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX, randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, green)

      if (playerSprite.x === randomX && playerSprite.y === randomY) {
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x, playerSprite1.y)
      addSprite(playerSprite1.x, playerSprite1.y, grey)
      addSprite(playerSprite1.x, playerSprite1.y, player)
      addText("Level " + ingameLevel, {
        x: 1,
        y: 14,
        color: color`.`
      })
      startTimer()


    }
    for (const redSprite of redSprites) {
      if (playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false) {
        resetTimer()
        clearText()
        addText("Game Over! Lvl " + ingameLevel, {
          x: 1,
          y: 14,
          color: color`.`
        })
        gameOver = true;
      }
    }
  }

  function checkBlue() {
    const playerSprite = getFirst(player);
    const blueSprite = getFirst(blue);
    const redSprites = getAll(red)
    if (playerSprite.x === blueSprite.x && playerSprite.y === blueSprite.y && gameOver === false) {
      resetTimer()
      blueSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      ingameLevel += 1
      for (let i = 0; i < ingameLevel * 2; i++) {
        const randomX = Math.floor((Math.random() * 13));
        const randomY = Math.floor(Math.random() * 9);
        addSprite(randomX, randomY, red)
      }

      const randomX = Math.floor((Math.random() * 13));
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX, randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, blue)

      if (playerSprite.x === randomX && playerSprite.y === randomY) {
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x, playerSprite1.y)
      addSprite(playerSprite1.x, playerSprite1.y, grey)
      addSprite(playerSprite1.x, playerSprite1.y, player)
      addText("Level " + ingameLevel, {
        x: 1,
        y: 14,
        color: color`.`
      })
      startTimer()


    }
    for (const redSprite of redSprites) {
      if (playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false) {
        resetTimer()
        clearText()
        addText("Game Over! Lvl " + ingameLevel, {
          x: 1,
          y: 14,
          color: color`.`
        })
        gameOver = true;
      }
    }
  }

  function checkPurple() {
    const playerSprite = getFirst(player);
    const purpleSprite = getFirst(purple);
    const redSprites = getAll(red)
    if (playerSprite.x === purpleSprite.x && playerSprite.y === purpleSprite.y && gameOver === false) {
      resetTimer()
      purpleSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      ingameLevel += 1
      for (let i = 0; i < ingameLevel * 2; i++) {
        const randomX = Math.floor((Math.random() * 13));
        const randomY = Math.floor(Math.random() * 9);
        addSprite(randomX, randomY, red)
      }

      const randomX = Math.floor((Math.random() * 13));
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX, randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, purple)

      if (playerSprite.x === randomX && playerSprite.y === randomY) {
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x, playerSprite1.y)
      addSprite(playerSprite1.x, playerSprite1.y, grey)
      addSprite(playerSprite1.x, playerSprite1.y, player)
      addText("Level " + ingameLevel, {
        x: 1,
        y: 14,
        color: color`.`
      })
      startTimer(5)


    }
    for (const redSprite of redSprites) {
      if (playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false) {
        resetTimer(5)
        clearText()
        addText("Game Over! Lvl " + ingameLevel, {
          x: 1,
          y: 14,
          color: color`.`
        })
        gameOver = true;
      }
    }
  }

  function checkGold(){
    const playerSprite = getFirst(player);
    const goldSprite = getFirst(gold);
    const redSprites = getAll(red)
    const brownSprites = getAll(brown)
    if (playerSprite.x === goldSprite.x && playerSprite.y === goldSprite.y && gameOver === false) {
      resetTimer()
      goldSprite.remove()
      for (const redSprite of redSprites) {
        redSprite.remove()
      }
      for(const brownSprite of brownSprites){
        brownSprite.remove()
      }
      ingameLevel += 1
      for (let i = 0; i < ingameLevel * 2; i++) {
        const randomX = Math.floor((Math.random() * 13));
        const randomY = Math.floor(Math.random() * 9);
        addSprite(randomX, randomY, red)
        const randomX2 = Math.floor((Math.random() * 13));
        const randomY2 = Math.floor(Math.random() * 9);
        addSprite(randomX2, randomY2, brown)
      }
      

      const randomX = Math.floor((Math.random() * 13));
      const randomY = Math.floor(Math.random() * 9);
      clearTile(randomX, randomY)
      addSprite(randomX, randomY, grey)
      addSprite(randomX, randomY, gold)

      if (playerSprite.x === randomX && playerSprite.y === randomY) {
        getFirst(player).x = 5
        getFirst(player).y = 4
      }
      const playerSprite1 = getFirst(player)
      clearTile(playerSprite1.x, playerSprite1.y)
      addSprite(playerSprite1.x, playerSprite1.y, grey)
      addSprite(playerSprite1.x, playerSprite1.y, player)
      addText("Level " + ingameLevel, {
        x: 1,
        y: 14,
        color: color`.`
      })
      resetSwapTimer()
      startTimer(5)
      swapTimer(level_4_swap_interval_seconds)


    }
    for (const redSprite of redSprites) {
      if (playerSprite.x === redSprite.x && playerSprite.y === redSprite.y && gameOver === false) {
        resetTimer(5)
        resetSwapTimer()
        clearText()
        addText("Game Over! Lvl " + ingameLevel, {
          x: 1,
          y: 14,
          color: color`.`
        })
        gameOver = true;
      }
    }
  }

  function startTimer(s) {
    timer = s;
    if(timer > 9){
    addText(timer.toString(), {
      x: 17,
      y: 14,
      color: color`.`
    })
    } else{
      addText("0" + timer.toString(), {
        x: 17,
        y: 14,
        color: color`.`
      })
    }
    countdownInterval = setInterval(() => {
      timer--;
      addText("0" + timer.toString(), {
        x: 17,
        y: 14,
        color: color`.`
      })
      if (timer === 0) {
        clearInterval(countdownInterval);
        clearText()
        addText("Game OVER! Lvl " + ingameLevel, {
          x: 1,
          y: 14,
          color: color`.`
        })
        gameOver = true;
      }
    }, 1000);
  }

  function resetTimer(s) {
    clearInterval(countdownInterval);
    timer = s;
  }

  function swapTimer(s){
    stimer = s;
    swapInterval = setInterval(() => {
      stimer--;
      if (stimer === 0) {
        clearInterval(swapInterval);
        const redSprites = getAll(red)
        const brownSprites = getAll(brown)
        for(const brownSprite of brownSprites){
          addSprite(brownSprite.x,brownSprite.y,red)
          brownSprite.remove()
        }
        for(const redSprite of redSprites){
          addSprite(redSprite.x,redSprite.y,brown)
          redSprite.remove()
        }
        swapTimer(s)
      }
    }, 1000);
  }

    function resetSwapTimer(s) {
    clearInterval(swapInterval);
  }

