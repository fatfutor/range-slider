import constant from '../constant';

class Line {
  private line: HTMLElement;

  private innerLine: HTMLElement;

  private orientation: string;

  constructor(container: JQuery<HTMLElement>, orientation: string = constant.HORIZONTAL) {
    this.createLine(container, orientation);
  }

  private createLine = (container: JQuery<HTMLElement>, orientation: string): void => {
    this.orientation = orientation;
    const orientationLineClass = (this.orientation === constant.VERTICAL)
      ? 'slider__line--vertical'
      : 'slider__line--horizontal';

    const orientationInnerLineClass = (this.orientation === constant.VERTICAL)
      ? 'slider__inner-line--vertical'
      : 'slider__inner-line--horizontal';

    this.line = document.createElement('div');
    this.line.classList.add('slider__line', orientationLineClass);
    container.append(this.line);

    this.innerLine = document.createElement('div');
    this.innerLine.classList.add('slider__inner-line', orientationInnerLineClass);
    this.line.appendChild(this.innerLine);
  };

  getDomElement = (): HTMLElement => this.line;

  getLineSize = (): number => {
    if (this.orientation === constant.HORIZONTAL) {
      return this.line.offsetWidth;
    }

    if (this.orientation === constant.VERTICAL) {
      return this.line.offsetHeight;
    }
    return this.line.offsetWidth;
  };

  setLinePosition = (values: Array<number>): void => {
    if (this.orientation === constant.HORIZONTAL) {
      if (values.length === 2) {
        this.innerLine.style.left = `${values[0] + constant.HALF_SIZE}px`;
        this.innerLine.style.width = `${values[1] - values[0]}px`;
        return;
      }
      this.innerLine.style.width = `${values[0]}px`;
    } else if (this.orientation === constant.VERTICAL) {
      if (values.length === 2) {
        this.innerLine.style.top = `${values[0] + constant.HALF_SIZE}px`;
        this.innerLine.style.height = `${values[1] - values[0]}px`;
        return;
      }
      this.innerLine.style.height = `${values[0]}px`;
    }
  };
}

export default Line;
