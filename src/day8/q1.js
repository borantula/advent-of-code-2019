import chunk from "lodash/chunk";
import { imgData } from "./data";
/**
 * 
Images are sent as a series of digits that each represent the color of a single pixel. 
The digits fill each row of the image left-to-right, then move downward to the next row, 
filling rows top-to-bottom until every pixel of the image is filled.  
 */
export function createImageDataArray(imgData) {
  return imgData.split("").map(e => Number(e));
}

export function createLayers(data, width, height) {
  const layers = chunk(data, width * height);
  return layers;
}
export function createRows(layers, width) {
  return layers.map(arr => chunk(arr, width));
}

export function getCountsInLayers(layers, number = 0) {
  const countedLayers = layers.map(
    layer => layer.filter(e => e === number).length
  );
  return countedLayers;
}

export function findIndexWithLeastZero(countedLayers) {
  const least = Math.min(...countedLayers);
  return countedLayers.indexOf(least);
}

function runQuestionOne() {
  const layers = createLayers(imgData, 25, 6);
  const leastIndex = findIndexWithLeastZero(getCountsInLayers(layers, 0));

  const oneCounts = getCountsInLayers(layers, 1);
  const twoCounts = getCountsInLayers(layers, 2);
  const answer = oneCounts[leastIndex] * twoCounts[leastIndex];
  console.log(`ANSWER: ${answer}`);
}

// runQuestionOne();
