var eNavigationItems = document.querySelectorAll(".navigation__item");
var eSocialList = document.querySelector(".header__social");
var eIntro = document.querySelector("#header p");
var eHeader = document.querySelector("#header");
var eSections = document.querySelectorAll("section");

function setSelectedNavigationItem(item) {
    eNavigationItems.forEach((resetItem) => {
        resetItem.classList.remove("navigation__item--active");
    });

    item.classList.add("navigation__item--active");

    if (item.textContent.toLocaleLowerCase() !== "home") {
        eHeader.classList.add("active");
    } else {
        eHeader.classList.remove("active");
    }
}

function setSelectedSection(item) {
    eSections.forEach((item) => {
        item.classList.add("hide");
    })

    var selectedSection = document.querySelector(`#${item.textContent.toLocaleLowerCase()}`);
    selectedSection.classList.remove("hide");
}

eNavigationItems.forEach((item) => {
    item.addEventListener("click", () => {
        setSelectedNavigationItem(item);
        setSelectedSection(item);
    })
})
