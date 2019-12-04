/**
 * 
However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?
 */

function validatePassword(password) {
  const pass = String(password);
  if (pass.length !== 6) {
    return false;
  }
  const passArr = pass.split("");

  // always increase
  const sorted = [...passArr].sort();

  if (pass !== sorted.join("")) {
    return false;
  }

  //Two adjacent digits are the same (like 22 in 122345).
  let hasAdjecent = false;

  for (let i = 0; i < 5; i++) {
    if (pass[i] === pass[i + 1]) {
      if (pass[i] !== pass[i - 1] && pass[i] !== pass[i + 2]) {
        hasAdjecent = true;
      }
    }
  }

  if (!hasAdjecent) {
    return false;
  }

  return true;
}

let rangeStart = 359282;
const rangeEnd = 820401;
let count = 0;

do {
  if (validatePassword(rangeStart)) {
    count++;
  }
  rangeStart++;
} while (rangeStart <= rangeEnd);

document.querySelector("#app").innerText = `We have: ${count} items`;
