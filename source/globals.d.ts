
interface Options {
  min: number;
  max: number;
  values: Array<number>;
  step: number;
  pinUp: boolean;
  orientation: string;
}

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

interface ISlider {}
