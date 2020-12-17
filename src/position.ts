export type Placement = 'right' | 'rightTop' | 'rightBottom' | 'left' | 'leftTop' | 'leftBottom' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';

export interface Position {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const arrowSize = 6; // 箭头自身相对目标中心的偏移量（标准值为6，箭头tranform之后计算得出来的值，跟箭头自身大小有关）
const space = 13; // 提示框相对目标的位置偏移量
const scale = 5; // 正常情况下提示框相对箭头的偏移量(5代表的5分之一位置)
const verticalPlacement = ['right', 'rightTop', 'rightBottom', 'left', 'leftTop', 'leftBottom'];
const horizontalPlacement = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'];

export function getPosition(placement: Placement, tarPosition: Position, position: Position) {
  if (verticalPlacement.includes(placement)) {
    const left = placement.includes('left');
    return getVerticalPosition(placement, left, tarPosition, position, arrowSize);
  }
  if (horizontalPlacement.includes(placement)) {
    const top = placement.includes('top');
    return getHorizontalPosition(placement, top, tarPosition, position, arrowSize);
  }
  return { arrow: {}, content: {} };
}

// 框框在左、右边的时候计算上下的垂直距离
function getVerticalPosition(placement: Placement, left: boolean, tarPosition: Position, position: Position, arrowSize: number) {
  const { height: winHeight } = getWinSize();
  const {
    height: tarHeight,
    top: tarTop,
    left: tarLeft,
    right: tarRight,
  } = tarPosition;
  const {
    width,
    height,
  } = position;
  const tarCenter = tarTop + tarHeight / 2;
  let contentTop = 0;
  const contentLeft = left ? tarLeft - width - space : tarRight + space;
  if (placement.includes('Top')) {
    contentTop = tarCenter - height / scale;
  } else if (placement.includes('Bottom')) {
    contentTop = tarCenter - height / scale * (scale - 1);
  } else {
    contentTop = tarCenter - height / 2;
  }
  contentTop = fixPosition(contentTop, height, winHeight);
  return {
    arrow: { top: tarCenter - contentTop - arrowSize },
    content: { top: contentTop, left: contentLeft },
  };
}

function getHorizontalPosition(placement: Placement, top: boolean, tarPosition: Position, position: Position, arrowSize: number) {
  const { width: winWidth } = getWinSize();
  const {
    width: tarWidth,
    top: tarTop,
    left: tarLeft,
    bottom: tarBottom,
  } = tarPosition;
  const {
    width,
    height,
  } = position;
  const tarCenter = tarLeft + tarWidth / 2;
  const contentTop = top ? tarTop - height - space : tarBottom + space;
  let contentLeft = 0;
  if (placement.includes('Left')) {
    contentLeft = tarCenter - width / scale;
  } else if (placement.includes('Right')) {
    contentLeft = tarCenter - width / scale * (scale - 1);
  } else {
    contentLeft = tarCenter - width / 2;
  }
  contentLeft = fixPosition(contentLeft, width, winWidth);
  return {
    arrow: { left: tarCenter - contentLeft - arrowSize },
    content: { top: contentTop, left: contentLeft },
  };
}

export function getAutoPosition(placement: Placement, tarPosition: Position, position: Position): Placement {
  const { width: winWidth, height: winHeight } = getWinSize();
  const {
    top: tarTop,
    left: tarLeft,
    right: tarRight,
    bottom: tarBottom,
  } = tarPosition;
  const {
    width,
    height,
  } = position;
  if (verticalPlacement.includes(placement)) {
    if (tarRight + width + space > winWidth) {
      return placement.replace('right', 'left') as Placement;
    }
    if (tarLeft < width) {
      return placement.replace('left', 'right') as Placement;
    }
    return placement;
  } else {
    if (tarBottom + height + space > winHeight) {
      return placement.replace('bottom', 'top') as Placement;
    }
    if (tarTop < height) {
      return placement.replace('top', 'bottom') as Placement;
    }
    return placement;
  }
}

function fixPosition(num: number, size: number, winSize: number) {
  let newNum = getMin(num);
  newNum = newNum + size > winSize ? winSize - size : newNum;
  return newNum;
}

function getMin(num: number) {
  return num > 0 ? num : 0;
}

function getWinSize() {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight };
  } else {
    const D = document.documentElement;
    return { width: D.clientWidth, height: D.clientHeight };
  }
}

export function getDomPosition(dom: Element): Position {
  return dom.getBoundingClientRect();
}
