export const GalleryPortfolio = (function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const states = {
        eWatchInGallery: $$(".fas.fa-plus"),
        eGallery: $(".portfolio__gallery"),
        eGalleryImg: $(".portfolio__gallery img"),
        eGalleryCloseBtn: $(".gallery-icon.icon-close"),
        eGalleryNextBtn: $(".gallery-icon.icon-next"),
        eGalleryPrevBtn: $(".gallery-icon.icon-prev"),
        eListImages: $$(".portfolio__item img"),
        currentIndex: 0,
    };
    const events = {
        showGalleryImage(index) {
            states.eGalleryImg.src = states.eListImages[index].src;
            states.eGallery.classList.remove("hide");
        },
        initHandleeWatchInGalleryClick() {
            states.eWatchInGallery.forEach((item, index) => {
                item.addEventListener("click", () => {
                    states.currentIndex = index;
                    events.showGalleryImage(states.currentIndex);
                })
            })
        },
        initHandleeGalleryNextBtnClick() {
            states.eGalleryNextBtn.addEventListener("click", () => {
                states.currentIndex++;
                if (states.currentIndex >= states.eListImages.length)
                    states.currentIndex = 0;
                events.showGalleryImage(states.currentIndex);
            });
        },
        initHandleeGalleryPrevBtnClick() {
            states.eGalleryPrevBtn.addEventListener("click", function () {
                states.currentIndex--;
                if (states.currentIndex <= 0)
                    states.currentIndex = states.eListImages.length - 1;
                events.showGalleryImage(states.currentIndex);
            });
        },
        initHandleeGalleryCloseBtnClick() {
            eGalleryCloseBtn.addEventListener("click", function () {
                eGallery.classList.add("hide");
            })
        },
        initial() {
            events.initHandleeWatchInGalleryClick();
            events.initHandleeGalleryNextBtnClick();
            events.initHandleeGalleryPrevBtnClick();
            events.initHandleeGalleryCloseBtnClick();
        },
    };
    return {
        init() {
            events.initial();
        }
    }
}());

export const PortfolioDetail = (() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const states = {
        eWatchPortfolioDetail: $$(".fas.fa-link"),
        ePortfolioDetail: $(".portfolio__detail"),
        ePortfolioDetailCloseBtn: $(".portfolio__detail-icon.icon-close"),
    };
    const events = {
        initHandleeWatchPortfolioDetailClick() {
            eWatchPortfolioDetail.forEach((item) => {
                item.addEventListener("click", function () {
                    ePortfolioDetail.classList.remove("hide");
                })
            })
        },
        initHandleePortfolioDetailCloseBtnClick() {
            ePortfolioDetailCloseBtn.addEventListener("click", function () {
                ePortfolioDetail.classList.add("hide");
            })
        },
        initial() {
            events.initHandleeWatchPortfolioDetailClick();
            events.initHandleePortfolioDetailCloseBtnClick();
        }
    };
    return {
        init() {
            events.initial();
        }
    }
})()