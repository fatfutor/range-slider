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

  private values: NodeListOf<HTMLInputElement>;

  private pins: NodeListOf<HTMLElement>;

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
    this.values = this.container.querySelectorAll('.js-panel__input[name="value"]');

    Array.from(this.values).forEach((it: HTMLInputElement, idx: number) => {
      this.values[idx].value = (this.options.values[idx])
        ? this.options.values[idx].toString()
        : '';
    });

    this.initPanel(containerSelector, options);
    this.activateSliderPins();
  };

  private onPinMove = (idx: number) => (evt: MouseEvent) => {
    evt.preventDefault();
    let dragged = false;
    const onMouseMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      dragged = true;
      this.values[idx].value = this.slider.values[idx].toString();
    };
    const onMouseUp = (upEvt: MouseEvent) => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        const onClickPreventDefault = (moveEvt: MouseEvent) => {
          moveEvt.preventDefault();
          this.pins[idx].removeEventListener('click', onClickPreventDefault);
        };
        this.pins[idx].addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  private initPanel(containerSelector: string, options: IOptions): void {
    this.slider = $(containerSelector).myPlugin(options);
  }

  private getValues = (): Array<number> => [...this.slider.values];

  private activateSliderPins = () => {
    this.pins = this.container.querySelectorAll('.slider__pin');
    Array.from(this.pins).forEach((it: HTMLElement, idx: number) => {
      it.addEventListener('mousedown', this.onPinMove(idx).bind(this));
    });
  };

  private addEventListeners(): void {
    this.pinUp.addEventListener('change', this.onPinUpChange.bind(this));
    this.vertical.addEventListener('change', this.onVerticalChange.bind(this));
    this.min.addEventListener('change', this.onMinChange.bind(this));
    this.max.addEventListener('change', this.onMaxChange.bind(this));
    this.step.addEventListener('change', this.onStepChange.bind(this));
    this.interval.addEventListener('change', this.onIntervalChange.bind(this));
    Array.from(this.values).forEach((it: HTMLElement, idx: number) => {
      it.addEventListener('change', this.onValuesChange(idx).bind(this));
    });
  }

  private onValuesChange = (idx: number) => () => {
    this.options.values = this.getValues();
    this.options.values[idx] = Number(this.values[idx].value);
    this.slider.changeOptions(this.options);
    this.activateSliderPins();
  };

  private onPinUpChange(): void {
    this.options.values = this.getValues();
    this.options.pinUp = !!this.pinUp.checked;
    this.slider.changeOptions(this.options);
    this.activateSliderPins();
  }

  private onVerticalChange(): void {
    this.options.values = this.getValues();
    if (this.vertical.checked) {
      this.options.orientation = 'vertical';
    } else {
      this.options.orientation = 'horizontal';
    }
    this.slider.changeOptions(this.options);
    this.activateSliderPins();
  }

  private onMinChange(): void {
    this.options.values = this.getValues();
    this.options.min = +this.min.value;
    this.slider.changeOptions(this.options);
    this.min.value = this.slider.min.toString();
    this.options.min = this.slider.min;
    this.activateSliderPins();
  }

  private onMaxChange(): void {
    this.options.values = this.getValues();
    this.options.max = +this.max.value;
    this.slider.changeOptions(this.options);
    this.min.value = this.slider.min.toString();
    this.options.min = this.slider.min;
    this.activateSliderPins();
  }

  private onStepChange(): void {
    this.options.values = this.getValues();
    this.options.step = +this.step.value;
    this.slider.changeOptions(this.options);
    this.step.value = this.slider.step.toString();
    this.options.step = this.slider.step;
    this.activateSliderPins();
  }

  private onIntervalChange(): void {
    this.options.values = this.getValues();
    if (this.interval.checked) {
      this.options.values[1] = this.options.max;
    } else {
      this.options.values = this.options.values.slice(0, 1);
    }
    this.slider.changeOptions(this.options);
    this.activateSliderPins();
  }
}

export default Panel;
