const pres = document.querySelector(".presentation-wrapper");
const mainGrid = document.querySelector("#main");
const animNameMoveIcons = "icons-move";
const topics = document.querySelector(".topics");
const topicsItems = document.querySelectorAll(".topics li");
const shortDescription = document.querySelector(".short-description");
const shortDescNavItems = document.querySelectorAll(
  ".short-description-nav > div"
);
const shortDescNav = document.querySelector(".short-description-nav");
const middleDescNavItem = document.querySelector('div[data-position = "4"]');

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

const positionShortDescription = () => {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let fontSize = parseFloat(
    getComputedStyle(document.querySelector("html")).getPropertyValue(
      "font-size"
    )
  );
  let mediaQueryWidth1 = fontSize * 35;
  let mediaQueryWidth2 = fontSize * 45;

  if (screenWidth >= mediaQueryWidth1) {
    shortDescription.style.setProperty("left", "45vw");
  } else if (screenWidth >= mediaQueryWidth2) {
    shortDescription.style.setProperty("left", "30vw");
  } else {
    shortDescription.style.setProperty("left", "15vw");
  }
};

const showShortDescription = () => {
  shortDescription.style.setProperty("transition", "left 1200ms ease-in-out");
  shortDescription.style.setProperty("left", "var(--left)");
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
  } else if (screenWidth > 720) {
    for (let item of topicsItems) {
      item.classList.remove("hide");
    }
  }
};

const changeOpacity = (element, opValue) => {
  const elArr = [...element];
  elArr.forEach((el) => el.style.setProperty("opacity", opValue));
};

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
      if (currentIndex === 2) {
        shortDescription.style.setProperty("display", "block");
        shortDescription.style.setProperty("left", "200vw");
      }
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

const findIndexInNodeArray = (nodeArray, targetDiv) => {
  const currentIndex = Array.prototype.indexOf.call(nodeArray, targetDiv);

  return currentIndex;
};

const findTargetDiv = (target, attribute) => {
  let targetDiv = target;
  if (!targetDiv.getAttribute(attribute)) {
    targetDiv = target.parentNode;
  }
  while (!targetDiv.getAttribute(attribute)) {
    targetDiv = targetDiv.parentNode;
  }

  return targetDiv;
};

const focusOnTarget = (event) => {
  const targetDiv = findTargetDiv(event.target, "data-position");
  const indexOfDiv = findIndexInNodeArray(shortDescNavItems, targetDiv);
  const difference = 4 - (indexOfDiv + 1);
  let newDataPosition;
  for (let i = 0; i < 7; i++) {
    if (i + 1 + difference < 1) {
      newDataPosition = 7 - (Math.abs(difference) - (i + 1));
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    } else if (i + 1 + difference > 7) {
      newDataPosition = Math.abs(difference) - (7 - (i + 1));
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    } else {
      newDataPosition = i + 1 + difference;
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    }
  }
};

const assignNewDataPosition = (eventTrigger) => {
  let currentDataPosition;
  if (eventTrigger > 0) {
    for (let i = 0; i < 7; i++) {
      currentDataPosition = shortDescNavItems[i].getAttribute("data-position");
      if (currentDataPosition - 1 < 1) {
        shortDescNavItems[i].setAttribute("data-position", "7");
      } else {
        shortDescNavItems[i].setAttribute(
          "data-position",
          currentDataPosition - 1
        );
      }
    }
  } else if (eventTrigger < 0) {
    for (let i = 0; i < 7; i++) {
      currentDataPosition = shortDescNavItems[i].getAttribute("data-position");
      if (+currentDataPosition + 1 > 7) {
        shortDescNavItems[i].setAttribute("data-position", "1");
      } else {
        shortDescNavItems[i].setAttribute(
          "data-position",
          +currentDataPosition + 1
        );
      }
    }
  }

  document.querySelector('div[data-position="4"]').focus();
};

const moveDataPositionScroll = (event) => {
  // event.stopPropagation();
  event.preventDefault();
  assignNewDataPosition(event.deltaY);
};

const moveDataPositionArrow = (event) => {
  event.preventDefault();
  let pressedKey = event.key;
  let trigger = null;
  if (pressedKey === "ArrowLeft") {
    trigger = -1;
  } else if (pressedKey === "ArrowRight") {
    trigger = 1;
  }

  if (trigger && (trigger === 1 || trigger === -1)) {
    assignNewDataPosition(trigger);
  } else {
    return;
  }
};

window.addEventListener("load", () => {
  manipulateCustomProperties();
  orderListItems(180, 180, 20);
});

window.addEventListener("resize", hideTopicsItems);

topicsItems.forEach((item) =>
  item.addEventListener("click", (event) => {
    topicsItems[topicsItems.length - 1].classList.add(animNameMoveIcons);
    topicsItems[topicsItems.length - 1].addEventListener(
      "animationstart",
      triggerNextAnimation
    );
  })
);

shortDescNav.addEventListener("wheel", moveDataPositionScroll, {
  passive: false,
});
shortDescNav.addEventListener("keydown", moveDataPositionArrow);

shortDescNavItems.forEach((item) => {
  item.addEventListener("click", focusOnTarget);
});
