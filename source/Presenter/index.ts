import Pin from '../View/Pin';
import Input from '../View/Input';
import Line from '../View/Line';

export default class Presenter {
  private line: any;
  private rangeKo: number;
  private totalSize: number;
  private pinValues: Array<number>;
  private pinUpValues: Array<number>;

  constructor(view: any, model: any, block: JQuery<HTMLElement>, options: any) {
    view.createSlider(block, options);
    this.line = new Line(block, options.orientation);
    this.totalSize = this.line.getLineSize();
    this.pinValues = model.setStartValues(options.values, this.totalSize, options.min, options.max);
    this.pinUpValues = [...options.values];
    this.line.setLinePosition(this.pinValues);
    this.rangeKo = model.getRangeKo(this.totalSize, options);
    
    options.values.forEach((it, idx) => {
      const pinPosition: number = this.totalSize / (options.max - options.min) * (it -  options.min);
      const pin: any = new Pin(this.line.getDomElement(), pinPosition, options.pinUp, it, options.orientation);
      const input: any = new Input(block, it, options.min, options.max);
      pin.getDomElement().addEventListener('mousedown', this.onPinMove(model, pin, input, options, idx));

      input.getDomElement().addEventListener('change', (ev) => {
        const pinPosition: number = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalSize);
        const pinUpValue: number = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalSize);

        this.pinValues[idx] = model.validateData(this.pinValues, pinPosition, idx);
        this.pinUpValues[idx] = model.validateData(this.pinUpValues, pinUpValue, idx);

        ev.target.value = this.pinUpValues[idx];

        pin.setPinValue(this.pinValues[idx], options.pinUp, this.pinUpValues[idx]);

        this.line.setLinePosition(this.pinValues);
      });
    });
  };

  private onPinMove = (model, pin, input, options, idx) => (evt) => {
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

      this.pinValues[idx] = model.validateData(this.pinValues, pinPosition, idx);

      pin.setPinValue(this.pinValues[idx], options.pinUp, pinUpValue);

      input.setInputValue(pinUpValue);

      this.line.setLinePosition(this.pinValues);

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
