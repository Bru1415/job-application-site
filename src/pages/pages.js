const primaryNav = document.querySelector(".primary-navigation");
const primaryNavChildren = primaryNav.querySelectorAll('li');


primaryNavChildren.forEach((item) =>
  item.addEventListener("click", (event) => {
    event.target.firstElementChild.click();
    console.log("click");
  })
);