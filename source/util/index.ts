
const makeMinEqualMax = (min: number, max: number): number => {
  let minValue: number = min;
  if (min > max) minValue = max;
  return minValue;
};

const makeMaxEqualMin = (min: number, max: number): number => {
  let maxValue: number = max;
  if (max < min) maxValue = min;
  return maxValue;
};

const util = {
  makeMinEqualMax: makeMinEqualMax,
  makeMaxEqualMin: makeMaxEqualMin,
};

export default util;
