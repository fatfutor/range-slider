// / <reference path="../globals.d.ts" />

class Container {
  private container: JQuery<HTMLElement>;

  constructor(container: JQuery<HTMLElement>) {
    this.container = container;
    this.createContainer();
  }

  private createContainer = (): void => {
    this.container.addClass('slider');
  };
}

export default Container;
