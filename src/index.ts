import State from './state'
import { Vector } from './math'
import { clearCanvas, drawGrid, fillCell } from './render'
import Player from './player'
import "./GlobalTypes";
import treantSrc from "../www/images/Treant.png";
import rogueSrc from "../www/images/BloodRogue.png"

//Updating verification
console.log("Looking for an honest man")
//Page State
let canvas = <HTMLCanvasElement> document.getElementById("canvas1")
let c = canvas.getContext("2d")
let canvasSize = new Vector(canvas.clientWidth, canvas.clientHeight)
let treant = new Image()
treant.src = treantSrc
let rogue = new Image()
rogue.src = rogueSrc

//State Declaration
let state = new State(10, 10)
state.map.size = canvasSize
state.input.watchCursor()
state.input.watchMouse()
state.input.watchKeys()

let playerMain = new Player(new Vector(0, 0), new Vector(1, 1))

//random terrain switch
let randomTerrain = 1
if (randomTerrain) {
  state.map.randomize(0.3)
} else {
  //custom map
  state.map.setBlock(new Vector(2, 2), new Vector(4, 4), 1)
}

//State Change
function update() {
  //useless and fun mouse centering display
  // state.map.pos = state.input.cursor.subtract(canvasSize.multiply(0.5))
  if (state.input.keys.get("a")) {
    state.map.pos = state.map.pos.subtract(new Vector(10, 0))
  }
  if (state.input.keys.get("d")) {
    state.map.pos = state.map.pos.add(new Vector(10, 0))
  }
  if (state.input.keys.get("s")) {
    state.map.pos = state.map.pos.add(new Vector(0, 10))
  }
  if (state.input.keys.get("w")) {
    state.map.pos = state.map.pos.subtract(new Vector(0, 10))
  }
  //onclick player movement
  if (state.input.mouse.get(0)) {
    let cell = state.map.pick(state.input.cursor)
    if (state.map.containsCell(cell)) {
      if (state.map.content[cell.y][cell.x].content == 0) {
        playerMain.pos = cell
      }
    }
  }
}
//State Display
function render() {
  clearCanvas()
  drawGrid(state.map)
  //draws player
  fillCell(playerMain.pos, state.map, "red")
  // c.drawImage(treant, 0, 0, 300, 300)
  let playerCell = playerMain.pos.cross(state.map.tileSize); 
  c.drawImage(rogue, playerCell.x, playerCell.y, 50, 50)
  c.drawImage(treant, 100, 100, 100, 100)
}
//State Reload
function reload() {
  update()
  render()
  window.requestAnimationFrame(reload)
}
reload()
