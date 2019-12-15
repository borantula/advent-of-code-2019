import { parseLinesToArray, calcAngleDegrees } from "../utils";

import uniq from "lodash/uniq";
import { data } from "./data";

export function createMapMatrix(data) {
  return parseLinesToArray(data).map(e => e.split(""));
}

export function gatherAsteroidCoordinatesMap(matrix) {
  //[X,Y] size or matrix
  const size = [matrix[0].length, matrix.length];

  let coordinates = [];

  for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
      if (matrix[y][x] !== ".") {
        coordinates[`${x}-${y}`] = getRatio([x, y]);
        // coordinates.push([x, y]);
      }
    }
  }
  return coordinates;
}

export function gatherAsteroidCoordinates(matrix) {
  //[X,Y] size or matrix
  const size = [matrix[0].length, matrix.length];

  let coordinates = [];

  for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
      if (matrix[y][x] !== ".") {
        // coordinates[`${x}-${y}`] = 1;
        coordinates.push([x, y]);
      }
    }
  }
  return coordinates;
}

export function getVisibleCountsMap(data) {
  const matrix = createMapMatrix(data);
  const coordMap = gatherAsteroidCoordinates(matrix);

  // console.log(coordMap);
  let visibleCounts = new Map();
  for (let i = 0; i < coordMap.length; i++) {
    const c1 = coordMap[i];
    const key = c1.join("-");
    for (let i2 = 0; i2 < coordMap.length; i2++) {
      const c2 = coordMap[i2];
      if (c1.join("-") === c2.join("-")) {
        continue;
      }
      const angle =
        Math.round(100 * calcAngleDegrees(c1[0] - c2[0], c1[1] - c2[1])) / 100;

      const angles = visibleCounts.get(key) || [];
      visibleCounts.set(key, uniq([...angles, angle]));
    }
  }

  return visibleCounts;
}

export function getAngleMap(coordMap, c1) {
  // console.log(coordMap);
  let angleMap = new Map();

  for (let i2 = 0; i2 < coordMap.length; i2++) {
    const c2 = coordMap[i2];
    if (c1.join("-") === c2.join("-")) {
      continue;
    }
    let angle =
      Math.round(100 * calcAngleDegrees(c1[0] - c2[0], c1[1] - c2[1])) / 100;

    angle = angle - 90;
    if (angle < 0) {
      angle = angle + 360;
    }

    const asteroids = angleMap.get(angle) || [];
    const key = Math.round(100 * angle) / 100;
    angleMap.set(key, [...asteroids, c2]);
  }

  return angleMap;
}

export function findBestVisible(data) {
  const visibleCounts = getVisibleCountsMap(data);
  let best;
  let bestCount = 0;
  visibleCounts.forEach((value, key, map) => {
    if (value.length > bestCount) {
      best = key;
      bestCount = value.length;
    }
  });

  return [best, bestCount];
}
export function calcDistanceBetween2Points(c1, c2) {
  return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2));
}

export function shootThemAllFromStation(data, stationCoordinates) {
  const matrix = createMapMatrix(data);
  let coordMap = gatherAsteroidCoordinates(matrix);

  let shootLogs = {};
  let shootCount = 0;

  while (coordMap.length > 1) {
    const angleMap = getAngleMap(coordMap, stationCoordinates);
    const angles = Array.from(angleMap.keys()).sort((a, b) => a - b);

    for (let i = 0; i < angles.length; i++) {
      const asteroids = angleMap.get(angles[i]);

      if (!asteroids) {
        continue;
      }

      const distances = asteroids.map(c2 =>
        calcDistanceBetween2Points(stationCoordinates, c2)
      );

      const closest = Math.min(...distances);
      const index = distances.findIndex(e => e === closest);
      const closestCoord = asteroids[index];

      // delete asteroid also delete from coordinates map
      asteroids.splice(index, 1);
      const indexInCoordMap = coordMap.findIndex(
        e => e[0] === closestCoord[0] && e[1] === closestCoord[1]
      );
      coordMap.splice(indexInCoordMap, 1);
      if (asteroids.length) {
        angleMap.set(angles[i], [...asteroids]);
      } else {
        angleMap.delete(angles[i]);
      }

      // console.log(closestCoord);
      shootCount++;
      shootLogs[shootCount] = closestCoord;
    }
  }

  return shootLogs;
}

console.log("PART1", findBestVisible(data));
const bestVisible = findBestVisible(data);
const station = bestVisible[0].split("").map(e => Number(e));
const shootLogs = shootThemAllFromStation(data, [26, 29]);
console.log(
  "PART2",
  shootLogs[200],
  shootLogs[200][0] * 100 + shootLogs[200][1]
);
