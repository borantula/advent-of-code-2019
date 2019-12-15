jest.mock(".");
// import { runOpcode } from ".";
// import { IntcodeComputer } from "../day9";
const { IntcodeComputer } = jest.requireActual("../day9");
const program = "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(e => Number(e));
const programWithParam = "1002,4,3,4,33".split(",");

// return 0 for 0, 1 for non 0
const opcode1 = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
const opcode2 = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
const opcode3 = [
  3,
  21,
  1008,
  21,
  8,
  20,
  1005,
  20,
  22,
  107,
  8,
  21,
  20,
  1006,
  20,
  31,
  1106,
  0,
  36,
  98,
  0,
  0,
  1002,
  21,
  125,
  20,
  4,
  20,
  1105,
  1,
  46,
  104,
  999,
  1105,
  1,
  46,
  1101,
  1000,
  1,
  20,
  4,
  20,
  1105,
  1,
  46,
  98,
  99
];

test("parameter mode", () => {
  const computer = new IntcodeComputer([1101, 100, -1, 4, 0], 7);
  computer.run();
  expect(computer.getOutput()).toBe(0);
});

test("outputs 0", () => {
  const computer = new IntcodeComputer(opcode1, 0);
  computer.run();
  expect(computer.getOutput()).toBe(0);
});

test("outputs 1", () => {
  const computer = new IntcodeComputer(opcode1, 12);
  computer.run();
  expect(computer.getOutput()).toBe(1);
});

test("outputs 0", () => {
  const computer = new IntcodeComputer(opcode2, 0);
  computer.run();
  expect(computer.getOutput()).toBe(0);
});
test("outputs 1", () => {
  const computer = new IntcodeComputer(opcode2, 7);
  computer.run();
  expect(computer.getOutput()).toBe(1);
});

// test("parameter mode", () => {
//   expect(runOpcode(programWithParam)).toBe(0);
// });
