// references: https://editor.p5js.org/chjno/sketches/BkbTpyojZ
let heartrates;
function preload() {
  heartrates = loadJSON("heart-rate.json");
}

function setup() {
  console.log(heartrates);
  createCanvas(400, 400);
  background(0);
}

var outerDiam = 0;
var iteratorDirection = 1;
function draw() {
  for (hr of heartrates.data) {
    var color = iteratorDirection > 0 ? 255 : 0;
    drawEllipseForHr(hr.value.bpm + outerDiam, color + outerDiam);
    //     var diam = outerDiam - 30 * hr.value.bpm
    //     console.log(diam)
    //     if (diam > 0) {
    //       var fade = map(diam, 0, width, 0, 255);
    //       stroke(fade);
    //       noFill();
    //       ellipse(200, 200, diam); 
    //     }

    // console.log(hr.value.bpm)
  }

  outerDiam = outerDiam + 2 * iteratorDirection;
  if (outerDiam >= 400 || outerDiam <= 1) {
    iteratorDirection = iteratorDirection * -1;
  }
}

function drawEllipseForHr(diam, color) {
  var fade = map(diam, 0, width, 0, color);
  stroke(fade);
  noFill();
  ellipse(200, 200, diam);
}
