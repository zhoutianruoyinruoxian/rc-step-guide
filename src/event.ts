let resizeTimeout;
export function onResizeEnd(callback: Function) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => { callback(); }, 250);
}
