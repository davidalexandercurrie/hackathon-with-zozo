var factories = [[0, 0], [9, 9], [3, 4], [8, 2], [0, 4]];
var metal = [[3, 5], [6, 2], [3, 2], [8, 6], [1, 2], [0, 8]];

function setup() {
  // put setup code here
  var canvas = createCanvas(401, 401);
  canvas.style("border", "2px solid black");
}

function draw() {
  // put drawing code here
  background(250);
  drawGrid();
  drawFactories();
  drawMetal();
  drawArmyCount();
}

function drawArmyCount() {}

function drawFactories() {
  for (var i = 0; i < factories.length; i++) {
    line(
      factories[i][0] * 40,
      factories[i][1] * 40,
      (factories[i][0] + 1) * 40,
      (factories[i][1] + 1) * 40
    );
    line(
      factories[i][0] * 40,
      (factories[i][1] + 1) * 40,
      (factories[i][0] + 1) * 40,
      factories[i][1] * 40
    );
  }
}

function drawMetal() {
  for (var i = 0; i < metal.length; i++) {
    ellipse(metal[i][0] * 40 + 20, metal[i][1] * 40 + 20, 20, 20);
  }
}

function drawGrid() {
  for (var i = 0; i < 11; i++) {
    line(0, i * 40, 400, i * 40);
    line(i * 40, 0, i * 40, 400);
  }
}
