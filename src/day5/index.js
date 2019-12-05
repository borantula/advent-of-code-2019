import { currentOpcode, data } from "./data";

export function runOpcode(code, i = 0) {
  let opcode = [...code].map(e => Number(e));

  const mode = opcode[i] % 100;

  const args = [...String(opcode[i])].reverse();
  const a1 = Number(args[2]) || 0;
  const a2 = Number(args[3]) || 0;
  const a3 = args[5] || 0;

  const input1 = opcode[i + 1];
  const input2 = opcode[i + 2];
  const input3 = opcode[i + 3];

  const t1 = a1 === 1 ? input1 : opcode[input1];
  const t2 = a2 === 1 ? input2 : opcode[input2];
  const t3 = a3 === 1 ? input3 : opcode[input3];

  switch (mode) {
    case 1: {
      opcode[input3] = t1 + t2;
      return runOpcode(opcode, i + 4);
    }
    case 2: {
      opcode[input3] = t1 * t2;
      return runOpcode(opcode, i + 4);
    }
    // Opcode 3 takes a single integer as input and saves it to the position given by its only parameter.
    // For example, the instruction 3,50 would take an input value and store it at address 50.
    case 3: {
      opcode[input3] = 5;
      return runOpcode(opcode, i + 2);
    }
    // Opcode 4 outputs the value of its only parameter.
    // For example, the instruction 4,50 would output the value at address 50.
    case 4: {
      console.log(`OUTPUTTING: ${opcode[input1]}`);
      return runOpcode(opcode, i + 2);
    }
    case 5: {
      return runOpcode(opcode, t1 !== 0 ? t2 : i + 3);
    }
    case 6: {
      return runOpcode(opcode, t1 === 0 ? t2 : i + 3);
    }
    case 7: {
      opcode[input3] = t1 < t2 ? 1 : 0;
      return runOpcode(opcode, i + 4);
    }
    case 8: {
      opcode[input3] = t1 === t2 ? 1 : 0;
      return runOpcode(opcode, i + 4);
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
try {
  console.log(runOpcode(data));
} catch (err) {
  console.log(err);
}
