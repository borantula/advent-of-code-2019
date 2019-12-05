import { currentOpcode } from "./data";

// opcode: 1,2,99
// 99 halt
// 1: the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.
// 2: like 1 but multiply
// step forward 4 positions

export function runOpcode(opcode, i = 0) {
  switch (opcode[i]) {
    case 1: {
      const pos1 = opcode[i + 1];
      const pos2 = opcode[i + 2];
      const pos3 = opcode[i + 3];
      const total = opcode[pos1] + opcode[pos2];
      opcode[pos3] = total;
      return runOpcode(opcode, i + 4);
    }
    case 2: {
      const pos1 = opcode[i + 1];
      const pos2 = opcode[i + 2];
      const pos3 = opcode[i + 3];
      const total = opcode[pos1] * opcode[pos2];
      opcode[pos3] = total;
      return runOpcode(opcode, i + 4);
    }
    case 99:
      //   console.log(`Program halted on:${i}`);
      return opcode;
    default:
      throw new Error("Wrong Opcode");
  }
}

const numbers = [...Array(100).keys()];
export function runModifiedOpcode(opcode, i1, i2) {
  let newOpcode = [...opcode];
  newOpcode[1] = i1;
  newOpcode[2] = i2;
  return runOpcode(newOpcode);
}

export function findMagicPair(result = 19690720) {
  numbers.find(i1 => {
    const num2 = numbers.find(i2 => {
      console.log(i1, i2);
      try {
        const final = runModifiedOpcode(currentOpcode, i1, i2);
        const isCorrectPair = final.length && final[0] === result;
        if (isCorrectPair) {
          console.log(`Winning pair is: ${i1} and ${i2}`);
        }
        return isCorrectPair;
      } catch (err) {
        return false;
      }
    });
    return num2;
  });
}

console.log(findMagicPair());
