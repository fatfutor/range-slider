
interface IOptions {
  min: number;
  max: number;
  values: Array<number>;
  step: number;
  pinUp: boolean;
  orientation: string;
}

interface JQuery {
  myPlugin: any;
}

interface ISlider {
  changeOptions: (options: IOptions) => void;
  step: number;
  min: number;
  max: number;
}
