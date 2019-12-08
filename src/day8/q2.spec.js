import { createFinalImage } from "./q2";

const imageData = "0222112222120000";
const width = 2;
const height = 2;
test("Final Image", () => {
  expect(createFinalImage("0222112222120000", width, height)).toEqual(
    expect.arrayContaining([
      [
        [0, 1],
        [1, 0]
      ]
    ])
  );
});
