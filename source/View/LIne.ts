const HALF_SIZE: number = 8;

export default class Line {
  line: HTMLElement;
  innerLine: HTMLElement;
  orientation: string;

  constructor(container: JQuery<HTMLElement>, orientation: string = 'horizontal') {
    this.orientation = orientation;
    const orientationLineClass = (this.orientation === 'vertical')
      ? 'slider__line--vertical'
      : 'slider__line--horizontal';

    const orientationInnerLineClass = (this.orientation === 'vertical')
      ? 'slider__inner-line--vertical'
      : 'slider__inner-line--horizontal';

    this.line = document.createElement('div');
    this.line.classList.add('slider__line', orientationLineClass);
    container.append(this.line);

    this.innerLine = document.createElement('div');
    this.innerLine.classList.add('slider__inner-line', orientationInnerLineClass);
    this.line.appendChild(this.innerLine);
  }

  getDomElement = (): HTMLElement => {
    return this.line;
  };

  getLineSize = (): number => {
    let size: number;
    switch (this.orientation) {
      case 'horizontal':
        size = this.line.offsetWidth;
        break;

      case 'vertical':
        size = this.line.offsetHeight;
        break;
    }
    return size;
  };

  setLinePosition = (values) => {
    if (this.orientation === 'horizontal') {
      if (values.length === 2) {
        this.innerLine.style.left = values[0] + HALF_SIZE + 'px';
        this.innerLine.style.width = values[1] - values[0] + 'px';
        return;
      }
      this.innerLine.style.width = values[0] + 'px';

    } else if (this.orientation === 'vertical') {
      if (values.length === 2) {
        this.innerLine.style.top = values[0] + HALF_SIZE + 'px';
        this.innerLine.style.height = values[1] - values[0] + 'px';
        return;
      }
      this.innerLine.style.height = values[0] + 'px';
    }
  }
}
