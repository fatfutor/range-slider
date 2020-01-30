
interface Options {
  min: number;
  max: number;
  values: Array<number>;
  step: number;
  pinUp: boolean;
  orientation: string;
}

interface ILine {
  setLinePosition: (values: Array<number>) => void;
  getDomElement: () => HTMLElement;
  getLineSize: () => number;
}

interface Model {}

interface Slider {}

interface Pin {}

interface Input {}

interface Presenter {}

interface MousePosition {
  x: number;
  y: number;
}

interface InputEvent {
  target: targetValue;
}

interface targetValue {
  value: string
}

interface JQuery {
  myPlugin: any;
}
