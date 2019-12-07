
export default class Presenter {
  view: any; // new class
  pin: HTMLElement;

  constructor(view: any, model: any) {
    this.view = view;
    this.pin = view.getPin();

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

        const line: HTMLElement = view.getLine();

        const x: number = model.setShiftHorizontal(startCoordinates.x,  moveEvt.clientX, this.pin, line);
        const y: number = model.setShiftVertical(startCoordinates.x,  moveEvt.clientX, this.pin, line);

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        this.view.changePinPosition(y, x)
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
