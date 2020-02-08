// / <reference path="./globals.d.ts" />

import Panel from './Panel';

new Panel('#block', {
  min: 200,
  max: 600,
  values: [300, 400],
  step: 0,
  pinUp: true,
  orientation: 'horizontal',
});

// new Panel('#block2', {
//   min: 0,
//   max: 900,
//   values: [60],
//   step: 30,
//   pinUp: false,
//   orientation: 'horizontal',
// });
//
// new Panel('#block3', {
//   min: 0,
//   max: 100,
//   values: [60, 90],
//   step: 0,
//   pinUp: false,
//   orientation: 'horizontal',
// });
//
// new Panel('#block4', {
//   min: 0,
//   max: 300,
//   values: [0],
//   step: 0,
//   pinUp: false,
//   orientation: 'vertical',
// });
