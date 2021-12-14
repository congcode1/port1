
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

var eHeaderNavigationList = document.querySelector(".header__list.header__navigation");

function setSelectedNavigationItem(item) {
    eNavigationItems.forEach((resetItem) => {
        resetItem.classList.remove("navigation__item--active");
        eHeaderNavigationList.classList.remove("header__navigation--mobile");
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
var eMenuToggle = document.querySelector(".menu-toggle");

eMenuToggle.addEventListener("click", () => {
    eMenuToggle.classList.toggle("active");
    eHeaderNavigationList.classList.toggle("header__navigation--mobile");
})