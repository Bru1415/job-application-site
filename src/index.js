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
const descriptionHeading = document.querySelector(".description-heading");

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
  // topics.style.setProperty("transform", "scale(0.75)");
};

const changePositionDependView = (element) => {
  if (shortDescription.style.getPropertyValue("display")) {
    element.style.setProperty("--left", "var(--left-splitted-view)");
    element.style.setProperty("z-index", "200");
    element.style.setProperty("--top", "var(--top-splitted-view");
  }

  if (!shortDescription.style.getPropertyValue("display")) {
    element.style.setProperty("--left", "var(--left-full-view)");
    element.style.setProperty("--top", "var(--top-full-view)");
  }
};

const changeSizeDependView = (element) => {
  if (shortDescription.style.getPropertyValue("display")) {
    element.style.setProperty("--scale-factor", "var(--scale-splitted-view)");
  }

  if (!shortDescription.style.getPropertyValue("display")) {
    element.style.setProperty("--scale-factor", "var(--scale-full-view)");
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
  console.log();

  if (shortDescription.style.getPropertyValue("display")) {
    if (screenWidth < 1040) {
      for (let item of topicsItems) {
        item.classList.add("hide");
      }
    } else if (screenWidth > 1040) {
      for (let item of topicsItems) {
        item.classList.remove("hide");
      }
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
        changeOpacity(topicsItems, 0.15);
        showShortDescription();
        changeSizeDependView(topics);
        changePositionDependView(topics);
        changeSizeDependView(shortDescNav);
        hideTopicsItems();
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

const focusOnTarget = (event, referenceNodeArray) => {
  const targetDiv = findTargetDiv(event.target, "data-position");
  const indexOfDiv = findIndexInNodeArray(referenceNodeArray, targetDiv);
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
  shortDescription.focus();
  showHeadingOfFocused();
};

const showHeadingOfFocused = () => {
  let focusedTopic = document.querySelector('div[data-position="4"]');
  focusedTopic.focus();
  descriptionHeading.textContent = focusedTopic.textContent;
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

  // let focusedTopic = document.querySelector('div[data-position="4"]');
  // focusedTopic.focus();
  // descriptionHeading.textContent = focusedTopic.textContent;

  showHeadingOfFocused();
};

const showHeading = (event) => {
  event.stopPropagation();
  const hoveredTopic =
    event.target.querySelector("span") ||
    event.target.parentNode.querySelector("span") ||
    event.target.parentNode.parentNode.querySelector("span");
  descriptionHeading.textContent = hoveredTopic.textContent;
};

const moveDataPositionScroll = (event) => {
  // event.stopPropagation();
  event.preventDefault();
  assignNewDataPosition(event.deltaY);
};

const moveDataPositionArrow = (event) => {
  // event.preventDefault();
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
  changeSizeDependView(topics);
  changePositionDependView(topics);
});

window.addEventListener("resize", () => {
  hideTopicsItems();
  changeSizeDependView(topics);
  changePositionDependView(topics);
  changeSizeDependView(shortDescNav);
});

topicsItems.forEach((item) =>
  item.addEventListener("click", (event) => {
    topicsItems[topicsItems.length - 1].classList.add(animNameMoveIcons);
    topicsItems[topicsItems.length - 1].addEventListener(
      "animationstart",
      triggerNextAnimation
    );
    focusOnTarget(event, topicsItems);
    hideTopicsItems();
  })
);

shortDescNav.addEventListener("wheel", moveDataPositionScroll, {
  passive: false,
});
shortDescNav.addEventListener("keydown", moveDataPositionArrow);

shortDescNavItems.forEach((item) => {
  item.addEventListener("click", (event) =>
    focusOnTarget(event, shortDescNavItems)
  );
  item.addEventListener("mouseover", showHeading);
  item.addEventListener("mouseleave", showHeadingOfFocused);
});
