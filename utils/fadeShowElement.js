const fadeShow = (elementToShow, timeToShow) => {
  setTimeout(() => {
    elementToShow.classList.remove("noneShow");
  }, Number(timeToShow));
};
export default fadeShow;
