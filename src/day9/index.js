// import { data } from "./data";
import { data } from "./data";

export class IntcodeComputer {
  constructor(opcode, input = false) {
    this.input = input;
    this.output = undefined;
    this.relativeBase = 0;
    this.opcode = [...opcode];
    this.mode = 0;
    this.i = 0;
    this.relativeBase = 0;
    this.result = [];
    this.modeFunctions = {
      1: this.add,
      2: this.multiply,
      3: this.inputMode,
      4: this.outputMode,
      5: this.jumpForInequality,
      6: this.jumpForEquality,
      7: this.lessThan,
      8: this.equalsTo,
      9: this.setRelativeBase,
      99: this.halt
    };
    this.count = 0;
  }

  run() {
    this.paused = false;
    while (true) {
      if (this.paused) {
        return false;
      }
      this.count++;

      this.setMode();

      if (this.mode === 99) {
        break;
      }

      const fn = this.modeFunctions[this.mode];
      if (!fn) {
        throw new Error(
          `Wrong Opcode ${this.mode} at index: ${
            this.i
          } and value of ${this.getCurrentOpcode()}`
        );
      }

      fn.apply(this);
    }
    console.log("DONE IN:", this.count);

    if (this.mode === 99) {
      return true;
    }
    return false;
  }

  pause() {
    this.paused = true;
  }

  setInput(value) {
    this.input = value;
  }

  getOutput() {
    return this.output;
  }

  setOutput(code) {
    this.output = code;
    this.result.push(code);

    // added for Q11
    this.pause();
  }

  getOpcode() {
    return this.opcode;
  }

  getCurrentOpcode() {
    return this.opcode[this.i];
  }

  setMode() {
    this.mode = this.getCurrentOpcode() % 100;
    this.setInputs();
  }

  setInputs() {
    this.input1 = this.opcode[this.i + 1];
    this.input2 = this.opcode[this.i + 2];
    this.input3 = this.opcode[this.i + 3];
  }

  getParameters() {
    // takes 1002 -> 2001 opcode and 010 are arg
    const args = [...String(this.getCurrentOpcode())].reverse();
    const a1 = Number(args[2]) || 0;
    const a2 = Number(args[3]) || 0;
    const a3 = Number(args[4]) || 0;

    return { a1, a2, a3 };
  }

  paramFactory(p, currentInput) {
    const { opcode, relativeBase } = this;

    switch (p) {
      case 0:
        this.extendToIndex(currentInput);
        return opcode[currentInput];
      case 1:
        return currentInput;
      case 2:
        return opcode[currentInput + relativeBase];
    }
  }

  paramFactoryWrite(p, currentInput) {
    const { relativeBase } = this;

    switch (p) {
      case 0:
      case 1:
        this.extendToIndex(currentInput);
        return currentInput;

      case 2:
        this.extendToIndex(currentInput + relativeBase);
        return currentInput + relativeBase;
    }
  }

  extendToIndex(index) {
    if (this.opcode[index] === undefined) {
      const length = index + 1 - this.opcode.length;
      this.opcode = [...this.opcode, ...Array.from({ length }, x => 0)];
    }
  }

  updateOpcode(index, value) {
    this.extendToIndex(index);
    this.opcode[index] = value;

    return this;
  }

  setIndex(index) {
    this.extendToIndex(index);
    this.i = index;
    return this;
  }

  add() {
    const { a1, a2, a3 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const param3 = this.paramFactoryWrite(a3, this.input3);
    this.updateOpcode(param3, param1 + param2).setIndex(this.i + 4);
  }

  multiply() {
    const { a1, a2, a3 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const param3 = this.paramFactoryWrite(a3, this.input3);
    this.updateOpcode(param3, param1 * param2).setIndex(this.i + 4);
  }
  inputMode() {
    const { a1 } = this.getParameters();
    const param1 = this.paramFactoryWrite(a1, this.input1);

    if (this.input !== false) {
      this.updateOpcode(param1, this.input);
    }
    this.setIndex(this.i + 2);
  }
  outputMode() {
    const { a1 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);

    this.setOutput(param1);
    this.setIndex(this.i + 2);
  }
  jumpForInequality() {
    const { a1, a2 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const newIndex = param1 !== 0 ? param2 : this.i + 3;
    this.setIndex(newIndex);
  }
  jumpForEquality() {
    const { a1, a2 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const newIndex = param1 === 0 ? param2 : this.i + 3;
    this.setIndex(newIndex);
  }
  lessThan() {
    const { a1, a2, a3 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const param3 = this.paramFactoryWrite(a3, this.input3);
    this.updateOpcode(param3, param1 < param2 ? 1 : 0).setIndex(this.i + 4);
  }
  equalsTo() {
    const { a1, a2, a3 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    const param2 = this.paramFactory(a2, this.input2);
    const param3 = this.paramFactoryWrite(a3, this.input3);
    this.updateOpcode(param3, param1 === param2 ? 1 : 0).setIndex(this.i + 4);
  }
  setRelativeBase() {
    const { a1 } = this.getParameters();
    const param1 = this.paramFactory(a1, this.input1);
    this.relativeBase += param1;
    this.setIndex(this.i + 2);
  }
  halt() {
    return this.result;
  }
}
const c1 = new IntcodeComputer([
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
]);
// c1.run();

// const c2 = new IntcodeComputer([104, 1125899906842624, 99]);
// c2.run();

function runOne() {
  const c3 = new IntcodeComputer(data, 1);
  c3.run();
  console.log("FIRST:", c3.getOutput(), c3.result);
}

function runTwo() {
  const c3 = new IntcodeComputer(data, 1);
  c3.run();
  console.log("SECOND:", c3.getOutput(), c3.result);
}
