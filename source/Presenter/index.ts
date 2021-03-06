// <reference path="../globals.d.ts" />
import util from '../util';
import constant from '../constant';
import Pin from '../View/Pin';
import Line from '../View/Line';
import Model from '../Model';
import Container from '../View/Container';

class Presenter {
  private block: JQuery<HTMLElement>;

  public min: number;

  public max: number;

  public values: Array<number>;

  public step: number;

  private pinUp: boolean;

  private orientation: string;

  private line: Line;

  private model: Model;

  private container: Container;

  private rangeKo: number;

  private totalSize: number;

  private pinValues: Array<number>;

  public pins: Array<Pin>;

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
    this.container = new Container(this.block);
    this.model = new Model();
    this.totalSize = constant.SLIDER_SIZE;
    this.pins = [];
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

    const line: HTMLElement = this.line.getDomElement();

    line.addEventListener('click', this.onLineClick.bind(this));

    this.line.setLinePosition(this.pinValues);

    this.values.forEach((it, idx) => {
      const pinStartPosition: number = this.model.calculateStartPinPosition({
        totalSize: this.totalSize,
        max: this.max,
        min: this.min,
        item: it
      });

      const pin: Pin = new Pin(
        line, pinStartPosition, this.pinUp, it, this.orientation
      );

      pin
        .getDomElement()
        .addEventListener('mousedown', this.onPinMove(idx));

      this.pins[idx] = pin;
    });
  };

  private onLineClick = (evt: MouseEvent) => {
    let coordinate: number;
    if (this.orientation === constant.HORIZONTAL) {
      coordinate = evt.clientX - this.line
        .getDomElement().getBoundingClientRect().x - constant.HALF_SIZE;
      coordinate = util.validateLineCoordinate(coordinate, constant.SLIDER_SIZE);
    }
    if (this.orientation === constant.VERTICAL) {
      coordinate = evt.clientY - this.line
        .getDomElement().getBoundingClientRect().y - constant.HALF_SIZE;
      coordinate = util.validateLineCoordinate(coordinate, constant.SLIDER_SIZE);
    }

    const nearIndex = util.getNearIndex(this.pinValues, coordinate);

    this.pinValues[nearIndex] = util.validateLineStep(
      this.pinValues[nearIndex],
      this.step / this.rangeKo,
      coordinate
    );

    const pinUpValue = this.model.calculateContent({
      pinPosition: this.pinValues[nearIndex],
      max: this.max,
      min: this.min,
      totalSize: this.totalSize
    });
    this.pins[nearIndex].setPinValue(this.pinValues[nearIndex], this.pinUp, pinUpValue);

    this.line.setLinePosition(this.pinValues);

    // не отображается заначения в панели todo
    this.values[nearIndex] = this.model.calculateContent({
      pinPosition: this.pinValues[nearIndex],
      max: this.max,
      min: this.min,
      totalSize: this.totalSize
    });
  };

  private onPinMove = (idx: number) => (evt: MouseEvent) => {
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
        idx,
        values: this.pinValues,
        totalSize: this.totalSize,
        stepKo: this.step / this.rangeKo
      });

      this.pinValues[idx] = util.makePinValueLimit({
        values: this.pinValues,
        value: pinPosition,
        idx
      });

      const pinUpValue = this.model.calculateContent({
        pinPosition: this.pinValues[idx],
        max: this.max,
        min: this.min,
        totalSize: this.totalSize
      });

      this.pins[idx].setPinValue(this.pinValues[idx], this.pinUp, pinUpValue);

      this.line.setLinePosition(this.pinValues);

      this.values[idx] = this.model.calculateContent({
        pinPosition: this.pinValues[idx],
        max: this.max,
        min: this.min,
        totalSize: this.totalSize
      });

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
          this.pins[idx].getDomElement().removeEventListener('click', onClickPreventDefault);
        };
        this.pins[idx].getDomElement().addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  private validateOptions = (): void => {
    this.min = util.makeMinLessMax(this.min, this.max);
    this.values = util.validateOptionsPinValues([this.min, this.max], this.values);
  };

  public changeOptions = (options: IOptions): void => {
    const blockId: string = `#${this.block[0].id}`;
    $(`${blockId} .slider__line`).remove();
    this.min = options.min;
    this.max = options.max;
    this.values = options.values;
    this.step = options.step;
    this.pinUp = options.pinUp;
    this.orientation = options.orientation;
    this.renderDomElements();
  };
}

export default Presenter;
