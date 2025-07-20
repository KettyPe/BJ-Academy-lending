(() => {
    "use strict";
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;
    const menuLinks = document.querySelectorAll(".menu__link");
    const scrollToAnchor = anchor => {
        const targetElement = document.querySelector(anchor);
        if (targetElement) window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: "smooth"
        }); else console.error(`Anchor "${anchor}" not found`);
    };
    menuLinks.forEach((link => {
        link.addEventListener("click", (event => {
            event.preventDefault();
            scrollToAnchor(link.getAttribute("href"));
        }));
    }));
    function animateHeader() {
        setTimeout((() => {
            header.classList.add("is-animated");
        }), 200);
    }
    function handleScrollHeader() {
        const scrollTOp = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTOp > 0) header.classList.add("active-scroll"); else header.classList.remove("active-scroll");
    }
    window.addEventListener("load", animateHeader);
    window.addEventListener("scroll", handleScrollHeader);
    const animItems = document.querySelectorAll("._anim-items");
    if (animItems.length > 0) {
        window.addEventListener("scroll", animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;
                const animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("anim-active"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("anim-active");
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout((() => {
            animOnScroll();
        }), 150);
    }

    const thumbsSwiper = new Swiper(".quotes__slider-tumbs", {
        freeMode: true,
        watchSlidesProgress: true,
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        breakpoints: {
            320: {
                spaceBetween: 10
            },
            580: {
                spaceBetween: 20
            }
        }
    });

    const quotesSlider = new Swiper(".quotes__slider", {
        speed: 800,
        effect: "fade",
        navigation: {
            prevEl: ".quotes-arrow-prev",
            nextEl: ".quotes-arrow-next"
        },
        thumbs: {
            swiper: thumbsSwiper
        },
        pagination: {
            el: ".controlls-slider-quotes__fraction",
            clickable: true,
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
                return " Цитата " + '<span class="' + currentClass + '"></span>' + " из " + '<span class="' + totalClass + '"></span>';
            }
        },
    });

    const quotesQuotesSlider = new Swiper(".quotes-quotes__slider", {
        slidesPerView: 1,
        speed: 800,
        effect: "fade",
        thumbs: {
            swiper: thumbsSwiper
        },
    });

    function syncSliders(activeIndex) {
        thumbsSwiper.slideTo(activeIndex)
        quotesSlider.slideTo(activeIndex)
        quotesQuotesSlider.slideTo(activeIndex)
    }

    quotesSlider.on('slideChange', function() {
        const activeIndex = this.activeIndex
        if (quotesQuotesSlider.activeIndex !== activeIndex) {
            quotesQuotesSlider.slideTo(activeIndex)
        }
    })

    quotesQuotesSlider.on('slideChange', function() {
        const activeIndex = this.activeIndex
        if (quotesSlider.activeIndex !== activeIndex) {
            quotesSlider.slideTo(activeIndex)
        }
    })

    thumbsSwiper.on('click', function() {
        const clickedIndex = this.clickedIndex
        if (clickedIndex !== undefined) {
            syncSliders(clickedIndex)
        }
    })
})();