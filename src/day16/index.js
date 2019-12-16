function fft(input, runCount = 10) {
  let lastIteration = input.split("").map(e => Number(e));
  let count = 0;
  while (count < runCount) {
    lastIteration = lastIteration.map((x, i) => {
      return calculateNextDigit(lastIteration, i + 1);
    });

    count++;
  }
  return lastIteration;
}

function calculateNextDigit(inputArr, outputIndex) {
  const patt = memoizedBasePattern(outputIndex, inputArr.length);
  // console.log(inputArr);
  let total = inputArr.reduce((total, x, i) => {
    if (x === 0 || patt[i] === 0) {
      return total;
    }
    return x * patt[i] + total;
  }, 0);

  return Math.abs(total) % 10;
}

function basePatternMemo() {
  let cache = {};

  return (outputIndex, inputSize) => {
    const key = [outputIndex, inputSize].join("-");
    if (key in cache) {
      return cache[key];
    } else {
      return basePattern(outputIndex, inputSize);
    }
  };
}

const memoizedBasePattern = basePatternMemo();

// TODO: memoize
function basePattern(outputIndex, inputSize) {
  const basePattern = [0, 1, 0, -1];

  const pattern = [];

  for (let i = 0; i <= inputSize; i++) {
    for (let i2 = 0; i2 < outputIndex; i2++) {
      pattern.push(basePattern[i % 4]);
      if (inputSize + 1 === pattern.length) {
        break;
      }
    }
    if (inputSize + 1 === pattern.length) {
      break;
    }
  }

  pattern.shift();
  return pattern;
}

function repeatSignal(input, times) {
  let output = "";
  let i = 1;
  while (i <= times) {
    output += input;
    i++;
  }
  return output;
}

//part 1
fft("80871224585914546619083218645595", 100);

// part 2! (part 1 was the trap!)
const input = "03036732577212944063491565474664";
let signal = repeatSignal(input, 10000)
  .split("")
  .map(e => Number(e))
  .slice(Number(input.slice(0, 7)));
const originalLength = input.length * 10000;
console.log(originalLength, signal.length);
console.log([...signal].slice(-10));
for (let phase = 1; phase <= 100; phase++) {
  for (let i = signal.length - 1; i >= 0; i--) {
    signal[i] = Math.abs((signal[i + 1] || 0) + signal[i]) % 10;
  }
}
console.log(signal);

console.log(`part2:`, signal.slice(0, 8).join(""));
