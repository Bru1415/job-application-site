const pres = document.querySelector(".presentation-wrapper");
const mainGrid = document.querySelector("#main");
const animNameMoveIcons = "icons-move";
const topics = document.querySelector(".topics");
const topicsItems = document.querySelectorAll(".topics li");
const shortDescription = document.querySelector(".short-description");

const manipulateCustomProperties = () => {
  for (let i = 0; i <= topicsItems.length / 2; i++) {
    topicsItems[i].style.setProperty(
      "--topic-move-top",
      `-${30 / (i ** 150 + 1)}vh`
    );
    topicsItems[topicsItems.length - (i + 1)].style.setProperty(
      "--topic-move-top",
      `-${30 / (i ** 150 + 1)}vh`
    );
  }
};

const changeTopicsSizePosition = () => {
  pres.classList.add("anim-grid-change");
  // const topicsBox = topics.getBoundingClientRect();
  // const topicsWidth = topicsBox.right - topicsBox.left;
  topics.style.setProperty("transform", "scale(0.8)");
};

const showShortDescription = () => {
  shortDescription.style.setProperty("transition", "left 700ms ease-in");
  shortDescription.style.setProperty("left", "45vw");
};

const orderListItems = (startDegree, degreeArea, distance) => {
  const degreeSpan = (360 - degreeArea) / (topicsItems.length - 1);
  for (let i = 0; i < topicsItems.length; i++)
    topicsItems[i].style.setProperty(
      "transform",
      `rotate(${
        startDegree + i * degreeSpan
      }deg) translate(${distance}em) rotate(-${
        startDegree + i * degreeSpan
      }deg)`
    );
};

const hideTopicsItems = () => {
  let screenWidth = window.innerWidth;

  if (screenWidth < 720) {
    for (let item of topicsItems) {
      item.classList.add("hide");
    }
  }else if(screenWidth >720) {
    for (let item of topicsItems) {
      item.classList.remove("hide");
  }
  }
};

const changeOpacity = (element, opValue) => {
  const elArr = [...element];
  elArr.forEach((el) => el.style.setProperty("opacity", opValue));
};

window.addEventListener("load", () => {
  manipulateCustomProperties();
  orderListItems(180, 180, 20);
});

window.addEventListener('resize', hideTopicsItems);

const triggerNextAnimation = (event) => {
  setTimeout(() => {
    let currentIndex = -1;
    currentIndex = Array.prototype.indexOf.call(topicsItems, event.target);
    if (currentIndex > 0 && currentIndex <= topicsItems.length - 1) {
      topicsItems[currentIndex - 1].classList.add(animNameMoveIcons);
      topicsItems[currentIndex - 1].addEventListener(
        "animationstart",
        triggerNextAnimation
      );
      if (currentIndex === 1) {
        orderListItems(270, 180, 20);
        changeTopicsSizePosition();
        // setTimeout(() => showShortDescription(), 800);
        showShortDescription();
        changeOpacity(topicsItems, 0.15);
      }
    }
  }, 200);
};

topicsItems.forEach((item) =>
  item.addEventListener("click", (event) => {
    topicsItems[topicsItems.length - 1].classList.add(animNameMoveIcons);
    topicsItems[topicsItems.length - 1].addEventListener(
      "animationstart",
      triggerNextAnimation
    );
  })
);
