import changeHash from "../../../utils/changeHash.js";

const emptyCartPage = () => {
  const emptyCartPage = `
    <div class="siteLayoutContent">
        <img class="emptyCartImage" src="../assets/images/other/empty-shopping-trolley.png"/>
        <p class="yourCartIsEmptyText">سبد خرید شما خالی است :(</p>
        <button class="backToHomePageButton">بازگشت به صفحه اصلی</button>
        </div>`;
  timeout();
  return emptyCartPage;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const backToHomePageButton = document.querySelector(
      ".backToHomePageButton"
    );
    backToHomePageButton.addEventListener("click", () => changeHash("#home"));
    clearTimeout(timeout);
  }, 100);
};
window.addEventListener("hashchange", () => {
  if (location.hash === "#cart") timeout();
});
export default emptyCartPage;
