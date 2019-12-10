
export default class Presenter {
  pin: HTMLElement;
  pinUp: HTMLElement;
  input: HTMLElement | any;
  line: HTMLElement;
  rangeKo: number;
  totalWidth: number;

  constructor(view: any, model: any, block: any, options: any) {
    view.createSlider(block, options);
    this.pin = view.getPin();
    this.pinUp = view.getPinUp();
    this.input = view.getInput();
    this.line = view.getLine();
    this.totalWidth = this.line.offsetWidth;
    this.rangeKo = model.getRangeKo(this.line.offsetWidth, options);

    this.pin.style.left
      = model.calculatePinPosition((options.value - options.min) / this.rangeKo, this.totalWidth) + 'px';

    this.input.addEventListener('input', (ev) => {
      const position = model.calculatePinPosition((ev.target.value - options.min) / this.rangeKo, this.totalWidth);
      const content = model.calculateContent((ev.target.value - options.min) / this.rangeKo, options, this.totalWidth);

      this.pin.style.left = position + 'px';
      if (options.pinUp) {
        this.pinUp.textContent = content;
      }
    });


    this.pin.addEventListener('mousedown', (evt) => {
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
          this.pin.offsetLeft,
          options.step,
          this.rangeKo
        );

        this.pin.style.left = model.calculatePinPosition(shift, this.totalWidth) + 'px';

        if (
          moveEvt.clientX - startCoordinates.x >= options.step / this.rangeKo
          || startCoordinates.x - moveEvt.clientX >= options.step / this.rangeKo
        ) {
          startCoordinates = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
        }


        const content = model.calculateContent(this.pin.offsetLeft, options, this.totalWidth);

        if (options.pinUp) {
          this.pinUp.textContent = content.toString();
        }
        this.input.value = content.toString();


      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          const onClickPreventDefault = (evt) => {
            evt.preventDefault();
            this.pin.removeEventListener('click', onClickPreventDefault)
          };
          this.pin.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
};
