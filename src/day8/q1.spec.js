import {
  createLayers,
  createRows,
  getCountsInLayers,
  findIndexWithLeastZero,
  createImageDataArray
} from "./q1";

const imageData = "123456789012";
const width = 3;
const height = 2;
const layers = createLayers(createImageDataArray(imageData), width, height);
const layersWithRows = createRows(layers, width);
const countedLayers = getCountsInLayers(layers, 0);
test("createLayers", () => {
  expect(layers).toEqual(
    expect.arrayContaining([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ])
  );
  expect(layersWithRows).toEqual(
    expect.arrayContaining([
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      [
        [7, 8, 9],
        [0, 1, 2]
      ]
    ])
  );
});

test("getZeroCounts with getCountsInLayers", () => {
  expect(countedLayers).toEqual([0, 1]);
});

test("findIndexWithLeastZero", () => {
  expect(findIndexWithLeastZero(countedLayers)).toBe(0);
});
