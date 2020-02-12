// <reference path="./globals.d.ts" />
import './Slider';

class Panel {
  private slider: ISlider;

  private options: IOptions;

  private container: HTMLElement | any;

  private vertical: HTMLInputElement;

  private pinUp: HTMLInputElement;

  private min: HTMLInputElement;

  private max: HTMLInputElement;

  private step: HTMLInputElement;

  private interval: HTMLInputElement;

  constructor(containerSelector: string, options: IOptions) {
    this.createPanel(containerSelector, options);
    this.addEventListeners();
  }

  private createPanel = (containerSelector: string, options: IOptions) => {
    this.options = options;
    this.container = document.querySelector(containerSelector);
    this.vertical = this.container.querySelector('.js-panel__input[name="vertical"]');
    this.pinUp = this.container.querySelector('.js-panel__input[name="pin-up"]');
    this.min = this.container.querySelector('.js-panel__input[name="min"]');
    this.max = this.container.querySelector('.js-panel__input[name="max"]');
    this.step = this.container.querySelector('.js-panel__input[name="step"]');
    this.interval = this.container.querySelector('.js-panel__input[name="interval"]');
    this.initPanel(containerSelector, options);
  };

  private initPanel(containerSelector: string, options: IOptions): void {
    this.slider = $(containerSelector).myPlugin(options);
  }

  private getValues = (): Array<number> => {
    const values: NodeListOf<HTMLInputElement> = this.container.querySelectorAll('.slider__input');
    const array: Array<number> = [];
    for (let i = 0; i < values.length; i += 1) {
      array.push(+values[i].value);
    }
    return array;
  };

  private addEventListeners(): void {
    this.pinUp.addEventListener('change', this.onPinUpChange.bind(this));
    this.vertical.addEventListener('change', this.onVerticalChange.bind(this));
    this.min.addEventListener('change', this.onMinChange.bind(this));
    this.max.addEventListener('change', this.onMaxChange.bind(this));
    this.step.addEventListener('change', this.onStepChange.bind(this));
    this.interval.addEventListener('change', this.onIntervalChange.bind(this));
  }

  private onPinUpChange(): void {
    this.options.values = this.getValues();
    this.options.pinUp = !!this.pinUp.checked;
    this.slider.changeOptions(this.options);
  }

  private onVerticalChange(): void {
    this.options.values = this.getValues();
    if (this.vertical.checked) {
      this.options.orientation = 'vertical';
    } else {
      this.options.orientation = 'horizontal';
    }
    this.slider.changeOptions(this.options);
  }

  private onMinChange(): void {
    this.options.values = this.getValues();
    this.options.min = +this.min.value;
    this.slider.changeOptions(this.options);
    this.min.value = this.slider.min.toString();
    this.options.min = this.slider.min;
  }

  private onMaxChange(): void {
    this.options.values = this.getValues();
    this.options.max = +this.max.value;
    this.slider.changeOptions(this.options);
    this.min.value = this.slider.min.toString();
    this.options.min = this.slider.min;
  }

  private onStepChange(): void {
    this.options.values = this.getValues();
    this.options.step = +this.step.value;
    this.slider.changeOptions(this.options);
    this.step.value = this.slider.step.toString();
    this.options.step = this.slider.step;
  }

  private onIntervalChange(): void {
    this.options.values = this.getValues();
    if (this.interval.checked) {
      this.options.values[1] = this.options.max;
    } else {
      this.options.values = this.options.values.slice(0, 1);
    }
    this.slider.changeOptions(this.options);
  }
}

export default Panel;
