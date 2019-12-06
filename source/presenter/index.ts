
export default class Presenter {
  pin: HTMLElement;

  constructor(pin: HTMLElement) {
    this.pin = pin;
    this.allCode();
  };

  allCode = () => {
    const that = this;
    this.pin.addEventListener('mousedown', (evt) => {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        dragged = true;

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        that.pin.style.top = (that.pin.offsetTop - shift.y) + 'px';
        that.pin.style.left = (that.pin.offsetLeft - shift.x) + 'px';

      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          const onClickPreventDefault = (evt) => {
            evt.preventDefault();
            that.pin.removeEventListener('click', onClickPreventDefault)
          };
          that.pin.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
};
