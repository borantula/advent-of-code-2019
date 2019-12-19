// import { data } from "./data";
import { data as day5data } from "../day5/data";

export class IntcodeComputer {
  constructor(opcode, input = 0) {
    this.input = input;
    this.output = undefined;
    this.relativeBase = 0;
    this.opcode = [...opcode];
    this.mode = 0;
    this.i = 0;
    this.relativeBase = 0;
    this.modeFunctions = {
      1: this.add,
      2: this.multiply,
      3: this.inputMode,
      4: this.outputMode,
      5: this.jumpForInequality,
      6: this.jumpForEquality,
      7: this.lessThan,
      8: this.equalsTo,
      // 9: this.setRelativeBase
      99: this.halt
    };
  }

  run() {
    let count = 0;
    while (true) {
      this.setMode();
      this.setInputs();
      this.setParameters();

      // console.log("a:", this.i, this.mode);
      const fn = this.modeFunctions[this.mode];
      if (!fn) {
        throw new Error(
          `Wrong Opcode ${this.mode} at index: ${
            this.i
          } and value of ${this.getCurrentOpcode()}`
        );
      }

      fn.apply(this);

      if (count === 500) {
        // break;
      }
      count++;

      if (this.mode === 99 || this.mode === 4) {
        break;
      }
    }

    if (this.mode === 99) {
      return true;
    }
    return false;
  }

  getOutput() {
    return this.output;
  }

  getOpcode() {
    return this.opcode;
  }

  getCurrentOpcode() {
    return this.opcode[this.i];
  }

  setMode() {
    this.mode = this.getCurrentOpcode() % 100;
  }

  setInputs() {
    this.input1 = this.opcode[this.i + 1];
    this.input2 = this.opcode[this.i + 2];
    this.input3 = this.opcode[this.i + 3];
  }

  setParameters() {
    // takes 1002 -> 2001 opcode and 010 are arg
    const args = [...String(this.getCurrentOpcode())].reverse();
    const a1 = Number(args[2]) || 0;
    const a2 = Number(args[3]) || 0;
    const a3 = Number(args[4]) || 0;

    this.param1 = this.paramFactory(a1, this.input1);
    this.param2 = this.paramFactory(a2, this.input2);
    this.param3 = this.paramFactory(a3, this.input3);
  }

  paramFactory(p, currentInput) {
    const { opcode, relativeBase } = this;
    switch (p) {
      case 0:
        return opcode[currentInput];
      case 1:
        return currentInput;
      // case 2:
      //   return opcode[relativeBase + currentInput];
      default:
        return opcode[currentInput];
    }
  }

  updateOpcode(index, value) {
    // const valueMode = value % 100;

    this.opcode[index] = value;
    return this;
  }

  setIndex(index) {
    this.i = index;
    return this;
  }

  add() {
    this.updateOpcode(this.input3, this.param1 + this.param2).setIndex(
      this.i + 4
    );
  }

  multiply() {
    this.updateOpcode(this.input3, this.param1 * this.param2).setIndex(
      this.i + 4
    );
  }
  inputMode() {
    this.updateOpcode(this.input3, this.input).setIndex(this.i + 2);
  }
  outputMode() {
    this.output = this.param1;
    this.setIndex(this.i + 2);
  }
  jumpForInequality() {
    const newIndex = this.param1 !== 0 ? this.param2 : this.i + 3;
    this.setIndex(newIndex);
  }
  jumpForEquality() {
    const newIndex = this.param1 === 0 ? this.param2 : this.i + 3;
    console.log("ni", newIndex);
    this.setIndex(newIndex);
  }
  lessThan() {
    const { param1, param2, input3 } = this;
    this.updateOpcode(input3, param1 < param2 ? 1 : 0).setIndex(this.i + 4);
  }
  equalsTo() {
    const { param1, param2, input3 } = this;
    this.updateOpcode(input3, param1 === param2 ? 1 : 0).setIndex(this.i + 4);
  }
  setRelativeBase() {
    this.relativeBase += this.param1;
    this.setIndex(this.relativeBase);
  }
  halt() {
    return this.getOutput();
  }
}
/*
const computer8 = new IntcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8);
computer8.run();

const computer7 = new IntcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 7);
computer7.run();

const d1 = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
const d2 = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
const c1 = new IntcodeComputer(d1, 0);
c1.run();

const c2 = new IntcodeComputer(d1, 2);
c2.run();

const c3 = new IntcodeComputer(d2, 0);
c3.run();

const c4 = new IntcodeComputer(d2, 13);
c4.run();

const d3 = [
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

const c5 = new IntcodeComputer(d3, 6);
c5.run();
const c6 = new IntcodeComputer(d3, 8);
c6.run();
const c7 = new IntcodeComputer(d3, 81);
c7.run();

console.log("IF 8", computer8.getOutput(), computer8.getOutput() === 1);
console.log("IF 7", computer7.getOutput(), computer7.getOutput() === 0);
console.log("C1 - 0", c1.getOutput(), c1.getOutput() === 0);
console.log("C1 - !0", c2.getOutput(), c2.getOutput() === 1);
console.log("C3 - 0", c3.getOutput(), c3.getOutput() === 0);
console.log("C4 - !0", c4.getOutput(), c4.getOutput() === 1);
console.log("C5 - 999 for < 8", c5.getOutput(), c5.getOutput() === 999);
console.log("C6 - 1000 for > 8", c6.getOutput(), c6.getOutput() === 1000);
console.log("C6 - 1000 for > 8", c7.getOutput(), c7.getOutput() === 1001);
*/
// const q1 = new IntcodeComputer(day5data, 5);
// q1.run();
// console.log(q1.getOutput());
