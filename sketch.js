// Based on https://editor.p5js.org/ml5/sketches/PoseNet_webcam
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Resources:
// https://medium.com/@pallavi.ray24/saving-p5-js-sketches-as-videos-9376068afc10
// https://editor.p5js.org/odmundeetgen/sketches/qqmp0fVSK
/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(
    video,
    { maxPoseDetections: 1, architecture: "ResNet50" },
    modelReady
  );
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  background("black");
  // tint(255, 50); // Display at half opacity

  // image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawSkeleton();
  drawKeypoints();
  // saveCanvas('Img', 'png');
}

function importantKeypoint(keypoint) {
  const importantKeypoints = [
    "nose",
    "leftShoulder",
    "rightShoulder",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
  ];
  return importantKeypoints.indexOf(keypoint.part) != -1;
}

const blue = "#0000FF";
const magenta = "#FF00FF";
const purple = "#6900ff";
const allColors = [blue, magenta, purple];

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawRandomColorEllipse(x, y, w, h) {
  let fillColor = getRandomColor(allColors);
  fill(fillColor);
  noStroke();
  ellipse(x, y, w, h);
}

function getKeypointDiameter(keypoint) {
  if (keypoint.part == "nose") {
    return 100;
  }
  return 8;
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2

      if (keypoint.score > 0.2 && importantKeypoint(keypoint)) {
        keypointDiameter = getKeypointDiameter(keypoint);
        drawRandomColorEllipse(
          keypoint.position.x,
          keypoint.position.y,
          keypointDiameter,
          keypointDiameter
        );
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      let x1 = partA.position.x;
      let y1 = partA.position.y;
      let x2 = partB.position.x;
      let y2 = partB.position.y;
      stroke(255, 255, 255);
      strokeWeight(3);
      let randomColor1 = getRandomColor(allColors);
      let randomColor2 = getRandomColor(allColors);
      drawGradientLine(x1, y1, x2, y2, randomColor1, randomColor2);
    }
  }
}

function drawGradientLine(x1, y1, x2, y2, color1, color2) {
  var grad = drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  drawingContext.save();
  drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
}
/*
ideas:
* save the output into a csv file so i can recreate it later
*/
