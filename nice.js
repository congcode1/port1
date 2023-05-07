import AiMusicPlayer from "./ai_music_player.js";
import { GalleryPortfolio } from "./gallery_portfolio.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const CV = (() => {
    const states = {
        eOpenCv: $('.cv-fixed-btn'),
        eCv: $('.cv-content'),
        eCloseCv: $('.cv-close'),
    };
    const controller = {
        detectIsDesktop() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return false;
            } else {
                return true;
            }
        },
        detect() {
            // hide objects on mobile
            let isDesktop = controller.detectIsDesktop();
            if (isDesktop) {
                states.eOpenCv.classList.remove("hide");
                states.eOpenCv.addEventListener("click", function () {
                    states.eCv.classList.remove("hide");
                })
                states.eCloseCv.addEventListener("click", function () {
                    states.eCv.classList.add("hide");
                })
            }
        },
    };
    return {
        init() {
            controller.detect();
        },
    }
})();

const Navigation = (() => {
    const states = {
        eNavigationItems: $$(".navigation__item a"),
        eHeaderNavigationList: $(".header__list.header__navigation"),
        eMenuToggle: $(".menu-toggle"),
        eBody: $("#body"),
        eHeader:
    };
    const ui = {
        setSelectedNavigationItem: function (item) {
            states.eNavigationItems.forEach((resetItem) => {
                resetItem.classList.remove("animated-button");
                states.eHeaderNavigationList.classList.remove("header__navigation--mobile");
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
                if (this.detectIsChrome === 1) {
                    eMP.classList.remove("hide");
                }
            }

            eMP.classList.add("hide");

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
    };
    const events = {
        initHandleeNavigationItemsClick() {
            states.eNavigationItems.forEach((item) => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    _this.setSelectedNavigationItem(item);
                    _this.setSelectedSection(item);
                    _this.helperFuncs.scroll();
                })
            })
        },
        initial() {

        }
    };
})();

const app = (() => {
    const states = {

    };
})();

window.onload = (e) => {
    CV.init();
}