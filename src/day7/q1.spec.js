import { testPrograms } from "./data";
import { runSequence, permute, findMostEfficientConfig } from "./q1";

test("testPrograms", () => {
  expect(runSequence(testPrograms[0].data, testPrograms[0].sequence)).toBe(
    testPrograms[0].maxOutput
  );
  expect(runSequence(testPrograms[1].data, testPrograms[1].sequence)).toBe(
    testPrograms[1].maxOutput
  );
});

test("findMostEfficientConfig", () => {
  expect(findMostEfficientConfig(testPrograms[0].data, [0, 1, 2, 3, 4])).toBe(
    testPrograms[0].maxOutput
  );

  expect(findMostEfficientConfig(testPrograms[1].data, [0, 1, 2, 3, 4])).toBe(
    testPrograms[1].maxOutput
  );

  expect(findMostEfficientConfig(testPrograms[2].data, [0, 1, 2, 3, 4])).toBe(
    testPrograms[2].maxOutput
  );
});

test("permute", () => {
  expect(permute([1, 2])).toEqual(
    expect.arrayContaining([
      [1, 2],
      [2, 1]
    ])
  );

  expect(permute([1, 2, 3])).toEqual(
    expect.arrayContaining([
      [1, 2, 3],
      [2, 1, 3],
      [1, 3, 2],
      [3, 1, 2]
    ])
  );
});
