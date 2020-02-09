// / <reference path="./globals.d.ts" />

import Panel from './Panel';

new Panel('#block', {
  min: 200,
  max: 600,
  values: [200, 400],
  step: 0,
  pinUp: true,
  orientation: 'horizontal',
});

new Panel('#block2', {
  min: 0,
  max: 900,
  values: [60],
  step: 30,
  pinUp: true,
  orientation: 'vertical',
});

new Panel('#block3', {
  min: -200,
  max: 100,
  values: [0, 90],
  step: 0,
  pinUp: false,
  orientation: 'horizontal',
});
