
export default class Line {
  line: HTMLElement;

  constructor(container: JQuery<HTMLElement>) {
    this.line = document.createElement('div');
    this.line.classList.add('slider__line');
    container.append(this.line);
  }

  getElement = ():HTMLElement => {
    return this.line;
  };
}
