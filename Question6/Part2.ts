import puzzleInput from "./input";

// Initialize the input grid based on the puzzle input
let inputGrid: string[][] = puzzleInput
  .trim()
  .split("\n")
  .map((row) => row.split(""));

// Function to rotate the input grid
function rotatePlatform90DegClockwise(inputGrid: string[][]): string[][] {
  const numRows = inputGrid.length;
  const numCols = inputGrid[0].length;
  const newPlatformGrid: string[][] = Array.from({ length: numCols }, () =>
    Array(numRows).fill("?")
  );

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      newPlatformGrid[c][numRows - 1 - r] = inputGrid[r][c];
    }
  }

  return newPlatformGrid;
}

// Function to simulate the rolling of rocks on the input
function rollRocks(inputGrid: string[][]): string[][] {
  const numRows = inputGrid.length;
  const numCols = inputGrid[0].length;

  for (let c = 0; c < numCols; c++) {
    for (let _ = 0; _ < numRows; _++) {
      for (let r = 0; r < numRows; r++) {
        if (inputGrid[r][c] === "O" && r > 0 && inputGrid[r - 1][c] === ".") {
          inputGrid[r][c] = ".";
          inputGrid[r - 1][c] = "O";
        }
      }
    }
  }

  return inputGrid;
}

// Function to calculate the total load on the north support beams
function calculateTotalLoad(inputGrid: string[][]): number {
  let totalLoad = 0;
  const numRows = inputGrid.length;
  const numCols = inputGrid[0].length;

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (inputGrid[r][c] === "O") {
        totalLoad += numRows - r;
      }
    }
  }

  return totalLoad;
}

// Dictionary to store input configurations and corresponding time steps
const inputConfigurations: { [key: string]: number } = {};

const targetTime = 10 ** 9;
let currentTime = 0;

// Main simulation loop
while (currentTime < targetTime) {
  currentTime += 1;

  // Perform rolling and rotation for each cycle
  for (let cycleStep = 0; cycleStep < 4; cycleStep++) {
    inputGrid = rollRocks(inputGrid);
    inputGrid = rotatePlatform90DegClockwise(inputGrid);
  }

  // Convert the input configuration to a string for easy comparison
  const inputHash: string = inputGrid.map((row) => row.join("")).join(",");

  // Check for repeated configurations to find cycles
  if (inputConfigurations[inputHash]) {
    const cycleLength = currentTime - inputConfigurations[inputHash];
    const cycleCount = Math.floor((targetTime - currentTime) / cycleLength);
    currentTime += cycleCount * cycleLength;
  }
  // Update the dictionary with the current input configuration and time step
  inputConfigurations[inputHash] = currentTime;
}

// Calculate and print the total load on the north support beams
const totalLoadOnNorthBeams = calculateTotalLoad(inputGrid);
console.log(totalLoadOnNorthBeams);
