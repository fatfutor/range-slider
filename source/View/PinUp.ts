
export default class PinUp {
  pinUp: HTMLElement;

  constructor(container: HTMLElement) {
    this.pinUp = document.createElement('div');
    this.pinUp.classList.add('slider__pin-up');
    container.appendChild(this.pinUp);
  }

  getElement = ():HTMLElement => {
    return this.pinUp;
  };

  changePinUp = (pin: HTMLElement): void => {
    // this.pin.style.top = this.pin.offsetTop - top + 'px';
    this.pinUp.textContent = pin.offsetLeft.toString();
  };
}
