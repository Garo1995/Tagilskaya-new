

let businessSwiper = new Swiper(".business-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 600,

    pagination: {
        el: ".business-pagination",
        clickable: true,
    }
});



let technoSwiper = new Swiper(".techno-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: ".techno-button-next",
        prevEl: ".techno-button-prev",
    },

});




let timerSwiper = new Swiper(".timer-wrapper-slider", {
    slidesPerView: 3,
    spaceBetween: 16,
    slidesPerGroup: 1,

    pagination: {
        el: ".timer-pagination",
        clickable: true,
    },
    breakpoints: {

        1020: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            allowTouchMove: false,
        },

        767: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
    },
});




let advantagesSwiper = new Swiper(".advantages-slider", {
    slidesPerView: 4,
    spaceBetween: 16,
    slidesPerGroup: 1,
    speed: 600,

    navigation: {
        nextEl: ".advantages-next",
        prevEl: ".advantages-prev",
    },

    breakpoints: {

        '1199': {
            slidesPerView: 4,
            slidesPerGroup: 1,
        },
        '1020': {
            slidesPerView: 3,
            slidesPerGroup: 1,
            loop: true,
        },
        '640': {
            slidesPerView: 2.2,
            slidesPerGroup: 1,
            loop: true,
        },
        '320': {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            loop: true,
        },
    },
});









let constructDescSwiper = new Swiper(".construct-desc-slider", {
    slidesPerView: 4,
    spaceBetween: 16,
    slidesPerGroup: 1,
    speed: 600,

    navigation: {
        nextEl: ".construct-next",
        prevEl: ".construct-prev",
    },

    breakpoints: {

        '1199': {
            slidesPerView: 4,
            slidesPerGroup: 1,
        },
        '767': {
            slidesPerView: 3,
            slidesPerGroup: 1,
            loop: true,
        },
        '640': {
            slidesPerView: 3,
            slidesPerGroup: 1,
            loop: true,
        },
        '320': {
            slidesPerView: 2,
            slidesPerGroup: 1,
            loop: true,
        },
    },
});


















let projectssSwiper = new Swiper(".projects-complete-slider", {
    slidesPerView: 3,
    spaceBetween: 16,
    slidesPerGroup: 1,

    navigation: {
        nextEl: ".complete-button-next",
        prevEl: ".complete-button-prev",
    },
    breakpoints: {
        1109: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        1020: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        660: {
            slidesPerView: 2.1,
            slidesPerGroup: 1,
        },
        480: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
        },
        320: {
            slidesPerView: 1.12,
            slidesPerGroup: 1,
        },
    },
});






let newsSwiper = new Swiper(".news-slider", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 16,
    speed: 600,

    grid: {
        rows: 2,
        fill: "row",
    },
    navigation: {
        nextEl: ".news-button-next",
        prevEl: ".news-button-prev",
    },
});















let countSwiper = new Swiper(".floor-count-slider", {
    slidesPerView: 1,
    spaceBetween: 1,
    slidesPerGroup: 1,

    navigation: {
        nextEl: ".floor-count-next",
        prevEl: ".floor-count-prev",
    },

});












document.querySelectorAll(".gallery-slider").forEach((slider) => {
    const parent = slider.closest(".modal-gallery");

    const nextBtn = parent.querySelector(".gallery-button-next");
    const prevBtn = parent.querySelector(".gallery-button-prev");
    const pagination = parent.querySelector(".gallery-pagination");

    const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        pagination: {
            el: pagination,
            type: "fraction",
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });

    document.addEventListener("keydown", (e) => {
        if (!parent.classList.contains("active")) return;
        // если у тебя класс открытия другой, замени active на свой

        if (e.key === "ArrowRight") {
            swiper.slideNext();
        }

        if (e.key === "ArrowLeft") {
            swiper.slidePrev();
        }
    });
});










const layoutImages = document.querySelectorAll(".select-layout-svg");

function setActiveFloor(floor) {
    layoutImages.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.floor === String(floor));
    });
}

const layoutSwiper = new Swiper(".layout-number-slider", {
    spaceBetween: 10,
    slidesPerView: 5,
    direction: "vertical",
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    speed: 300,
    navigation: {
        nextEl: ".layout-button-next",
        prevEl: ".layout-button-prev",
    },
    breakpoints: {
        320: {
            direction: "horizontal",
            slidesPerView: 5,
            slidesPerGroup: 1,
        },
        1020: {
            direction: "horizontal",
            slidesPerView: 5,
            slidesPerGroup: 1,
        },
        1199: {
            direction: "vertical",
            slidesPerView: 5,
            slidesPerGroup: 1,
        },
    },
    on: {
        init: function () {
            const floor = this.slides[this.activeIndex]?.dataset.floor;
            if (floor) setActiveFloor(floor);
        },
        slideChangeTransitionEnd: function () {
            const floor = this.slides[this.activeIndex]?.dataset.floor;
            if (floor) setActiveFloor(floor);
        }
    }
});








const thumbsGallery = new Swiper(".thumbs-slider", {
    direction: "vertical",
    spaceBetween: 16,
    slidesPerView: 3,
    loop: true,
    watchSlidesProgress: true,
    navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
    },
    pagination: {
        el: ".gallery-pagination",
        clickable: true,
    },
});

const mainSlider = new Swiper(".new-gallery-slider", {
    spaceBetween: 10,
    speed: 600,
    loop: true,
    thumbs: {
        swiper: thumbsGallery,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
    },
});






let officesSwiper = new Swiper(".offices-benefits-slider", {
    slidesPerView: 4,
    spaceBetween: 16,
    slidesPerGroup: 1,

    navigation: {
        nextEl: ".offices-button-next",
        prevEl: ".offices-button-prev",
    },
    breakpoints: {
        1399: {
            slidesPerView: 4,
            slidesPerGroup: 1,
        },
        1020: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        660: {
            slidesPerView: 2.1,
            slidesPerGroup: 1,
        },
        480: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
        },
        320: {
            slidesPerView: 1.12,
            slidesPerGroup: 1,
        },
    },
});











