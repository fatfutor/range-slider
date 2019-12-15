const HALF_WIDTH = 8;

export default class Line {
  line: HTMLElement;
  innerLine: HTMLElement;

  constructor(container: JQuery<HTMLElement>) {
    this.line = document.createElement('div');
    this.line.classList.add('slider__line');
    container.append(this.line);

    this.innerLine = document.createElement('div');
    this.innerLine.classList.add('slider__inner-line');
    this.line.appendChild(this.innerLine);
  }

  getDomElement = (): HTMLElement => {
    return this.line;
  };

  getLineWidth = (): number => {
    return this.line.offsetWidth;
  };

  setLinePosition = (values) => {

    if (values.length === 2) {
      this.innerLine.style.left = values[0] + HALF_WIDTH + 'px';
      this.innerLine.style.width = values[1] - values[0] + 'px';
      return;
    }

    this.innerLine.style.width = values[0] + 'px';
  }
}
