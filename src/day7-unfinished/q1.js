import { runOpcode } from "../day5";
import { data } from "./data";

export function runSequence(data, sequence, initialInput = 0) {
  return sequence.reduce((prevOutput, phaseSetting) => {
    return runOpcode(data, prevOutput, phaseSetting);
  }, initialInput);
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
  return results[0];
}

// console.log(findMostEfficientConfig(data, [0, 1, 2, 3, 4]));
