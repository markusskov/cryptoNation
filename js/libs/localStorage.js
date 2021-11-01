export const saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = function (getkey) {
  if (localStorage.getItem(getkey) !== null) {
    return JSON.parse(localStorage.getItem(getkey));
  } else {
    return [];
  }
};
