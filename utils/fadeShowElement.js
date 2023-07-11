const fadeShow = (elementToShow, timeToShow) => {
  elementToShow.classList.add("noneShow");
  setTimeout(() => {
    elementToShow.classList.remove("noneShow");
  }, Number(timeToShow));
};
export default fadeShow;
