import Presenter from './Presenter';

export default class Panel {
  container: HTMLElement | any;
  slider: any;
  options: any;
  vertical: HTMLElement | any;
  pinUp: HTMLElement | any;
  min: HTMLElement | any;
  max: HTMLElement | any;
  step: HTMLElement | any;

  constructor(block: JQuery<HTMLElement>, options: any) {
    this.container = document.querySelector(`#${block[0].id}`);
    this.options = options;
    this.slider = new Presenter(block, options);
    this.vertical = this.container.querySelector('.panel__input[name="vertical"]');
    this.pinUp = this.container.querySelector('.panel__input[name="pin-up"]');
    this.min = this.container.querySelector('.panel__input[name="min"]');
    this.max = this.container.querySelector('.panel__input[name="max"]');
    this.step = this.container.querySelector('.panel__input[name="step"]');

    this.vertical.addEventListener('change', () => {
      if (this.vertical.checked) {
        this.options.orientation = 'vertical';
      } else {
        this.options.orientation = 'horizontal';
      }
      this.slider.changeOptions(this.options);
    });

    this.pinUp.addEventListener('change', () => {
      this.options.pinUp = !!this.pinUp.checked;
      this.slider.changeOptions(this.options);
    });

    this.min.addEventListener('change', () => {
      this.options.min = +this.min.value;
      this.slider.changeOptions(this.options);
    });

    this.max.addEventListener('change', () => {
      this.options.max = +this.max.value;
      this.slider.changeOptions(this.options);
    });

    this.step.addEventListener('change', () => {
      this.options.step = +this.step.value;
      this.slider.changeOptions(this.options);
    });
  }
}
