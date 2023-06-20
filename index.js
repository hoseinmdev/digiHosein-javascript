const contentDiv = document.getElementById("app");
if (location.hash === "") {
  location.hash = "#home";
}
// location.hash = "#home";
const getPage = (currentlyPage) => {
  const pages = {
    home: "This is the Home page. Welcome to my site.",
    cart: "This page will describe what my site is about",
    singlePage: "Contact me on this page if you have any questions",
  };
  return pages[currentlyPage];
};
const loadPage = () => {
  const currentlyPage = location.hash.substr(1);
  contentDiv.innerHTML = getPage(currentlyPage);
};
let globalEmail;
const loginUser = (email, callBack) => {
  setTimeout(() => callBack(email), 2000);
};
const loginUserCallback = (e) => {
  console.log(e)
}
loginUser("daskl;dkas;ldas", loginUserCallback);

window.addEventListener("hashchange", loadPage);
