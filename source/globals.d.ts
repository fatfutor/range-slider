
interface Options {
  min: number;
  max: number;
  values: Array<number>;
  step: number;
  pinUp: boolean;
  orientation: string;
}

interface Line {}

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
