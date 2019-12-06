export default class View {
  container: JQuery<HTMLElement>; // $Node
  pin: HTMLElement; // Node

  constructor(container: JQuery<HTMLElement>) {
    this.container = container;
    this.createPin();
  };

  createPin = () => {
    this.pin = document.createElement('div');
    this.pin.classList.add('pin');
    this.container.append(this.pin);
  };

  getPin = () => {
    return this.pin;
  }
}
