var factories = [[0, 0], [9, 9], [3, 4], [8, 2], [0, 4], [7, 6]];
var metal = [[3, 5], [6, 2], [3, 2], [8, 6], [1, 2], [0, 8]];
var turn = "player1";
var player1 = 0;
var player2 = 0;
var allNodes = factories.concat(metal);
var armyCounts = Array(factories.length);
var armyCountsCalc = Array(factories.length);
var movementFromFactory = Array(factories.length);
var p1metal = 0,
  p2metal = 0,
  p1factories = 1,
  p2factories = 1;

function setup() {
  // put setup code here
  var canvas = createCanvas(401, 401);
  canvas.id("canvas");
  armyCounts[0] = 100;
  armyCounts[1] = -100;
  for (var i = 2; i < allNodes.length; i++) {
    armyCounts[i] = 0;
  }
  noFill();
  printGame();
}

function draw() {
  // put drawing code here
  if (turn === "player1") {
    if (armyCounts[player1] <= 0) {
      player1++;
    }
    if (player1 < factories.length) {
      document.getElementById("text").innerHTML =
        "Player One's Turn... " +
        "<br><br>" +
        "Where would you like your factory at " +
        "(" +
        (factories[player1][0] + 1).toString() +
        ", " +
        (factories[player1][1] + 1).toString() +
        ") " +
        "to move to?";
    } else {
      player1 = 0;
      turn = "player2";
    }
  } else if (turn === "player2") {
    if (armyCounts[player2] >= 0) {
      player2++;
    }
    if (player2 < factories.length) {
      document.getElementById("text").innerHTML =
        "Player Two's Turn... " +
        "<br><br>" +
        "Where would you like your factory at " +
        "(" +
        (factories[player2][0] + 1).toString() +
        ", " +
        (factories[player2][1] + 1).toString() +
        ") " +
        "to move to?";
    } else {
      player2 = 0;
      turn = "endOfTurn";
    }
  }
  if (turn === "endOfTurn") {
    printGame();
    drawMovementLines();
    calculateMetalAndFactoryCounts();
    calculateArmyCounts();
    drawArmyCount();
    turn = "player1";
    console.log(armyCounts);
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
}

function calculateArmyCounts() {
  armyCountsCalc = armyCounts.slice();
  for (var i = 0; i < factories.length; i++) {
    console.log(armyCountsCalc);
    if (armyCounts[i] > 0) {
      console.log(armyCounts, i);
      console.log(armyCounts[i]);
      // console.log(movementFromFactory[i]);
      var distance = Math.sqrt(
        (allNodes[i][0] - allNodes[movementFromFactory[i]][0]) ** 2 +
          (allNodes[i][1] - allNodes[movementFromFactory[i]][1]) ** 2
      );
      console.log(distance);
      armyCountsCalc[movementFromFactory[i]] =
        armyCounts[movementFromFactory[i]] +
        (100 + p1metal * 50) / p1factories / (distance + 1);
    }
    if (armyCounts[i] < 0) {
      var distance = Math.sqrt(
        (allNodes[i][0] - allNodes[movementFromFactory[i]][0]) ** 2 +
          (allNodes[i][1] - allNodes[movementFromFactory[i]][1]) ** 2
      );
      console.log(distance);
      armyCountsCalc[movementFromFactory[i]] =
        armyCountsCalc[movementFromFactory[i]] -
        (100 + p2metal * 50) / p2factories / (distance + 1);
      console.log(armyCountsCalc[movementFromFactory[i]]);
    }
  }
  armyCounts = armyCountsCalc.slice();
}

function printGame() {
  stroke(0);
  background(250);
  drawGrid();
  drawFactories();
  drawMetal();
}

function drawArmyCount() {
  for (var i = 0; i < armyCounts.length; i++) {
    if (i < factories.length) {
      textSize(10);
      if (armyCounts[i] > 0) {
        stroke(255, 0, 0);
      } else if (armyCounts[i] < 0) {
        stroke(0, 255, 0);
      } else {
        stroke(0);
      }
      if (armyCounts[i] !== 0) {
        text(
          Math.floor(Math.abs(armyCounts[i])),
          factories[i][0] * 40,
          factories[i][1] * 40 + 30,
          (factories[i][0] + 1) * 40,
          factories[i][1] * 40 + 30
        );
      }
    } else {
      textSize(10);
      if (armyCounts[i] > 0) {
        stroke(255, 0, 0);
      } else if (armyCounts[i] < 0) {
        stroke(0, 255, 0);
      } else {
        stroke(0);
      }
      if (armyCounts[i] !== 0) {
        var j = i - factories.length;
        text(
          Math.floor(Math.abs(armyCounts[i])),
          metal[j][0] * 40,
          metal[j][1] * 40 + 30,
          (metal[j][0] + 1) * 40,
          metal[j][1] * 40 + 30
        );
      }
    }
  }
}

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

function selectClicked() {
  var x = document.getElementById("X").value;
  var y = document.getElementById("Y").value;
  var nodeToAttack = -1;
  for (var index = 0; index < allNodes.length; index++) {
    if (
      allNodes[index][0] === parseInt(x) - 1 &&
      allNodes[index][1] === parseInt(y) - 1
    ) {
      nodeToAttack = index;
      break;
    }
  }
  if (nodeToAttack > -1) {
    if (turn === "player1") {
      movementFromFactory[player1] = nodeToAttack;
      if (player1 < factories.length) {
        player1++;
      } else {
        turn = "player2";
        player1 = 0;
      }
    } else if (turn === "player2") {
      movementFromFactory[player2] = nodeToAttack;
      if (player2 < factories.length) {
        player2++;
      } else {
        turn = "endOfTurn";
        player2 = 0;
      }
    }
  }
  printGame();
  drawArmyCount();
  document.getElementById("X").value = "";
  document.getElementById("Y").value = "";
}

function Changed() {
  var x = parseInt(document.getElementById("X").value);
  var y = parseInt(document.getElementById("Y").value);
  printGame();
  drawArmyCount();
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
