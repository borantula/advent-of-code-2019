import { currentOpcode, data } from "./data";

export function runOpcode({
  code = [],
  i = 0,
  mainInput = 0,
  phaseSetting = undefined,
  setOutput = undefined
} = {}) {
  let opcode = [...code].map(e => Number(e));
  let output = 0;

  //backwards compat for day 7 changes
  phaseSetting = undefined === phaseSetting ? mainInput : phaseSetting;

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
      return runOpcode({ code: opcode, i: i + 4, mainInput, setOutput });
    }
    case 2: {
      opcode[input3] = t1 * t2;
      return runOpcode({ code: opcode, i: i + 4, mainInput, setOutput });
    }
    // Opcode 3 takes a single integer as input and saves it to the position given by its only parameter.
    // For example, the instruction 3,50 would take an input value and store it at address 50.
    case 3: {
      opcode[input1] = i === 0 ? phaseSetting : mainInput;
      return runOpcode({ code: opcode, i: i + 2, mainInput, setOutput });
    }
    // Opcode 4 outputs the value of its only parameter.
    // For example, the instruction 4,50 would output the value at address 50.
    case 4: {
      output = opcode[input1];
      // console.log("yow", opcode[input1]);
      if (139629729 === opcode[input1]) {
        console.log("yo", input1, opcode[input1]);
      }
      if (typeof setOutput !== "function") {
        return opcode[input1];
      }
      // return opcode[input1];
      return runOpcode({ code: opcode, i: i + 2, mainInput, setOutput });
    }
    case 5: {
      return runOpcode({
        code: opcode,
        i: t1 !== 0 ? t2 : i + 3,
        mainInput,
        setOutput
      });
    }
    case 6: {
      return runOpcode({
        code: opcode,
        i: t1 === 0 ? t2 : i + 3,
        mainInput,
        setOutput
      });
    }
    case 7: {
      opcode[input3] = t1 < t2 ? 1 : 0;
      return runOpcode({ code: opcode, i: i + 4, mainInput, setOutput });
    }
    case 8: {
      opcode[input3] = t1 === t2 ? 1 : 0;
      return runOpcode({ code: opcode, i: i + 4, mainInput, setOutput });
    }
    case 99:
      setOutput(output);
      console.log(`Program halted on:${i} with output ${output}`);
      return false;
    default:
      throw new Error(
        `Wrong Opcode ${mode} at index: ${i} and value of ${opcode[i]}`
      );
  }
}

export function runModifiedOpcode(opcode, i1, i2) {
  let code = [...opcode];
  code[1] = i1;
  code[2] = i2;
  return runOpcode({ code });
}

// try {
//   runOpcode(data, 0, 5);
// } catch (err) {
//   console.log(err);
// }
