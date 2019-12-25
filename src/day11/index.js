import { IntcodeComputer } from "../day9";
import { data } from "./data";
import chunk from "lodash/chunk";

function runOne() {
  const computer = new IntcodeComputer(data, 0);
  const paintedCoordinates = hullRobot(computer);
  return Object.keys(paintedCoordinates).length;
}

function runTwo() {
  const computer = new IntcodeComputer(data, 1);
  const paintedCoordinates = hullRobot(computer);
  let coords = Object.keys(paintedCoordinates).map(e =>
    e.split(",").map(c => Number(c))
  );
  const yDiff = 0 - Math.min(...coords.map(e => e[1]));
  coords = coords.map(([x, y]) => [x, y + yDiff]);
  const biggestX = Math.max(...coords.map(e => e[0]));
  const biggestY = Math.max(...coords.map(e => e[1]));
  let matrix = makeEmptyMatrix(biggestX + 1, biggestY + 1);

  const coordinates = Object.keys(paintedCoordinates)
    .filter(el => paintedCoordinates[el] === 0)
    .map(el => el.split(",").map(e => Number(e)))
    .map(([x, y]) => [x, y + yDiff]);

  console.log(
    // matrix.length,
    matrix[1].length,
    coordinates.filter(a => a[1] === 0).length,
    coordinates.filter(a => a[1] === 1).length,
    coordinates.filter(a => a[1] === 2).length,
    coordinates.filter(a => a[1] === 3).length,
    coordinates.filter(a => a[1] === 4).length,
    coordinates.filter(a => a[1] === 5).length,
    coordinates.length,
    Object.keys(paintedCoordinates).length,
    coordinates.filter(a => a[1] === 1)
  );

  let c = 0;
  coordinates.forEach(el => {
    matrix[el[1]][el[0]] = ".";
    c++;
  });

  console.log(matrix[5].join(""));
  console.log(matrix[4].join(""));
  console.log(matrix[3].join(""));
  console.log(matrix[2].join(""));
  console.log(matrix[1].join(""));
  console.log(matrix[0].join(""));
}

function makeEmptyMatrix(x, y) {
  const row = Array.from({ length: x }, a => "#");
  return Array.from({ length: y }, a => [...row]);
}

function hullRobot(computer) {
  const paintedCoordinates = {};
  const colors = {
    0: "black",
    1: "white"
  };
  const directions = {
    0: "left",
    1: "right"
  };
  let currentCoordinate = [0, 0];
  let currentDir = "up";

  // console.log(computer.run(), computer.result);
  let c = 0;
  while (computer.run() === false) {
    c++;
    if (c === 20) {
      // break;
    }
    // console.log("res", computer.result, computer.result.length % 2);
    // get last outputs
    if (computer.result.length % 2 === 1) {
      // paint
      const [color] = computer.result.slice(-1);
      // console.log(`c-${c}:`, color);
      const coordinateIndex = currentCoordinate.join(",");
      // PAINT
      paintedCoordinates[coordinateIndex] = color;
    } else {
      // move
      const [toDirection] = computer.result.slice(-1);
      currentDir =
        toDirection === 0 ? turnLeft(currentDir) : turnRight(currentDir);
      // console.log(`d-${c}:`, toDirection, currentDir);
      currentCoordinate = getNextCoordinate(currentCoordinate, currentDir);

      const coordinateIndex = currentCoordinate.join(",");
      const newColor = paintedCoordinates.hasOwnProperty(coordinateIndex)
        ? paintedCoordinates[coordinateIndex]
        : 0;

      computer.setInput(newColor);
    }
  }

  // console.log(Object.keys(paintedCoordinates));
  return paintedCoordinates;
}

function turnLeft(currentDirection) {
  const map = {
    up: "left",
    left: "down",
    down: "right",
    right: "up"
  };
  return map[currentDirection];
}

function turnRight(currentDirection) {
  const map = {
    up: "right",
    left: "up",
    down: "left",
    right: "down"
  };
  return map[currentDirection];
}

function getNextCoordinate(c, direction) {
  switch (direction) {
    case "up":
      return [c[0], c[1] + 1];
    case "down":
      return [c[0], c[1] - 1];
    case "left":
      return [c[0] - 1, c[1]];
    case "right":
      return [c[0] + 1, c[1]];
  }
}

// runOne();
runTwo();
