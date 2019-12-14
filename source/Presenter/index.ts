import Pin from '../View/Pin';

export default class Presenter {
  pin: any;
  // pin2: any;
  pinUp: HTMLElement;
  input: HTMLElement | any;
  line: HTMLElement;
  innerLine: HTMLElement;
  rangeKo: number;
  totalWidth: number;

  constructor(view: any, model: any, block: any, options: any) {
    view.createSlider(block, options);
    this.input = view.getInput();
    this.line = view.getLine();
    this.pin = new Pin(this.line, options.value, options.pinUp);
    // this.pin2 = new Pin(this.line, options.value, options.pinUp);
    this.innerLine = view.getInnerLine();
    this.totalWidth = this.line.offsetWidth;
    this.rangeKo = model.getRangeKo(this.line.offsetWidth, options);

    const pinPosition = model.calculatePinPosition((options.value - options.min) / this.rangeKo, this.totalWidth);
    const pinUpValue = model.calculateContent(pinPosition, options, this.totalWidth);
    this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

    this.innerLine.style.width = pinPosition + 'px';

    this.input.addEventListener('input', (ev) => {
      const pinPosition = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalWidth);
      const pinUpValue = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalWidth);

      this.pin.setPinValue(pinPosition, options.pinUp, pinUpValue);

      this.innerLine.style.width = pinPosition + 'px';
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

        this.input.value = pinUpValue.toString();

        this.innerLine.style.width = pinPosition + 'px';

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
  };
};
