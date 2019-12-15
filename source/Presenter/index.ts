import Pin from '../View/Pin';
import Input from '../View/Input';
import Line from '../View/Line';

export default class Presenter {
  pins: any; // Array
  line: any;
  rangeKo: number;
  totalSize: number;
  values: any;

  constructor(view: any, model: any, block: JQuery<HTMLElement>, options: any) {
    view.createSlider(block, options);
    this.line = new Line(block, options.orientation);
    this.totalSize = this.line.getLineSize();
    this.values = model.setStartValues(options.value, this.totalSize, options.min, options.max);
    this.line.setLinePosition(this.values);
    this.pins = [];
    this.rangeKo = model.getRangeKo(this.totalSize, options);

    options.value.forEach((it, idx) => {

      const pinPosition = this.totalSize / (options.max - options.min) * (it -  options.min);

      const pin = new Pin(this.line.getDomElement(), pinPosition, options.pinUp, it, options.orientation);
      const input = new Input(block, it, options.min, options.max);

      pin.getDomElement().addEventListener('mousedown', this.onPinMove(model, pin, input, options, idx));
      this.pins.push({pin, input});

      // input.getDomElement().addEventListener('input', (ev) => {
      //   const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalSize);
      //   const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalSize);
      //
      //   this.values[idx] = model.validateValue(this.values, pinPosition, idx);
      //
      //   pin.setPinValue(this.values[idx], options.pinUp, pinUpValue);
      //   pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
      //
      //   this.line.setLinePosition(this.values);
      // });

    });
  };

  onPinMove = (model, pin, input, options, idx) => (evt) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      const coordinate = (options.orientation === 'vertical') ? startCoordinates.y : startCoordinates.x;
      const move = (options.orientation === 'vertical') ? moveEvt.clientY : moveEvt.clientX;

      const shift: number = model.setShift(coordinate, move, this.totalSize, pin.getPinPosition(), options.step, this.rangeKo);

      const pinPosition = model.calculatePinPosition(shift, this.totalSize);
      const pinUpValue = model.calculateContent(pinPosition, options, this.totalSize);

      this.values[idx] = model.validateValue(this.values, pinPosition, idx);

      pin.setPinValue(this.values[idx], options.pinUp, pinUpValue);

      input.setInputValue(pinUpValue);

      this.line.setLinePosition(this.values);

      if (move - coordinate >= options.step / this.rangeKo || coordinate - move >= options.step / this.rangeKo) {
        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (evt) => {
          evt.preventDefault();
          pin.getDomElement().removeEventListener('click', onClickPreventDefault)
        };
        pin.getDomElement().addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
};
