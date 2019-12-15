
export default class View {
  range: HTMLElement;

  createSlider = (container: JQuery<HTMLElement>, options: any): void => {
    container.addClass('slider');
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
    this.range.textContent = `от ${options.min} - до ${options.max}`;
    container.append(this.range);
  };
}

//// - Помимо базовых конфигов вроде мининимально, максимального и текущего значения
//// - размер шага,
// - вертикальный/горизонтальный вид,
//// - одиночное значение или интервал,
// - возможность на лету изменить значение "снаружи" javascript-ом,
//// - возможность включать/отключать элемент над бегунком,
////который показывает значение и который ползает за мышкой
//// (при выключении просто кругляш сам только на слайдера, при включении над кругляшом элемент с цифрой).
