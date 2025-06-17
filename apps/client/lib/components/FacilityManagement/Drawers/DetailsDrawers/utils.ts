type CloseFn = () => void;
const closeFns: CloseFn[] = [];

export const registerCloseFn = (fn: CloseFn) => {
  closeFns.push(fn);
};

export const clearCloseFns = () => {
  closeFns.length = 0;
};

export const closeAllDrawers = () => {
  closeFns.forEach((fn) => fn());
  clearCloseFns();
};
