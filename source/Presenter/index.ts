// <reference path="../globals.d.ts" />
import util from '../util';
import constant from '../constant';
import Pin from '../View/Pin';
import Line from '../View/Line';
import Input from '../View/Input';
import Model from '../Model';
import Container from '../View/Container';

class Presenter {
  private block: JQuery<HTMLElement>;

  public min: number;

  public max: number;

  private values: Array<number>;

  public step: number;

  private pinUp: boolean;

  private orientation: string;

  private line: Line;

  private model: Model;

  private container: Container;

  private rangeKo: number;

  private totalSize: number;

  private pinValues: Array<number>;

  private pinUpValues: Array<number>;

  constructor(block: JQuery<HTMLElement>, options: IOptions) {
    this.defaultState(block, options);
    this.renderDomElements();
  }

  private defaultState = (block: JQuery<HTMLElement>, options: IOptions): void => {
    this.block = block;
    this.min = options.min;
    this.max = options.max;
    this.values = options.values;
    this.step = options.step;
    this.pinUp = options.pinUp;
    this.orientation = options.orientation;
    this.container = new Container();
    this.model = new Model();
    this.totalSize = constant.SLIDER_SIZE;
    this.pinUpValues = [...options.values];

    this.container.createContainer(this.block, this.min, this.max);
  };

  private renderDomElements = (): void => {
    this.validateOptions();

    this.step = util.validateStep(this.min, this.max, this.step);

    this.rangeKo = this.model.getRangeKo({ width: this.totalSize, max: this.max, min: this.min });

    this.pinValues = this.model.setStartValues({
      values: this.values,
      totalSize: this.totalSize,
      min: this.min,
      max: this.max
    });

    this.line = new Line(this.block, this.orientation);

    this.line.setLinePosition(this.pinValues);

    this.values.forEach((it, idx) => {
      const pinStartPosition: number = this.model.calculateStartPinPosition({
        totalSize: this.totalSize,
        max: this.max,
        min: this.min,
        item: it
      });

      const pin: Pin = new Pin(
        this.line.getDomElement(), pinStartPosition, this.pinUp, it, this.orientation
      );

      const input: Input = new Input(this.block, it, this.min, this.max);

      pin
        .getDomElement()
        .addEventListener('mousedown', this.onPinMove(pin, input, idx));

      input
        .getDomElement()
        .addEventListener('change', this.onInputNodeChange(idx, pin).bind(this));
    });
  };

  private onInputNodeChange = (idx: number, pin: Pin) => (evt: InputEvent) => {
    const position = (Number.parseInt(evt.target.value, 10) - this.min) / this.rangeKo;
    const pinPosition: number = this.model.calculatePinPosition({
      shift: 0,
      pinPosition: position,
      totalSize: this.totalSize
    });
    this.pinValues[idx] = util.makePinValueLimit(this.pinValues, pinPosition, idx);

    this.pinUpValues[idx] = this.model.calculateContent({
      pinPosition: this.pinValues[idx],
      max: this.max,
      min: this.min,
      totalSize: this.totalSize
    });

    pin.setPinValue(this.pinValues[idx], this.pinUp, this.pinUpValues[idx]);

    this.line.setLinePosition(this.pinValues);
  };

  private onPinMove = (pin: Pin, input: Input, idx: number) => (evt: MouseEvent) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      dragged = true;

      const shift: number = this.model.setShift({
        startCoordinates,
        moveEvt,
        orientation: this.orientation,
        step: this.step,
        rangeKo: this.rangeKo
      });

      const pinPosition = this.model.calculatePinPosition({
        shift,
        pinPosition: pin.getPinPosition(),
        totalSize: this.totalSize
      });

      this.pinValues[idx] = util.makePinValueLimit(this.pinValues, pinPosition, idx);

      const pinUpValue = this.model.calculateContent({
        pinPosition: this.pinValues[idx],
        max: this.max,
        min: this.min,
        totalSize: this.totalSize
      });

      pin.setPinValue(this.pinValues[idx], this.pinUp, pinUpValue);

      input.setInputValue(pinUpValue);

      this.line.setLinePosition(this.pinValues);

      if (shift) {
        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      }
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

  public changeOptions = (options: IOptions): void => {
    const blockId: string = `#${this.block[0].id}`;
    $(`${blockId} .slider__line`).remove();
    $(`${blockId} .slider__input`).remove();
    this.min = options.min;
    this.max = options.max;
    this.values = options.values;
    this.step = options.step;
    this.pinUp = options.pinUp;
    this.orientation = options.orientation;
    this.container.setMinMax(this.min, this.max);
    this.renderDomElements();
  };
}

interface InputEvent {
  target: ITargetValue;
}

interface ITargetValue {
  value: string
}

export default Presenter;
