// opcode: 1,2,99
// 99 halt
// 1: the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.
// 2: like 1 but multiply
// step forward 4 positions
let currentOpcode = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  10,
  19,
  1,
  6,
  19,
  23,
  1,
  13,
  23,
  27,
  1,
  6,
  27,
  31,
  1,
  31,
  10,
  35,
  1,
  35,
  6,
  39,
  1,
  39,
  13,
  43,
  2,
  10,
  43,
  47,
  1,
  47,
  6,
  51,
  2,
  6,
  51,
  55,
  1,
  5,
  55,
  59,
  2,
  13,
  59,
  63,
  2,
  63,
  9,
  67,
  1,
  5,
  67,
  71,
  2,
  13,
  71,
  75,
  1,
  75,
  5,
  79,
  1,
  10,
  79,
  83,
  2,
  6,
  83,
  87,
  2,
  13,
  87,
  91,
  1,
  9,
  91,
  95,
  1,
  9,
  95,
  99,
  2,
  99,
  9,
  103,
  1,
  5,
  103,
  107,
  2,
  9,
  107,
  111,
  1,
  5,
  111,
  115,
  1,
  115,
  2,
  119,
  1,
  9,
  119,
  0,
  99,
  2,
  0,
  14,
  0
];

function runOpcode(opcode, i = 0) {
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
function runModifiedOpcode(opcode, i1, i2) {
  let newOpcode = [...opcode];
  newOpcode[1] = i1;
  newOpcode[2] = i2;
  return runOpcode(newOpcode);
}

const magicNumbers = numbers.find(i1 => {
  const num2 = numbers.find(i2 => {
    console.log(i1, i2);
    try {
      const final = runModifiedOpcode(currentOpcode, i1, i2);
      const isCorrectPair = final.length && final[0] === 19690720;
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
