import Model from '../source/Model';

mocha.setup('bdd');
const { assert } = chai;

const model = new Model();

describe('model', () => {
  it('getRangeKo', () => {
    assert(model.getRangeKo(300, { min: 0, max: 300 }) === 1);
    assert(model.getRangeKo(300, { min: 300, max: 900 }) === 2);
    assert(model.getRangeKo(300, { min: 0, max: 30 }) === 0.1);
  });

  it('calculateContent', () => {
    assert(model.calculateContent(35, { min: 0, max: 900 }, 300, 5) === 105);
    assert(model.calculateContent(300, { min: 0, max: 900 }, 300, 5) === 900);
    assert(model.calculateContent(0, { min: 0, max: 900 }, 300, 0) === 0);
  });

  it('calculatePinPosition', () => {
    assert(model.calculatePinPosition(0, 0, 300) === 0);
    assert(model.calculatePinPosition(-1, 300, 300) === 300);
    assert(model.calculatePinPosition(5, 130, 300) === 125);
  });

  it('setStartValues', () => {
    assert.deepEqual(model.setStartValues([300, 400], 300, 200, 600), [75, 150]);
    assert.deepEqual(model.setStartValues([45], 300, 0, 900), [15]);
  });

  it('setShift', () => {
    assert(model.setShift({ x: 60, y: 200 }, { clientX: 60, clientY: 199 }, 'vertical') === 1);
    assert(model.setShift({ x: 60, y: 200 }, { clientX: 61, clientY: 200 }, 'horizontal') === -1);
  });

  it('validateData', () => {
    assert(model.validateData([149, 150], 150, 0) === 149);
  });

  it('validatePinValues', () => {
    assert.deepEqual(model.validatePinValues([200, 600], [300, 400]), [300, 400]);
  });

  it('validateMin', () => {
    assert(model.validateMin(200, 600) === 200);
  });
});

mocha.run();
