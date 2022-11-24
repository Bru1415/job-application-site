const primaryNav = document.querySelector(".primary-navigation");
const primaryNavChildren = primaryNav.querySelectorAll("li");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const mediaQueryColRowSm = window.matchMedia("(min-width: 65em)");
const headerPhoto = document.querySelector(".header_photo img");

primaryNavChildren.forEach((item) =>
  item.addEventListener("click", (event) => {
    event.target.firstElementChild.click();
  })
);

window.addEventListener("load", () => {
  headerPhoto.classList.add("rotate360--vertical");
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

// technical ------------------------------------------------

const portfolioTabs = document.querySelectorAll(
  '.portfolio-nav > div[role="tab"]'
);
const portfolioTabPanels = document.querySelectorAll(
  '.portfolio__categories > div[role="tabpanel"]'
);

const orderTabs = (selectedTab) => {
  const currentPosition = selectedTab.getAttribute("data-position");
  const positionDifference = Math.abs(0 - +currentPosition);
  if (positionDifference === 0) {
    return;
  }

  portfolioTabs.forEach((tab) => {
    const currentPos = tab.getAttribute("data-position");
    let newPosition = null;

    if (currentPos - positionDifference < 0) {
      newPosition = 3 - (positionDifference - (+currentPos + 1));
    } else if (currentPos - positionDifference >= 0) {
      newPosition = currentPos - positionDifference;
    } else {
      console.log("unexpected behaviour");
      return;
    }
    tab.setAttribute("data-position", newPosition);
  });
};

portfolioTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    let targetTab = null;
    if (event.target.getAttribute("role") === "tab") {
      targetTab = event.target;
    } else if (event.target.parentNode.getAttribute("role") === "tab") {
      targetTab = event.target.parentNode;
    } else {
      return;
    }

    const targetPanelName = targetTab.getAttribute("aria-controls");
    const targetPanel = document.querySelector(`#${targetPanelName}`);
    portfolioTabs.forEach((item) =>
      item.setAttribute("aria-selected", "false")
    );

    portfolioTabPanels.forEach((item) => item.setAttribute("hidden", "true"));
    targetPanel.removeAttribute("hidden");
    if (!mediaQueryColRowSm.matches) {
      orderTabs(targetTab);
    }
    targetTab.setAttribute("aria-selected", "true");
  });
});
