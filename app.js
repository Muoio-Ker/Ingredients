const burger = document.querySelector(".header__burger-menu");
const headerMenu = document.querySelector(".header__links");
const headerClose = document.querySelector(".header__close");

burger.addEventListener("click", () => {
  headerMenu.classList.add("header__active");
});

headerClose.addEventListener("click", () => {
  headerMenu.classList.remove("header__active");
});
