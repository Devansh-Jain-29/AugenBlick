import input from "./input";

function HASH_algorithm(sequence: string): number {
  let current_value = 0;
  for (const char of sequence) {
    const ascii_code = char.charCodeAt(0);
    current_value += ascii_code;
    current_value *= 17;
    current_value %= 256;
  }
  return current_value;
}

function applyInitializationSequence(sequence: string[]): number {
  const boxes: Record<number, { label: string; focalLength?: number }[]> = {};

  for (const step of sequence) {
    const [label, operation, value] = step
      .match(/([a-z]+)([=-])(\d*)/)!
      .slice(1);

    const boxNumber = HASH_algorithm(label) % 256;

    if (!boxes[boxNumber]) {
      boxes[boxNumber] = [];
    }

    const lensIndex = boxes[boxNumber].findIndex(
      (lens) => lens.label === label
    );

    if (operation === "-") {
      if (lensIndex !== -1) {
        boxes[boxNumber].splice(lensIndex, 1);
      }
    } else if (operation === "=") {
      const focalLength = value !== "" ? parseInt(value) : undefined;

      if (lensIndex !== -1) {
        boxes[boxNumber][lensIndex].focalLength = focalLength;
      } else {
        boxes[boxNumber].push({ label, focalLength });
      }
    }
  }

  let totalFocusingPower = 0;

  for (const boxNumber in boxes) {
    for (let i = 0; i < boxes[boxNumber].length; i++) {
      const lens = boxes[boxNumber][i];
      totalFocusingPower +=
        (parseInt(boxNumber) + 1) * (i + 1) * (lens.focalLength || 1);
    }
  }

  return totalFocusingPower;
}

// Initialization sequence
const init_sequence: string = input;

// Split the initialization sequence into steps
const steps: string[] = init_sequence.split(",");

// Calculate the sum of results using the HASH algorithm
const sum_of_results: number = steps.reduce(
  (sum, step) => sum + HASH_algorithm(step),
  0
);

console.log(sum_of_results);

// Calculate the sum of focusing power using the applyInitializationSequence function
const sumOfFocusingPower: number = applyInitializationSequence(steps);

console.log(sumOfFocusingPower);
