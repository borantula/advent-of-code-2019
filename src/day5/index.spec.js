import { runOpcode } from "./";
import { data } from "./data";
const program = "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(e => Number(e));
const programWithParam = "1002,4,3,4,33".split(",");

test("parameter mode", () => {
  const result = runOpcode(program, 5);
  console.log(result);
  expect(result).toBe(11981754);
});

test("parameter mode", () => {
  const result = runOpcode(programWithParam, 5);
  console.log(result);
  expect(result).toBe(11981754);
});
