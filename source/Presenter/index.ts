import Pin from '../View/Pin';
import Input from '../View/Input';
import Line from '../View/Line';

export default class Presenter {
  pin: any;
  pin2: any;
  pinUp: HTMLElement;
  input: HTMLElement | any;
  input2: HTMLElement | any;
  line: any;
  rangeKo: number;
  totalWidth: number;

  constructor(view: any, model: any, block: JQuery<HTMLElement>, options: any) {
    view.createSlider(block, options);
    this.line = new Line(block);
    this.pin = new Pin(this.line.getDomElement(), options.value[0], options.pinUp);
    this.input = new Input(block, options.value[0], options.min, options.max);

    if (options.value.length === 2) {
      this.pin2 = new Pin(this.line.getDomElement(), options.value[1], options.pinUp);
      this.input2 = new Input(block, options.value[1], options.min, options.max);
    }

    this.totalWidth = this.line.getLineWidth();
    this.rangeKo = model.getRangeKo(this.totalWidth, options);

    const pinPosition = model.calculatePinPosition((options.value[0] - options.min) / this.rangeKo, this.totalWidth);
    const pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);
    this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

    this.line.setLinePosition([pinPosition]);

    this.input.getDomElement().addEventListener('input', (ev) => {
      const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalWidth);
      const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalWidth);

      this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

      this.line.setLinePosition([pinPosition]);
    });

    this.pin.getDomElement().addEventListener('mousedown', (evt) => {
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
          this.pin.getPinPosition(),
          options.step,
          this.rangeKo
        );

        const pinPosition = model.calculatePinPosition(shift, this.totalWidth);
        const pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);

        this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

        this.input.setInputValue(pinUpValue);

        this.line.setLinePosition([pinPosition]);

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
            this.pin.getDomElement().removeEventListener('click', onClickPreventDefault)
          };
          this.pin.getDomElement().addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    if (this.pin2) {
      this.pin2.getDomElement().addEventListener('mousedown', (evt) => {
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
            this.pin2.getPinPosition(),
            options.step,
            this.rangeKo
          );

          const pinPosition = model.calculatePinPosition(shift, this.totalWidth);
          const pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);

          this.pin2.setPinValue(pinPosition, options.pinUp, pinUpValue);

          this.input2.setInputValue(pinUpValue);

          this.line.setLinePosition([pinPosition]);

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
              this.pin2.getDomElement().removeEventListener('click', onClickPreventDefault)
            };
            this.pin2.getDomElement().addEventListener('click', onClickPreventDefault);
          }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
};
