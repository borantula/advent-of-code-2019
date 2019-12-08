import { createLayers, createImageDataArray, createRows } from "./q1";
import { imgData } from "./data";

export function createFinalImage(imageData, width, height) {
  const layers = createLayers(createImageDataArray(imageData), width, height);
  let finalLayer = [];
  for (let i = 0; i < layers[0].length; i++) {
    finalLayer[i] = getLastVisiblePixel(layers, i);
  }

  return createRows(createLayers(finalLayer, width, height), width);
}

export function getLastVisiblePixel(layers, index) {
  let pixel = 2;
  layers.forEach(layer => {
    if (pixel === 2 && layer[index] !== 2) {
      pixel = layer[index];
    }
  });

  return pixel;
}

console.log(createFinalImage(imgData, 25, 6));
