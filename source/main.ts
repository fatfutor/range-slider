import Presenter from './Presenter';

export const slider = (block, options) => {
  if (block[0].id === 'block') {
    const container = document.querySelector('#block');

    const presenter = new Presenter(block, options);
    presenter.changeOptions({step: 20, min: 100, max: 500, orientation: 'horizontal', pinUp: false});
  }
};

export const slider2 = (block, options) => {
  if (block[0].id === 'block2') {
    new Presenter(block, options);
  }
};
