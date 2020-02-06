// <reference path="../globals.d.ts" />
import util from '../util';
import constant from '../constant';
import Pin from '../View/Pin';
import Line from '../View/Line';
import Input from '../View/Input';
import Model from '../Model';
import Slider from '../View/Slider';

class Presenter {
  private block: JQuery<HTMLElement>;

  private options: Options;

  private min: number;

  private max: number;

  private values: Array<number>;

  private step: number;

  private pinUp: boolean;

  private orientation: string;

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
    this.min = options.min;
    this.max = options.max;
    this.values = options.values;
    this.step = options.step;
    this.pinUp = options.pinUp;
    this.orientation = options.orientation;
    this.slider = new Slider();
    this.model = new Model();
    this.totalSize = constant.SLIDER_SIZE;
    this.pinUpValues = [...options.values];

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
      this.max,
      this.min
    );

    this.pinValues = this.model.setStartValues(
      this.values,
      this.totalSize,
      this.min,
      this.max
    );

    this.line = new Line(
      this.block,
      this.orientation
    );

    this.line.setLinePosition(this.pinValues);

    this.values.forEach((it, idx) => {
      const pinStartPosition: number = this.model.calculateStartPinPosition(
        this.totalSize,
        this.max,
        this.min,
        it
      );

      const pin = new Pin(
        this.line.getDomElement(),
        pinStartPosition,
        this.pinUp,
        it,
        this.orientation
      );

      const input: Input = new Input(
        this.block,
        it,
        this.min,
        this.max
      );

      pin.getDomElement().addEventListener('mousedown', this.onPinMove(
        pin,
        input,
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
    const position = (+evt.target.value - this.min) / this.rangeKo;
    const pinPosition: number = this.model.calculatePinPosition(0, position, this.totalSize);
    this.pinValues[idx] = util.makePinValueLimit(this.pinValues, pinPosition, idx);

    this.pinUpValues[idx] = this.model.calculateContent(
      this.pinValues[idx],
      this.max,
      this.min,
      this.totalSize,
      0
    );

    pin.setPinValue(this.pinValues[idx], this.pinUp, this.pinUpValues[idx]);

    this.line.setLinePosition(this.pinValues);
  };

  private onPinMove = (
    pin: Pin,
    input: Input,
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

      let shift: number = this.model.setShift(startCoordinates, moveEvt, this.orientation);

      if (this.step) {
        if (shift >= this.step / this.rangeKo) {
          shift = Math.round(this.step / this.rangeKo);
        } else if (-shift >= this.step / this.rangeKo) {
          shift = -Math.round(this.step / this.rangeKo);
        } else {
          return;
        }
      }

      const pinPosition = this.model.calculatePinPosition(
        shift,
        pin.getPinPosition(),
        this.totalSize
      );
      this.pinValues[idx] = util.makePinValueLimit(this.pinValues, pinPosition, idx);

      const pinUpValue = this.model.calculateContent(
        this.pinValues[idx],
        this.max,
        this.min,
        this.totalSize,
        this.step
      );

      pin.setPinValue(this.pinValues[idx], this.pinUp, pinUpValue);

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
    this.min = util.makeMinLessMax(this.min, this.max);
    this.values = util.validateOptionsPinValues(
      [this.min, this.max],
      this.values
    );
  };

  changeOptions = (options: Options): void => {
    const blockId: string = `#${this.block[0].id}`;
    $(`${blockId} .slider__line`).remove();
    $(`${blockId} .slider__input`).remove();
    this.min = options.min;
    this.max = options.max;
    this.step = options.step;
    this.pinUp = options.pinUp;
    this.orientation = options.orientation;
    this.slider.setMinMax(this.min, this.max);
    this.renderDomElements();
  };
}

export default Presenter;
