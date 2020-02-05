
const makeMinLessMax = (min: number, max: number): number => {
  let minValue: number = min;
  if (min > max) minValue = max - 1;
  return minValue;
};

const makePinValueLimit = (values: Array<number>, value: number, idx: number): number => {
  if (idx === 0) {
    if (value >= values[1]) {
      return values[1];
    }
    return value;
  }
  if (idx === 1) {
    if (value <= values[0]) {
      return values[0];
    }
    return value;
  }

  return value;
};

const validateOptionsPinValues = (minMax: Array<number>, pins: Array<number>): Array<number> => {
  const firstElementMinMax = minMax[0];
  const secondElementMinMax = minMax[1];
  let firstElementPin = pins[0];
  let secondElementPin = pins[1];

  if (firstElementMinMax > firstElementPin) {
    firstElementPin = firstElementMinMax;
  }

  if (secondElementMinMax < pins[pins.length - 1]) {
    secondElementPin = secondElementMinMax;
  }

  if (pins.length === 2) {
    if (firstElementPin > secondElementPin) {
      firstElementPin = firstElementMinMax;
      secondElementPin = secondElementMinMax;
    }
  }
  return [firstElementPin, secondElementPin];
};

const util = {
  makeMinLessMax,
  makePinValueLimit,
  validateOptionsPinValues,
};

export default util;
