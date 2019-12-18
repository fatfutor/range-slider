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
  interval: HTMLElement | any;
  values: Array<HTMLElement>;

  constructor(block: JQuery<HTMLElement>, options: any) {
    this.container = document.querySelector(`#${block[0].id}`);
    this.options = options;
    this.slider = new Presenter(block, options);
    this.vertical = this.container.querySelector('.panel__input[name="vertical"]');
    this.pinUp = this.container.querySelector('.panel__input[name="pin-up"]');
    this.min = this.container.querySelector('.panel__input[name="min"]');
    this.max = this.container.querySelector('.panel__input[name="max"]');
    this.step = this.container.querySelector('.panel__input[name="step"]');
    this.interval = this.container.querySelector('.panel__input[name="interval"]');

    this.vertical.addEventListener('change', () => {
      this.options.values = this.getValues();
      if (this.vertical.checked) {
        this.options.orientation = 'vertical';
      } else {
        this.options.orientation = 'horizontal';
      }
      this.slider.changeOptions(this.options);
    });

    this.pinUp.addEventListener('change', () => {
      this.options.values = this.getValues();
      this.options.pinUp = !!this.pinUp.checked;
      this.slider.changeOptions(this.options);
    });

    this.min.addEventListener('change', () => {
      this.options.values = this.getValues();
      this.options.min = +this.min.value;
      this.slider.changeOptions(this.options);
    });

    this.max.addEventListener('change', () => {
      this.options.values = this.getValues();
      this.options.max = +this.max.value;
      this.slider.changeOptions(this.options);
    });

    this.step.addEventListener('change', () => {
      this.options.values = this.getValues();
      this.options.step = +this.step.value;
      this.slider.changeOptions(this.options);
    });

    this.interval.addEventListener('change', () => {
      this.options.values = this.getValues();
      if (this.interval.checked) {
        this.options.values[1] = this.options.max;
      } else {
        this.options.values = this.options.values.slice(0, 1);
      }
      this.slider.changeOptions(this.options);
    });
  }

  private getValues = (): Array<number> => {
    const values = this.container.querySelectorAll('.slider__input');
    let array = [];
    for(let i = 0; i < values.length; i++) {
      array.push(+values[i].value);
    }
    return array;
  }
}