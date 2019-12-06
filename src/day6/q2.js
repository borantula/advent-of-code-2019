import { spaceThings } from "./q1";
import intersection from "lodash/intersection";

export function getOrbitalTree(spaceThings, planetBody) {
  const parent = spaceThings[planetBody];
  if (!parent) {
    return [];
  }

  return [parent, ...getOrbitalTree(spaceThings, parent)];
}

export function findFirstCommonAncestor(spaceThings, planetBody1, planetBody2) {
  const tree1 = getOrbitalTree(spaceThings, planetBody1);
  const tree2 = getOrbitalTree(spaceThings, planetBody2);

  const intersect = intersection(tree1, tree2);
  const firstCommon = intersect ? intersect[0] : false;
  if (!firstCommon) {
    return false;
  }

  const i1 = tree1.indexOf(firstCommon);
  const i2 = tree2.indexOf(firstCommon);

  return i1 + i2;
}

console.log(
  "steps needed:",
  findFirstCommonAncestor(spaceThings, "YOU", "SAN")
);
