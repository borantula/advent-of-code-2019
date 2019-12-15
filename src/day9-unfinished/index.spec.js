// jest.mock(".");
// import { runOpcode, IntcodeComputer } from ".";
import { data as day5data } from "../day5/data";

const { IntcodeComputer } = jest.requireActual(".");
const noInputSelfCopy = [
  109,
  1,
  204,
  -1,
  1001,
  100,
  1,
  100,
  1008,
  100,
  16,
  101,
  1006,
  101,
  0,
  99
];
const programWithParam = [1002, 4, 3, 4, 33];
const digit16Output = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
const middleOutput = [104, 1125899906842624, 99];
const t = new Array(3000).fill(0);
let bigArray = [109, 19, 204, -34, 99, ...t];
bigArray[1985] = 123;

test("param 9", () => {
  const computer = new IntcodeComputer(bigArray, 1);

  computer.relativeBase = 2000;
  computer.run();

  expect(computer.opcode.length).toBe(bigArray.length);
  expect(computer.getOpcode()[1985]).toBe(123);
});
// test("noInputSelfCopy", () => {
//   const computer = new IntcodeComputer(noInputSelfCopy);

//   computer.run();

//   expect(computer.getOpcode()).toBe(noInputSelfCopy);
// });

// test("digit16Output", () => {
//   const result = runOpcode(digit16Output);
//   expect(String(result).length).toEqual(16);
// });

// test("middleOutput", () => {
//   expect(runOpcode(middleOutput)).toBe(middleOutput[1]);
// });

// test("parameter mode", () => {
//   expect(runOpcode(programWithParam)[4]).toBe(99);
// });

// test("parameter mode", () => {
//   const result = runOpcode([1101, 100, -1, 4, 0]);

//   expect(result).toBe(0);
// });
