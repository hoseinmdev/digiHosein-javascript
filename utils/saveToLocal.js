const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export default saveToLocal;
