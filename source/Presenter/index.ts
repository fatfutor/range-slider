
export default class Presenter {
  view: any;
  pin: HTMLElement;
  input: HTMLElement | any;
  line: HTMLElement;
  rangeKo: number;

  constructor(view: any, model: any, block: any, options: any) {
    this.view = view;
    this.view.createSlider(block, options);
    this.pin = view.getPin();
    this.input = view.getInput();
    this.line = view.getLine();
    this.rangeKo = view.getRangeKo(this.line.offsetWidth, options);

    this.input.addEventListener('input', (ev) => {
      this.view.setPinPosition(ev.target.value / this.rangeKo);
      this.view.setPinUp(ev.target.value / this.rangeKo, this.rangeKo);
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

        const shiftX: number = view.setShift(startCoordinates.x,  moveEvt.clientX);
        this.view.setPinPosition(shiftX);

        this.view.setPinUp(this.pin.offsetLeft, this.rangeKo);
        this.view.setInputValue(this.pin.offsetLeft, this.rangeKo);


        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

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
