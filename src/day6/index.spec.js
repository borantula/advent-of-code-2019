import { parseLinesToArray } from "../utils";
import {
  parseOrbitPairs,
  createOrbitMaps,
  countOrbitOfPlanetBody,
  calculateTotalOrbits
} from "./q1";

const data = `
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const transferData = `
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

const parsed = parseOrbitPairs(parseLinesToArray(data));
test("parseOrbitPairs", () => {
  expect(parsed).toHaveLength(11);

  expect(parsed).toEqual(
    expect.arrayContaining([
      ["B", "COM"],
      ["K", "J"]
    ])
  );
});

test("createOrbitMaps", () => {
  const orbitMaps = createOrbitMaps(parsed);

  expect(orbitMaps["B"]).toEqual("COM");
  expect(orbitMaps["C"]).toEqual("B");
  expect(orbitMaps["K"]).toEqual("J");
});

test("countOrbitOfPlanetBody", () => {
  const orbitMaps = createOrbitMaps(parsed);

  expect(countOrbitOfPlanetBody(orbitMaps, "L")).toEqual(7);
  expect(countOrbitOfPlanetBody(orbitMaps, "D")).toEqual(3);
  expect(countOrbitOfPlanetBody(orbitMaps, "COM")).toEqual(0);
});

test("calculateTotalOrbits", () => {
  const orbitMaps = createOrbitMaps(parsed);

  expect(calculateTotalOrbits(orbitMaps)).toBe(42);
});
