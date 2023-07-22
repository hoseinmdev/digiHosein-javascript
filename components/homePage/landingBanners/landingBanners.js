import changeHash from "../../../utils/changeHash.js";

const landingBanners = () => {
  return `<div class="landingBannersContainer">
        <img src="../../../assets/images/landing/gamingConsole.webp" class="landingBanner" data-path="categories-1-consoles" />
        <img src="../../../assets/images/landing/littleSpeaker.webp" class="landingBanner" data-path="categories-1-speakers" />
    </div>`;
};
const timeout = () => {
  const timeout = setTimeout(() => {
    const landingBanners = document.querySelectorAll(".landingBanner");
    landingBanners.forEach((element) => {
      element.addEventListener("click", (e) => {
        changeHash(`${e.target.dataset.path}`);
                  location.reload(true);

      });
    });
    clearTimeout(timeout);
  }, 10);
};
window.addEventListener("hashchange", () => {
  if (location.hash === "#home") {
    timeout();
  }
});
timeout()
export default landingBanners;
