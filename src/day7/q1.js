import { runOpcode } from "../day5";
import { data, testPrograms, d2 } from "./data";
import { IntcodeComputer } from "../day9-unfinished";

class NewIntcodeComputer extends IntcodeComputer {
  constructor(opcode, input = 0, phaseSetting) {
    super(opcode, input);
    this.phaseSetting = phaseSetting;
    this.phaseUsed = false;
  }

  inputMode() {
    this.updateOpcode(
      this.input1,
      this.phaseUsed ? this.input : this.phaseSetting
    ).setIndex(this.i + 2);
    this.phaseUsed = true;
  }
}

class NewIntcodeComputer2 extends IntcodeComputer {
  constructor(opcode, input = 0, phaseSetting, phaseUsed = false) {
    super(opcode, input);
    this.phaseSetting = phaseSetting;
    this.phaseUsed = false;
  }

  inputMode() {
    this.updateOpcode(
      this.input1,
      this.phaseUsed ? this.input : this.phaseSetting
    ).setIndex(this.i + 2);
    this.phaseUsed = true;
  }
}

export function runSequence(data, sequence, initialInput = 0) {
  return sequence.reduce((prevOutput, phaseSetting) => {
    const computer = new NewIntcodeComputer(data, prevOutput, phaseSetting);
    computer.run();
    return computer.getOutput();
  }, initialInput);
}

export function runSequenceUntilTermination(data, sequence, initialInput = 0) {
  let isDone = false;
  let lastOutput = initialInput;
  let count = 0;

  let prevOutput = 0;
  let computers = [];
  while (isDone === false) {
    for (let index = 0; index < sequence.length; index++) {
      const phaseSetting = sequence[index];
      if (count === 0) {
        computers[index] = new NewIntcodeComputer(
          data,
          prevOutput,
          phaseSetting,
          count > 0
        );
      }
      computers[index].input = prevOutput;
      isDone = computers[index].run();
      if (isDone) {
        break;
      }
      prevOutput = computers[index].getOutput();
      if (index === 4) {
        lastOutput = prevOutput;
      }
    }
    count += 1;
    if (isDone) {
      break;
    }
  }
  return lastOutput;
}

// Modified from https://stackoverflow.com/questions/9960908/permutations-in-javascript
export function permute(input, usedChars = [], permArr = []) {
  let ch;
  for (let i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input, usedChars, permArr);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

export function findMostEfficientConfig(data, numbers) {
  const combinations = permute(numbers);
  const results = combinations
    .map(sequence => runSequence(data, sequence))
    .sort((a, b) => b - a);
  // console.log(results);
  return results;
}

export function findMostEfficientConfig2(data, numbers) {
  const combinations = permute(numbers);
  const results = combinations
    .map(sequence => runSequenceUntilTermination(data, sequence))
    .sort((a, b) => b - a);
  // console.log(results);
  return results;
}

// console.log(findMostEfficientConfig(testPrograms[0].data, [0, 1, 2, 3, 4])[0]);
console.log(findMostEfficientConfig2(data, [5, 6, 7, 8, 9])[0]);
// console.log(runSequence(testPrograms[0].data, testPrograms[0].sequence));
// console.log(runSequenceUntilTermination(d2, [9, 8, 7, 6, 5]));
