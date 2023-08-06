export const removeItem = (arr, index) => {
  arr.splice(index, 1);
};
export const modifyItem = (arr, index, newValue) => {
  arr.splice(index, 1, newValue);
};
