import scrollToUp from "../../utils/scrollToUp.js";

const scrollToUpButton = () => {
  return `<button class="scrollToUpButton">بازگشت به بالا ⇧</button>`;
};

const buttonAction = () => {
  const timeout = setTimeout(() => {
    const scrollToUpButton = document.querySelector(".scrollToUpButton");
    if (scrollToUpButton)
      scrollToUpButton.addEventListener("click", scrollToUp);
    clearTimeout(timeout);
  }, 100);
};
buttonAction();
addEventListener(
  "hashchange",
  () => location.hash === "#home" && buttonAction()
);
export default scrollToUpButton;
