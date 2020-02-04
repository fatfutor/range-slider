// <reference path="../globals.d.ts" />

import Pin from '../View/Pin';
import Line from '../View/Line';
import Input from '../View/Input';
import Model from '../Model';
import Slider from '../View/Slider';

const SLIDER_SIZE: number = 300;

class Presenter {
  private block: JQuery<HTMLElement>;

  private options: Options;

  private line: ILine;

  private model: Model;

  private slider: Slider;

  private rangeKo: number;

  private totalSize: number;

  private pinValues: Array<number>;

  private pinUpValues: Array<number>;

  constructor(block: JQuery<HTMLElement>, options: Options) {
    this.block = block;
    this.options = options;
    this.slider = new Slider();
    this.model = new Model();
    this.totalSize = SLIDER_SIZE;
    this.pinUpValues = [...this.options.values];

    this.slider.createSlider(
      this.block,
      this.options
    );
    this.renderDomElements();
  }

  private renderDomElements = (): void => {
    this.validateOptions();

    this.rangeKo = this.model.getRangeKo(
      this.totalSize,
      this.options.max,
      this.options.min
    );

    this.pinValues = this.model.setStartValues(
      this.options.values,
      this.totalSize,
      this.options.min,
      this.options.max
    );

    this.line = new Line(
      this.block,
      this.options.orientation
    );

    this.line.setLinePosition(this.pinValues);

    this.options.values.forEach((it, idx) => {
      const pinStartPosition: number = this.model.calculateStartPinPosition(
        this.totalSize,
        this.options.max,
        this.options.min,
        it
      );

      const pin = new Pin(
        this.line.getDomElement(),
        pinStartPosition,
        this.options.pinUp,
        it,
        this.options.orientation
      );

      const input: any = new Input(
        this.block,
        it,
        this.options.min,
        this.options.max
      );

      pin.getDomElement().addEventListener('mousedown', this.onPinMove(
        this.model,
        pin,
        input,
        this.options,
        idx
      ));

      const inputNode = input.getDomElement();

      inputNode.addEventListener('change', this.onInputNodeChange(idx, pin).bind(this));
    });
  };

  private onInputNodeChange = (
    idx: number,
    pin: Pin
  ) => (evt: InputEvent) => {
    const position = (+evt.target.value - this.options.min) / this.rangeKo;
    const pinPosition: number = this.model.calculatePinPosition(0, position, this.totalSize);

    this.pinValues[idx] = this.model.validateData(this.pinValues, pinPosition, idx);

    this.pinUpValues[idx] = this.model.calculateContent(
      this.pinValues[idx],
      this.options.max,
      this.options.min,
      this.totalSize,
      0
    );

    pin.setPinValue(this.pinValues[idx], this.options.pinUp, this.pinUpValues[idx]);

    this.line.setLinePosition(this.pinValues);
  };

  private onPinMove = (
    model: Model,
    pin: Pin,
    input: Input,
    options: Options,
    idx: number
  ) => (evt: MouseEvent) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      dragged = true;

      let shift: number = model.setShift(startCoordinates, moveEvt, options.orientation);

      if (options.step) {
        if (shift >= options.step / this.rangeKo) {
          shift = Math.round(options.step / this.rangeKo);
        } else if (-shift >= options.step / this.rangeKo) {
          shift = -Math.round(options.step / this.rangeKo);
        } else {
          return;
        }
      }

      const pinPosition = model.calculatePinPosition(shift, pin.getPinPosition(), this.totalSize);

      this.pinValues[idx] = model.validateData(this.pinValues, pinPosition, idx);

      const pinUpValue = model.calculateContent(
        this.pinValues[idx],
        options.max,
        options.min,
        this.totalSize,
        options.step
      );

      pin.setPinValue(this.pinValues[idx], options.pinUp, pinUpValue);

      input.setInputValue(pinUpValue);

      this.line.setLinePosition(this.pinValues);

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    const onMouseUp = (upEvt: MouseEvent) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (moveEvt: MouseEvent) => {
          moveEvt.preventDefault();
          pin.getDomElement().removeEventListener('click', onClickPreventDefault);
        };
        pin.getDomElement().addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  private validateOptions = (): void => {
    this.options.min = this.model.validateMin(this.options.min, this.options.max);
    this.options.values = this.model.validatePinValues(
      [this.options.min, this.options.max],
      this.options.values
    );
  };

  changeOptions = (options: Options): void => {
    const blockId: string = `#${this.block[0].id}`;
    $(`${blockId} .slider__line`).remove();
    $(`${blockId} .slider__input`).remove();
    this.options.step = options.step;
    this.options.min = options.min;
    this.options.max = options.max;
    this.options.pinUp = options.pinUp;
    this.options.orientation = options.orientation;
    this.slider.setMinMax(options.min, options.max);
    this.renderDomElements();
  };
}

export default Presenter;
