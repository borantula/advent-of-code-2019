import { runOpcode } from ".";
const program = "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(e => Number(e));
const programWithParam = "1002,4,3,4,33".split(",");

test("normal mode", () => {
  expect(runOpcode(program)[0]).toBe(3500);
});

test("parameter mode", () => {
  expect(runOpcode(programWithParam)[0]).toBe(1002);
});

test("parameter mode", () => {
  const result = runOpcode([1101, 100, -1, 4, 0]);
  console.log(result);
  expect(result[4]).toBe(99);
});
