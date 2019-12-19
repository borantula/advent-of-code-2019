import { data } from "./data";
import { IntcodeComputer } from "../day9-unfinished";

class NewIntcodeComputer extends IntcodeComputer {
  constructor(opcode, input = 0, phaseSetting) {
    super(opcode, input);
    this.phaseSetting = phaseSetting;
    this.phaseUsed = false;
    console.log(this);
  }

  inputMode() {
    const { updateOpcode, phaseUsed, input, input3, phaseSetting, i } = this;
    updateOpcode(input1, phaseUsed ? input : phaseSetting).setIndex(i + 2);
  }
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
