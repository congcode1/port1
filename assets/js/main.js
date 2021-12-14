
/**
   * Scrolls to an element with header offset
   */
const customScrollto = (el) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

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
    if (selectedSection)
        selectedSection.classList.remove("hide");
}

eNavigationItems.forEach((item) => {
    item.addEventListener("click", function (e) {
        setSelectedNavigationItem(item);
        setSelectedSection(item);

        e.preventDefault();
        customScrollto();
    })
})


// swipper

new Swiper('.testimonial-slider', {
    speed: 600,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },

        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
});

