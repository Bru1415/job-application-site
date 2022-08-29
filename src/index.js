const pres = document.querySelector(".presentation-wrapper");
const mainGrid = document.querySelector("#main");
const animNameMoveIcons = "icons-move";
const topics = document.querySelector("#topics");
const topicsItems = document.querySelectorAll(".topics li");
const topicItem = document.querySelector(".topics li");
const profilePhoto = document.querySelector(".profile-photo");
const shortDescription = document.querySelector(".short-description");
const shortDescNavItems = document.querySelectorAll(
  ".short-description-nav > div"
);
const shortDescNav = document.querySelector(".short-description-nav");
const middleDescNavItem = document.querySelector('div[data-position = "4"]');
const descriptionHeading = document.querySelector(".description-heading");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

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

const changeTopicsGridPosition = () => {
  pres.classList.add("anim-grid-change");
};

const showShortDescription = () => {
  shortDescription.style.setProperty("transition", "left 1000ms ease-in-out");
  shortDescription.style.setProperty("left", "var(--left)");
};

const orderListItems = (startDegree, degreeArea) => {
  let distance = `calc(var(--topics-width) * 0.5 + var(--topics-width) * var(--topics-item--scale) * 0.55)`;

  const degreeSpan = degreeArea / (topicsItems.length - 1);
  for (let i = 0; i < topicsItems.length; i++)
    topicsItems[i].style.setProperty(
      "transform",
      `rotate(${
        startDegree + i * degreeSpan
      }deg) translate(${distance}) rotate(-${startDegree + i * degreeSpan}deg)`
    );
};

const hideTopicsDependScreen = () => {
  topics.setAttribute("data-screen", "half");
  profilePhoto.setAttribute("data-screen", "half");
};

const changeOpacity = (element, opValue) => {
  const elArr = [...element];
  elArr.forEach((el) => el.style.setProperty("opacity", opValue));
};

const changeZetIndex = (element, zIndex) => {
  const elArr = [...element];
  elArr.forEach((el) => el.style.setProperty("z-index", zIndex));
}

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
        orderListItems(270, 180);
        changeTopicsGridPosition();
        changeOpacity(topicsItems, 0.1);
        changeZetIndex(topicsItems,-1);
        showShortDescription();
        hideTopicsDependScreen();
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

let isGreater720 = null;

window.addEventListener("load", () => {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  if (screenWidth >= 720) {
    isGreater720 = true;
    orderListItems(170, 200);
  }

  if (screenWidth < 720) {
    isGreater720 = false;
    orderListItems(120, 300);
  }

  manipulateCustomProperties();
});

window.addEventListener("resize", () => {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  if (
    screenWidth >= 720 &&
    !isGreater720 &&
    !shortDescription.style.getPropertyValue("display")
  ) {
    isGreater720 = true;
    orderListItems(170, 200);
  }

  if (
    screenWidth < 720 &&
    isGreater720 &&
    !shortDescription.style.getPropertyValue("display")
  ) {
    isGreater720 = false;
    orderListItems(120, 300);
  }
});

topicsItems.forEach((item) =>
  item.addEventListener("click", (event) => {
    topicsItems[topicsItems.length - 1].classList.add(animNameMoveIcons);
    topicsItems[topicsItems.length - 1].addEventListener(
      "animationstart",
      triggerNextAnimation
    );
    focusOnTarget(event, topicsItems);
    // hideTopicsItems();
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

mobileNavToggle.addEventListener("click", (event) => {
  event.preventDefault();

  let isPrimaryNavExpanded = primaryNav.getAttribute("data-is-expanded");

  if (isPrimaryNavExpanded === "true") {
    mobileNavToggle.setAttribute("aria-expanded", "false");
    primaryNav.setAttribute("data-is-expanded", "false");
  } else if (isPrimaryNavExpanded === "false") {
    mobileNavToggle.setAttribute("aria-expanded", "true");
    primaryNav.setAttribute("data-is-expanded", "true");
  }
  // mobileNavToggle.setAttribute("data-close-icon", `${!isToggleExpanded}`);
});
