const pres = document.querySelector(".presentation-wrapper");
const mainGrid = document.querySelector("#main");
const animNameMoveIcons = "icons-move";
const topics = document.querySelector('.topics');
const topicsItems = document.querySelectorAll(".topics li");

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
  pres.classList.add('anim-grid-change');
  // const topicsBox = topics.getBoundingClientRect();
  // const topicsWidth = topicsBox.right - topicsBox.left;
  topics.style.setProperty('transform', 'scale(0.8)');

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

window.addEventListener("load", () => {
  manipulateCustomProperties();
  orderListItems(180, 180, 20);
});

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
