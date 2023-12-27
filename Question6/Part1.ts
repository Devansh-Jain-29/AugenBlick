import puzzleInput from "./input";
const lines = puzzleInput.trim().split("\n");

const n = lines.length;
const m = lines[0].length;

// Tilt all the rocks up
function processCol(j: number): number {
  // Process column j
  let i = 0;
  let ans = 0;

  while (i < n) {
    while (i < n && lines[i][j] === "#") {
      i += 1;
    }

    // Now we're at an O or a .
    let count = 0;
    const start = i;
    while (i < n && lines[i][j] !== "#") {
      if (lines[i][j] === "O") {
        count += 1;
      }
      i += 1;
    }

    for (let ii = start; ii < start + count; ii++) {
      ans += n - ii;
    }
  }

  return ans;
}

let totalAns = 0;
for (let j = 0; j < m; j++) {
  totalAns += processCol(j);
}

console.log(totalAns);
