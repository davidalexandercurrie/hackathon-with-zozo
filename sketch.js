var nodes = new Array(10);
for (var i = 0; i < nodes.length; i++) {
  nodes[i] = new Array(10);
  for (var j = 0; j < nodes[i].length; j++) {
    var nodeType = Math.floor(Math.random() * 10);
    nodes[i][j] = {
      nodeType:
        nodeType === 0
          ? "factory"
          : nodeType === (1 || 2)
          ? "energy"
          : nodeType >= 3 && nodeType <= 6
          ? "metal"
          : "none",
      count: 0,
      attacking: {
        x: "",
        y: ""
      },
      pos: {
        x: i,
        y: j
      }
    };
  }
}
var turn = "startGame";
var turnNumber = 0;
var player1 = 0;
var player2 = 0;
// var allNodes = factories.concat(metal);
// var armyCounts = Array(factories.length);
// var armyCountsCalc = Array(factories.length);
// var movementFromFactory = Array(factories.length);
var p1metal = 0,
  p2metal = 0,
  p1factories = 1,
  p2factories = 1;

function setup() {
  // put setup code here
  var canvas = createCanvas(401, 401);
  let canvasContainer = document.getElementById("canvas");
  canvas.parent(canvasContainer);
  noFill();
  printGame();
}

function draw() {
  // if(turn === "startgame"){
  //   while(startingPosition)
  // }
  // if (turn === "player1") {
  //   turnNumber++;
  //   if (armyCounts[player1] <= 0) {
  //     player1++;
  //   }
  //   if (player1 < factories.length) {
  //     playTurn("player1");
  //   } else {
  //     player1 = 0;
  //     turn = "player2";
  //   }
  // } else if (turn === "player2") {
  //   if (armyCounts[player2] >= 0) {
  //     player2++;
  //   }
  //   if (player2 < factories.length) {
  //     playTurn("player2");
  //   } else {
  //     player2 = 0;
  //     turn = "endOfTurn";
  //   }
  // }
  // if (turn === "endOfTurn") {
  //   printGame();
  //   // drawMovementLines();
  //   // calculateMetalAndFactoryCounts();
  //   // calculateArmyCounts();
  //   // drawArmyCount();
  //   turn = "player1";
  // }
  if (turn === "startGame") {
    console.log("game is starting");
    turn = "player1";
  } else if (turn === "player1" || turn === "player2") {
    // playTurn(turn);
  }
}

function startButton() {
  turn = "player1";
}

function playTurn(player) {
  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes[i].length; j++) {
      document.getElementById("text").innerHTML =
        (player === "player1" ? "Player One's" : "Player Two's") +
        " Turn... " +
        "<br><br>" +
        "Where would you like your factory at " +
        "(" +
        i.toString() +
        ", " +
        j.toString() +
        ") " +
        "to move to?";
    }
  }
}

function drawMovementLines() {
  for (var i = 0; i < factories.length; i++) {
    if (armyCounts[i] > 0) {
      stroke(255, 0, 0);
      line(
        factories[i][0] * 40 + 20,
        factories[i][1] * 40 + 20,
        allNodes[movementFromFactory[i]][0] * 40 + 20,
        allNodes[movementFromFactory[i]][1] * 40 + 20
      );
    } else if (armyCounts[i] < 0) {
      stroke(0, 255, 0);
      line(
        factories[i][0] * 40 + 20,
        factories[i][1] * 40 + 20,
        allNodes[movementFromFactory[i]][0] * 40 + 20,
        allNodes[movementFromFactory[i]][1] * 40 + 20
      );
    }
  }
}

function calculateMetalAndFactoryCounts() {
  p1metal = 0;
  p2metal = 0;
  p1factories = 1;
  p2factories = 1;
  for (var i = 2; i < armyCounts.length; i++) {
    if (i < factories.length) {
      if (armyCounts[i] > 0) {
        p1factories++;
      } else if (armyCounts[i] < 0) {
        p2factories++;
      }
    } else {
      if (armyCounts[i] > 0) {
        p1metal++;
      } else if (armyCounts[i] < 0) {
        p2metal++;
      }
    }
  }
  document.getElementById("p1metal").innerHTML =
    "Metal: " + (100 + p1metal * 50).toString();
  document.getElementById("p2metal").innerHTML =
    "Metal: " + (100 + p2metal * 50).toString();
}

function calculateArmyCounts() {
  armyCountsCalc = armyCounts.slice();
  for (var i = 0; i < factories.length; i++) {
    if (armyCounts[i] > 0) {
      // console.log(movementFromFactory[i]);
      var distance = Math.sqrt(
        (allNodes[i][0] - allNodes[movementFromFactory[i]][0]) ** 2 +
          (allNodes[i][1] - allNodes[movementFromFactory[i]][1]) ** 2
      );
      armyCountsCalc[movementFromFactory[i]] =
        armyCounts[movementFromFactory[i]] +
        (100 + p1metal * 50) / p1factories / (distance + 1);
    }
    if (armyCounts[i] < 0) {
      var distance = Math.sqrt(
        (allNodes[i][0] - allNodes[movementFromFactory[i]][0]) ** 2 +
          (allNodes[i][1] - allNodes[movementFromFactory[i]][1]) ** 2
      );
      armyCountsCalc[movementFromFactory[i]] =
        armyCountsCalc[movementFromFactory[i]] -
        (100 + p2metal * 50) / p2factories / (distance + 1);
    }
  }
  armyCounts = armyCountsCalc.slice();
}

function printGame() {
  stroke(0);
  background(250);
  drawGrid();
  drawObjects();
}

function drawObjects() {
  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes[i].length; j++) {
      if (nodes[i][j].nodeType === "factory") {
        drawFactories(i, j);
      } else if (nodes[i][j].nodeType === "metal") {
        drawMetal(i, j);
      } else if (nodes[i][j].nodeType === "energy") {
        drawEnergy(i, j);
      }
    }
  }
}

function nodeCounts() {
  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; i < nodes[i].length; j++) {
      if (nodes[i][j].nodeType !== "none" && nodes[i][j].count > 0) {
      } else if (nodes[i][j].nodeType !== "none" && nodes[i][j].count < 0) {
      } else {
      }
    }
  }

  // for (var i = 0; i < armyCounts.length; i++) {
  //   if (i < factories.length) {
  //     textSize(10);
  //     if (armyCounts[i] > 0) {
  //       stroke(255, 0, 0);
  //     } else if (armyCounts[i] < 0) {
  //       stroke(0, 255, 0);
  //     } else {
  //       stroke(0);
  //     }
  //     if (armyCounts[i] !== 0) {
  //       text(
  //         Math.floor(Math.abs(armyCounts[i])),
  //         factories[i][0] * 40,
  //         factories[i][1] * 40 + 30,
  //         (factories[i][0] + 1) * 40,
  //         factories[i][1] * 40 + 30
  //       );
  //     }
  //   } else {
  //     textSize(10);
  //     if (armyCounts[i] > 0) {
  //       stroke(255, 0, 0);
  //     } else if (armyCounts[i] < 0) {
  //       stroke(0, 255, 0);
  //     } else {
  //       stroke(0);
  //     }
  //     if (armyCounts[i] !== 0) {
  //       var j = i - factories.length;
  //       text(
  //         Math.floor(Math.abs(armyCounts[i])),
  //         metal[j][0] * 40,
  //         metal[j][1] * 40 + 30,
  //         (metal[j][0] + 1) * 40,
  //         metal[j][1] * 40 + 30
  //       );
  //     }
  //   }
  // }
}

function drawFactories(i, j) {
  line(
    nodes[i][j].pos.x * 40,
    nodes[i][j].pos.y * 40,
    (nodes[i][j].pos.x + 1) * 40,
    (nodes[i][j].pos.y + 1) * 40
  );
  line(
    nodes[i][j].pos.x * 40,
    (nodes[i][j].pos.y + 1) * 40,
    (nodes[i][j].pos.x + 1) * 40,
    nodes[i][j].pos.y * 40
  );
}

function drawMetal(i, j) {
  ellipse(nodes[i][j].pos.x * 40 + 20, nodes[i][j].pos.y * 40 + 20, 20, 20);
}
function drawEnergy(i, j) {
  rectMode(CENTER);
  rect(nodes[i][j].pos.x * 40 + 20, nodes[i][j].pos.y * 40 + 20, 20, 20);
  rectMode(CORNER);
}

function drawGrid() {
  for (var i = 0; i < 11; i++) {
    line(0, i * 40, 400, i * 40);
    line(i * 40, 0, i * 40, 400);
  }
}

function selectClicked() {
  if (turn === "player1") {
    turn = "player2";
  } else {
    turn = "player1";
  }
  //   var x = document.getElementById("X").value;
  //   var y = document.getElementById("Y").value;

  //   nodes[i][j].attacking.pos.x = parseInt(x);
  //   nodes[i][j].attacking.pos.y = parseInt(y);

  //   printGame();
  //   drawArmyCount();
  //   document.getElementById("X").value = "";
  //   document.getElementById("Y").value = "";
}

function Changed() {
  var x = parseInt(document.getElementById("X").value);
  var y = parseInt(document.getElementById("Y").value);
  printGame();
  // drawArmyCount();
  if (turn === "player1") {
    stroke(0, 255, 255);
  } else {
    stroke(255, 255, 0);
  }
  strokeWeight(5);
  if (x && y) {
    rect((x - 1) * 40, (y - 1) * 40, 40, 40);
  } else if (x) {
    rect((x - 1) * 40, 0, 40, 400);
  } else if (y) {
    rect(0, (y - 1) * 40, 400, 40);
  }
  strokeWeight(1);
}
