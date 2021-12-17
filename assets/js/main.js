
/**
   * Scrolls to an element with header offset
   */

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

const customScrollto = (el) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

var eOpenCv = document.querySelector('.cv-fixed-btn');
var eCv = document.querySelector('.cv-content');
var eCloseCv = document.querySelector('.cv-close');

if (typeof screen.orientation !== 'undefined') {
    eOpenCv.classList.remove("hide");
    eOpenCv.addEventListener("click", function () {
        eCv.classList.remove("hide");
    })
    eCloseCv.addEventListener("click", function () {
        eCv.classList.add("hide");
    })
}

let eSkilsContainer = document.querySelector('.skill-container');
var eNavigationItems = document.querySelectorAll(".navigation__item a");
var eSocialList = document.querySelector(".header__social");
var eIntro = document.querySelector("#header p");
var eHeader = document.querySelector("#header");
var eSections = document.querySelectorAll("section");
var eBody = document.querySelector("#body");

var eHeaderNavigationList = document.querySelector(".header__list.header__navigation");
var eMenuToggle = document.querySelector(".menu-toggle");
var eFooter = document.querySelector("#footer")


function setSelectedNavigationItem(item) {
    eNavigationItems.forEach((resetItem) => {
        resetItem.classList.remove("animated-button");
        eHeaderNavigationList.classList.remove("header__navigation--mobile");
        eMenuToggle.classList.remove("active");
    });

    item.classList.add("animated-button");

    if (item.textContent.toLocaleLowerCase().trim() !== "home") {
        eBody.classList.add("scrollAble")
        eHeader.classList.add("active");
        eFooter.classList.remove("hide");
    } else {
        eBody.classList.remove("scrollAble")
        eHeader.classList.remove("active");
        eFooter.classList.add("hide");
    }

    if (item.textContent.toLocaleLowerCase().trim() === "about") {
        new Waypoint({
            element: eSkilsContainer,
            offset: '-60%',
            handler: function (direction) {
                let progress = document.querySelectorAll('.skill-percent-wrap .skill-percent');
                progress.forEach((el) => {
                    el.style.width = el.parentElement.getAttribute('skill-value') + '%'
                });
            }

        })
    }
}

function setSelectedSection(item) {
    eSections.forEach((section) => {
        section.classList.add("hide");
    })

    var selectedSection = document.querySelector(`#${item.textContent.toLocaleLowerCase().trim()}`);
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

new Swiper('.portfolio__slider', {
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
            slidesPerView: 1,
            spaceBetween: 20
        }
    }
});

var eWatchInGallery = document.querySelectorAll(".fas.fa-plus");
var eGallery = document.querySelector(".portfolio__gallery");
var eGalleryImg = document.querySelector(".portfolio__gallery img");
var eGalleryCloseBtn = document.querySelector(".gallery-icon.icon-close");
var eGalleryNextBtn = document.querySelector(".gallery-icon.icon-next");
var eGalleryPrevBtn = document.querySelector(".gallery-icon.icon-prev");
var eListImages = document.querySelectorAll(".portfolio__item img");

var currentIndex = 0;

function showGalleryImage(index) {
    eGalleryImg.src = eListImages[index].src;
    eGallery.classList.remove("hide");
}

eWatchInGallery.forEach((item, index) => {
    item.addEventListener("click", function () {
        currentIndex = index;
        showGalleryImage(currentIndex);
    })
})

eGalleryNextBtn.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= eListImages.length)
        currentIndex = 0;
    showGalleryImage(currentIndex);
});

eGalleryPrevBtn.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex <= 0)
        currentIndex = eListImages.length - 1;
    showGalleryImage(currentIndex);
});

eGalleryCloseBtn.addEventListener("click", function () {
    eGallery.classList.add("hide");
})

var eWatchPortfolioDetail = document.querySelectorAll(".fas.fa-link");
var ePortfolioDetail = document.querySelector(".portfolio__detail");
var ePortfolioDetailCloseBtn = document.querySelector(".portfolio__detail-icon.icon-close");

//fas fa-link

eWatchPortfolioDetail.forEach((item) => {
    item.addEventListener("click", function () {
        ePortfolioDetail.classList.remove("hide");
    })
})

ePortfolioDetailCloseBtn.addEventListener("click", function () {
    ePortfolioDetail.classList.add("hide");
})

// menu-toggle

eMenuToggle.addEventListener("click", () => {
    eMenuToggle.classList.toggle("active");
    eHeaderNavigationList.classList.toggle("header__navigation--mobile");
})

// clock

const deg = 6;

const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
})

