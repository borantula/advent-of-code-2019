import { parseLinesToArray } from "../utils";

const d1 = `
#########
#b.A.@.a#
#########`;

function getMatrix(data) {
  return parseLinesToArray(data).map(e => e.split(""));
}

function findTheEntrance(matrix) {
  let y = 0;
  const x = matrix
    .find((e, i) => {
      const inc = e.includes("@");
      if (inc) {
        y = i;
      }
      return inc;
    })
    .findIndex(e => e === "@");
  return [x, y];
}

test("D1", () => {
  let matrix = getMatrix(d1);
  const entrance = findTheEntrance(matrix);
  console.log(matrix);
  console.log(entrance);
  const mapSize = [matrix[0].length, matrix.length];
});
