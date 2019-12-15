import Pin from '../View/Pin';
import Input from '../View/Input';
import Line from '../View/Line';

export default class Presenter {
  pins: any; // Array
  line: any;
  rangeKo: number;
  totalWidth: number;
  values: any;

  constructor(view: any, model: any, block: JQuery<HTMLElement>, options: any) {
    view.createSlider(block, options);
    this.line = new Line(block);
    this.values = [...options.value];
    this.line.setLinePosition(this.values);
    this.pins = [];
    this.totalWidth = this.line.getLineWidth();
    this.rangeKo = model.getRangeKo(this.totalWidth, options);

    this.values.forEach((it, idx) => {

      const pin = new Pin(this.line.getDomElement(), it, options.pinUp);
      const input = new Input(block, it, options.min, options.max);

      pin.getDomElement().addEventListener('mousedown', this.onPinMove(model, pin, input, options, idx));
      this.pins.push({pin, input});

    });




    // this.input.getDomElement().addEventListener('input', (ev) => {
    //   const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalWidth);
    //   const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalWidth);
    //
    //   this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);
    //
    //   this.line.setLinePosition([pinPosition]);
    // });

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

      const shift: number = model.setShift(
        startCoordinates.x,
        moveEvt.clientX,
        this.totalWidth,
        pin.getPinPosition(),
        options.step,
        this.rangeKo
      );

      const pinPosition = model.calculatePinPosition(shift, this.totalWidth);
      const pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);

      pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

      input.setInputValue(pinUpValue);

      this.values[idx] = pinPosition;
      this.line.setLinePosition(this.values);

      if (moveEvt.clientX - startCoordinates.x >= options.step / this.rangeKo
        || startCoordinates.x - moveEvt.clientX >= options.step / this.rangeKo) {
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
