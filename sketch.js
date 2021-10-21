let circ;
let running;
var left = 1
var right = 1
// states = (Array(100 - prob * 100).fill(-1)).concat((Array(prob * 100).fill(1)))
function setup() {
  canvas = createCanvas(800, 800);
  input = createInput("Kugeln Links,Kugeln Rechts");
  input.position(20, 65);
  button = createButton("setup")
  button.position(20, 90)
  button.mousePressed(calc)
  stepButton = createButton("Step")
  stepButton.mousePressed(step)
  runButton = createButton("Run")
  runButton.mousePressed(run)
  stopButton = createButton("stop")
  stopButton.mousePressed(stop)

  noLoop();
}
function stop() {
  running = false
}
async function run() {
  running = true
  while (running) {
    step()
    await new Promise(r => setTimeout(r, 100))
  }
}
function step() {
  n = left + right
  l1 = parseInt(10_000 - (left / n) * 10_000)
  l2 = parseInt(left / n * 10_000)
  states = (Array(l1).fill(1)).concat((Array(l2).fill(0)))
  if (random(states) == 1) {
    left += 1
    right -= 1
  }
  else {
    left -= 1
    right += 1
  }
  buckets(left, right)
}


function calc() {
  k = 1
  inp = input.value().split(",")
  left = parseInt(inp[0])
  right = parseInt(inp[1])
  buckets(left, right)

}
function buckets(l, r) {
  strokeWeight(2)
  background(0)
  stroke(255)
  // walls   
  height = 700 - 280
  width = 270
  line(100, 700, 100, 280)
  line(400, 700, 400, 280)
  line(700, 700, 700, 280)
  // bottom
  line(100, 700, 700, 700)
  posY = 680
  posX = 130
  for (const j of Array.from({ length: l }, (x, i) => i)) {
    posX = 130 + (j * 30) % 270
    posY = 680 - floor((j * 30) / 270) * 30
    circle(posX, posY, 20)
  }

  for (const j of Array.from({ length: r }, (x, i) => i)) {
    posX = 430 + (j * 30) % 270
    posY = 680 - floor((j * 30) / 270) * 30
    circle(posX, posY, 20)
  }
}
function draw() {
}
