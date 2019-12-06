import { parseLinesToArray } from "../utils";
import { data } from "./data";

export function parseOrbitPairs(orbitList) {
  return orbitList.map(el => el.split(")", 2).reverse());
}

export function createOrbitMaps(orbits) {
  return orbits.reduce((spaceThingsPrev, current) => {
    const key = current[0];
    return { ...spaceThingsPrev, [key]: current[1] };
  }, {});
}

export function countOrbitOfPlanetBody(spaceThings, planetBody) {
  const parent = spaceThings[planetBody];
  if (!parent) {
    return 0;
  }

  return 1 + countOrbitOfPlanetBody(spaceThings, parent);
}

export function calculateTotalOrbits(spaceThings) {
  return Object.keys(spaceThings).reduce((total, spaceThing) => {
    return total + countOrbitOfPlanetBody(spaceThings, spaceThing);
  }, 0);
}

const parsed = parseOrbitPairs(parseLinesToArray(data));
const spaceThings = createOrbitMaps(parsed);
console.log(calculateTotalOrbits(spaceThings));
