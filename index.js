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
const shortDescNavWrapper = document.querySelector(".short-desc-nav-wrapper");
const middleDescNavItem = document.querySelector('div[data-position = "4"]');
const shortNavArrows = document.querySelectorAll(".navigation__arrow");
const descriptionHeading = document.querySelectorAll(".description-heading");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const primaryNavChildren = primaryNav.querySelectorAll("li");
const shortDescHeading = document.querySelector(".description-heading");
const shortContent = document.querySelector(".short-content");

const headerPhoto = document.querySelector(".header_photo img");

const shortDescToggle = document.querySelector(".short-desc-nav-toggle");

const hrefElements = document.querySelectorAll("*[href]");
const srcElements = document.querySelectorAll("*[src]");

// srcElements.forEach((item) => {
//   item.addEventListener("error", (event) => {
//     let srcValue = event.target.src;
//     const splittedSrc = srcValue.split("/");

//     const neededSrcPart = splittedSrc.slice(3).join("/");

//     if (!srcValue.startsWith("https://bru1415.github.io/job-application-site")) {
//       event.target.src = `https://bru1415.github.io/job-application-site/${neededSrcPart}`;
//     }
//   });
// });

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
        orderListItems(270, 180);
        changeTopicsGridPosition();
        changeOpacity(topicsItems, 0.1);
        changeZetIndex(topicsItems, -1);
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

// ------------------------------------------------------------------------------------------------------------

const showTabpanel = (tabpanelContainer, tabListContainer, attributeOfTab) => {
  const tabPanelList = tabpanelContainer.querySelectorAll('[role="tabpanel"]');
  const targetTab = tabListContainer.querySelector(`${attributeOfTab}`);
  const targetTabName = targetTab.getAttribute("aria-controls");
  const targetTabPanel = tabpanelContainer.querySelector(`#${targetTabName}`);
  tabPanelList.forEach((item) => item.setAttribute("hidden", "true"));
  targetTabPanel.removeAttribute("hidden");
  targetTab.setAttribute("aria-selected", "true");
};

// ------------------------------------------------------------------------------------------------------------

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
  for (let i = 0; i < 6; i++) {
    if (i + 1 + difference < 1) {
      newDataPosition = 6 - (Math.abs(difference) - (i + 1));
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    } else if (i + 1 + difference > 6) {
      newDataPosition = Math.abs(difference) - (6 - (i + 1));
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    } else {
      newDataPosition = i + 1 + difference;
      shortDescNavItems[i].setAttribute("data-position", newDataPosition);
    }
  }
  shortDescription.focus();
  showHeadingOfFocused();
  showTabpanel(shortContent, shortDescNav, '[data-position="4"]');
};

const showHeadingOfFocused = () => {
  let focusedTopic = document.querySelector(
    '.short-description-nav div[data-position="4"] span'
  );
  let focusedDiv = document.querySelector(
    '.short-description-nav div[data-position="4"]'
  );
  focusedDiv.focus();
  descriptionHeading.forEach(
    (item) => (item.textContent = focusedTopic.textContent)
  );
};

const assignNewDataPosition = (eventTrigger) => {
  let currentDataPosition;
  if (eventTrigger > 0) {
    for (let i = 0; i < 6; i++) {
      currentDataPosition = shortDescNavItems[i].getAttribute("data-position");
      if (currentDataPosition - 1 < 1) {
        shortDescNavItems[i].setAttribute("data-position", "6");
      } else {
        shortDescNavItems[i].setAttribute(
          "data-position",
          currentDataPosition - 1
        );
      }
    }
  } else if (eventTrigger < 0) {
    for (let i = 0; i < 6; i++) {
      currentDataPosition = shortDescNavItems[i].getAttribute("data-position");
      if (+currentDataPosition + 1 > 6) {
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
  showTabpanel(shortContent, shortDescNav, '[data-position="4"]');
};

const showHeading = (event) => {
  event.stopPropagation();
  const hoveredTopic =
    event.target.querySelector("span") ||
    event.target.parentNode.querySelector("span") ||
    event.target.parentNode.parentNode.querySelector("span");
  // descriptionHeading.textContent = hoveredTopic.textContent;
  hoveredTopic.setAttribute("style", "transform: scale(1)");
};

const moveDataPositionScroll = (event) => {
  // event.stopPropagation();
  event.preventDefault();
  // shortDescription.focus();
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
let shortDescData = null;
let layoutKeyData = null;

let mediaMaxHeight900 = window.matchMedia("(max-height: 900px)");

window.addEventListener("load", async () => {
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

  if (mediaMaxHeight900.matches) {
    shortDescNavWrapper.setAttribute("data-is-expanded", "false");
  }

  manipulateCustomProperties();

  // const response = await fetch("../data.json");
  // const data = await response.json();
  // shortDescData = data.englishVersion.shortDescription;
  // layoutKeyData = data.layoutKeys;
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

  if (mediaMaxHeight900.matches) {
    shortDescNavWrapper.setAttribute("data-is-expanded", "false");
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
    showTabpanel(shortContent, shortDescNav, '[data-position="4"]');
    // hideTopicsItems();
  })
);

shortDescNav.addEventListener("wheel", moveDataPositionScroll, {
  passive: false,
});
shortDescNav.addEventListener("keydown", moveDataPositionArrow);

shortNavArrows.forEach((item) =>
  item.addEventListener("click", (event) => {
    if (item.classList.contains("arrow-left")) {
      assignNewDataPosition(-1);
    } else if (item.classList.contains("arrow-right")) {
      assignNewDataPosition(1);
    } else {
      console.log("Arrow clicked. Something went wrong");
    }
  })
);

shortDescNavItems.forEach((item) => {
  item.addEventListener("click", (event) =>
    focusOnTarget(event, shortDescNavItems)
  );
  item.addEventListener("mouseover", (event) => {
    showHeading(event);
  });
  item.addEventListener("mouseleave", () => {
    showHeadingOfFocused();
  });
});

const toggleFunc = (event, controledElement) => {
  event.preventDefault();
  const target = event.target;
  let isNavExpanded = controledElement.getAttribute("data-is-expanded");
  if (isNavExpanded === "true") {
    target.setAttribute("aria-expanded", "false");
    controledElement.setAttribute("data-is-expanded", "false");
  } else if (isNavExpanded === "false") {
    target.setAttribute("aria-expanded", "true");
    controledElement.setAttribute("data-is-expanded", "true");
  }
  // mobileNavToggle.setAttribute("data-close-icon", `${!isToggleExpanded}`);
};

shortDescToggle.addEventListener("click", (event) =>
  toggleFunc(event, shortDescNavWrapper)
);

mobileNavToggle.addEventListener("click", (event) => {
  toggleFunc(event, primaryNav);
});

primaryNavChildren.forEach((item) =>
  item.addEventListener("click", (event) => {
    event.target.firstElementChild.click();
  })
);

// console.log('primaryNavs children: ' + primaryNav.children );
