import { currentOpcode, data } from "./data";

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
      8: this.equalsTo
      // 9: this.setRelativeBase
    };
  }

  run() {
    let count = 0;
    while (true) {
      this.setMode();
      this.setInputs();
      this.setParameters();

      const fn = this.modeFunctions[this.mode];
      if (!fn) {
        throw new Error(
          `Wrong Opcode ${this.mode} at index: ${
            this.i
          } and value of ${this.getCurrentOpcode()}`
        );
      }

      fn.apply(this);

      if (count === 100) {
        break;
      }
      count++;

      if (this.mode === 99 || this.mode === 4) {
        break;
      }
    }
    return;
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
      case 2:
        return opcode[relativeBase + currentInput];
      default:
        return opcode[currentInput];
    }
  }

  updateOpcode(index, value) {
    const valueMode = value % 100;
    if (valueMode <= 8 && valueMode >= 1) {
      let valueArr = [...String(value)].reverse();
      valueArr.map((i)=>)
    }

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
  }
  jumpForInequality() {
    const newIndex = this.param1 !== 0 ? this.param2 : this.i + 3;
    this.setIndex(newIndex);
  }
  jumpForEquality() {
    const newIndex = this.param1 === 0 ? this.param2 : this.i + 3;
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
}

export function runOpcode(code, i = 0, relativeBase = 0) {
  let opcode = [...code].map(e => Number(e));
  let output = 0;

  const mode = opcode[i] % 100;

  const args = [...String(opcode[i])].reverse();
  const a1 = Number(args[2]) || 0;
  const a2 = Number(args[3]) || 0;
  const a3 = args[5] || 0;

  const input1 = opcode[i + 1];
  const input2 = opcode[i + 2];
  const input3 = opcode[i + 3];

  const paramFactory = (p, currentInput) => {
    switch (p) {
      case 0:
        return opcode[input1];
      case 1:
        return input1;
      case 2:
        return opcode[relativeBase + input1];
      default:
        return opcode[input1];
    }
  };

  const t1 = paramFactory(a1, input1);
  const t2 = paramFactory(a2, input2);
  const t3 = paramFactory(a3, input3);

  switch (mode) {
    case 1: {
      opcode[input3] = t1 + t2;
      return runOpcode(opcode, i + 4, relativeBase);
    }
    case 2: {
      opcode[input3] = t1 * t2;
      return runOpcode(opcode, i + 4, relativeBase);
    }
    // Opcode 3 takes a single integer as input and saves it to the position given by its only parameter.
    // For example, the instruction 3,50 would take an input value and store it at address 50.
    case 3: {
      opcode[input3] = 1;
      return runOpcode(opcode, i + 2, relativeBase);
    }
    // Opcode 4 outputs the value of its only parameter.
    // For example, the instruction 4,50 would output the value at address 50.
    case 4: {
      output = opcode[input1];
      console.log(`OUTPUTTING: ${opcode[input1]}`);
      return opcode[input1];
    }
    case 5: {
      return runOpcode(opcode, t1 !== 0 ? t2 : i + 3, relativeBase);
    }
    case 6: {
      return runOpcode(opcode, t1 === 0 ? t2 : i + 3, relativeBase);
    }
    case 7: {
      opcode[input3] = t1 < t2 ? 1 : 0;
      return runOpcode(opcode, i + 4, relativeBase);
    }
    case 8: {
      opcode[input3] = t1 === t2 ? 1 : 0;
      return runOpcode(opcode, i + 4, relativeBase);
    }
    case 9: {
      return runOpcode(opcode, i, relativeBase + input1);
    }
    case 99:
      console.log(`Program halted on:${i}`);
      return opcode;
    default:
      throw new Error(
        `Wrong Opcode ${mode} at index: ${i} and value of ${opcode[i]}`
      );
  }
}

export function runModifiedOpcode(opcode, i1, i2) {
  let newOpcode = [...opcode];
  newOpcode[1] = i1;
  newOpcode[2] = i2;
  return runOpcode(newOpcode);
}

// const program = "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(e => Number(e));
// console.log(runOpcode([1101, 100, -1, 4, 0]));
// try {
//   console.log(runOpcode(data));
// } catch (err) {
//   console.log(err);
// }

// const noInputSelfCopy = [
//   109,
//   1,
//   204,
//   -1,
//   1001,
//   100,
//   1,
//   100,
//   1008,
//   100,
//   16,
//   101,
//   1006,
//   101,
//   0,
//   99
// ];
// const programWithParam = [1002, 4, 3, 4, 33];
// const digit16Output = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
// const middleOutput = [104, 1125899906842624, 99];
// const t = new Array(3000).fill(0);
// let bigArray = [109, 19, 204, -34, ...t];
// bigArray[1985] = 123;

// const comp1 = new IntcodeComputer(noInputSelfCopy);
// comp1.run();

// console.log(comp1.getOpcode());
// console.log(comp1.getOutput());
