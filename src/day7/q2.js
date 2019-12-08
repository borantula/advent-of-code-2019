import { data } from "./data";

export function runOpcode(
  code = [],
  mainInput = 0,
  phaseSetting = undefined,
  isLastAmp = false
) {
  let opcode = [...code].map(e => Number(e));
  let output = 0;
  let phaseSettingUsed = false;

  for (let i = 0; i < opcode.length; ) {
    // console.log(i, phaseSetting, mainInput);
    const mode = opcode[i] % 100;

    const args = [...String(opcode[i])].reverse();
    const a1 = Number(args[2]) || 0;
    const a2 = Number(args[3]) || 0;
    const a3 = Number(args[5]) || 0;

    const input1 = opcode[i + 1];
    const input2 = opcode[i + 2];
    const input3 = opcode[i + 3];

    const t1 = a1 === 1 ? input1 : opcode[input1];
    const t2 = a2 === 1 ? input2 : opcode[input2];
    const t3 = a3 === 1 ? input3 : opcode[input3];

    switch (mode) {
      case 1: {
        opcode[input3] = t1 + t2;
        i = i + 4;
        break;
      }
      case 2: {
        opcode[input3] = t1 * t2;
        i = i + 4;
        break;
      }
      case 3: {
        opcode[input1] = !phaseSettingUsed ? phaseSetting : mainInput;
        phaseSettingUsed = true;
        i = i + 2;
        break;
      }
      case 4: {
        if (isLastAmp) {
          output = opcode[input1];
        }

        if (18216 === opcode[input1]) {
          console.log("yo", input1, opcode[input1]);
        }

        if (139629729 === opcode[input1]) {
          console.log("yo", input1, opcode[input1]);
        }
        return output;
        i = i + 2;
        break;
      }
      case 5: {
        i = t1 !== 0 ? t2 : i + 3;
        break;
      }
      case 6: {
        i = t1 === 0 ? t2 : i + 3;
        break;
      }
      case 7: {
        opcode[input3] = t1 < t2 ? 1 : 0;
        i = i + 4;
        break;
      }
      case 8: {
        opcode[input3] = t1 === t2 ? 1 : 0;
        i = i + 4;
        break;
      }
      case 99:
        console.log(`Program halted on:${i} with output ${output}`);
        // setOutput(output);
        return false;
        break;
      default:
        throw new Error(
          `Wrong Opcode ${mode} at index: ${i} and value of ${opcode[i]}`
        );
        break;
    }
  }
  //   setOutput(output);
  console.log(output);
  return output;
}

export function runSequenceUntilTerminated(data, sequence, initialInput = 0) {
  const result = sequence.reduce((prevOutput, phaseSetting, ampIndex) => {
    console.log(prevOutput, phaseSetting);
    const isLastAmp = ampIndex === 4;
    const r = runOpcode(data, prevOutput, phaseSetting, isLastAmp);
    return r ? r : prevOutput;
  }, initialInput);

  console.log("result", result);
  if (false === result) {
    return false;
  }
  return runSequenceUntilTerminated(data, sequence, result);
}

export function runProgramUntilTerminated(data, sequence) {
  const result = runSequenceUntilTerminated(data, sequence, 0);
  console.log(result);
  return;
}
