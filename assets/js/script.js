
$(document).ready(function () {
    setTimeout(function () {
        $(".tagilskaya-sec").addClass("tagilskaya-act");
    }, 900);
    setTimeout(function () {
        $('body').addClass("home-main-active");
        // Через 600 мс после появления контента — плавное появление хедера
    }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    let lastScroll = 0;

    window.addEventListener("scroll", function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // скроллим ВНИЗ — прячем
            header.classList.add("hide");
        } else {
            // скроллим ВВЕРХ — показываем
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
});

$(document).ready(function () {

    $('select').styler();


    $('.open-menu').on('click', function () {
        $(this).toggleClass('close-menu');
        if ($(this).hasClass('close-menu')) {
            $('.header-menu').addClass('transition-menu');
            // $('body').addClass('body_fix');
        } else {
            $('.header-menu').addClass('menu-width');
            // $('body').removeClass('body_fix');
            $('.header-menu').removeClass('transition-menu');
        }
    });
    $('.header-menu a').on('click', function () {
        $('.header-menu').addClass('menu-width');
        // $('body').removeClass('body_fix');
        $('.header-menu').removeClass('transition-menu');
        $('.open-menu').removeClass('close-menu');
    })
});


$('.head-menu ul li a').on('click', function () {
    $('.head-menu').removeClass('menu-opened');
})

$('.open-menu').on('click', function (e) {
    e.stopPropagation();
    $('.head-menu').toggleClass('menu-opened');

})
$(window).on('click', function (e) {
    let menuSort = $('.head-menu');
    if (e.target !== menuSort) {
        menuSort.removeClass('menu-opened');
    }
    let menuCLose = $('.open-menu');
    if (e.target !== menuCLose) {
        menuCLose.removeClass('close-menu');
    }

});




$('.see-more-news').on('click', function () {
    $('.news-block-mobile').toggleClass('news-block-opened');
})









$('.open_modal').on('click', function () {
    let attr = $(this).attr('data-val');
    let modal = $('#' + attr);
    modal.removeClass('out');
    modal.fadeIn();
    $('body').addClass('body_fix');
});

$('.close').on('click', function () {

    $('body').removeClass('body_fix');
    let prt = $(this).parents('.modal');

    prt.addClass('out')
    setTimeout(function () {
        prt.fadeOut();
    }, 100);
});

$(window).on('click', function (event) {


    $('.modal').each(function () {
        let gtattr = $(this).attr('id');
        let new_mod = $('#' + gtattr);
        let md_cnt = $(new_mod).find('.modal-content');
        if (event.target === $(md_cnt)[0]) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)
            $('body').removeClass('body_fix');
        }
        if (event.target === this) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)
        }
    })
});







$('.menu-scroll a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
        let $target = $(this.hash);
        $target = $target.length && $target
            || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
            let targetOffset = $target.offset().top-130;
            $('html,body')
                .animate({scrollTop: targetOffset}, 1000);
            return false;
        }
    }
});















$('.select-param').on('click', function () {
    $('body').addClass('body-fixed');
    $('.floor-plan').addClass('floor-plan-opened');
    if (window.fullpage_api) {
        fullpage_api.setAllowScrolling(false);
        fullpage_api.setKeyboardScrolling(false);
    }
})







document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {

        const modalSelector = this.dataset.modalTarget;
        const modal = document.querySelector(modalSelector);
        if (!modal) return;
        document.body.classList.add('modal-open');
        modal.classList.add('active');
    });
});


document.querySelectorAll('.modal-overlay').forEach(modal => {

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }

    modal.addEventListener('click', (e) => {
        const modalWindow = modal.querySelector('.modal-window');
        if (e.target === modal) {
            closeModal(modal);
            return;
        }

        if (e.target === modalWindow) {
            closeModal(modal);
        }
    });

});


function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

$('.open-floor-boxis').on('click', function () {
    $('.floor-plan').addClass('floor-plan-none');
    $('.floor-room-boxis').addClass('floor-room-opened');
})
$('.floor-svg-box').on('click', function () {

    $('.floor-plan').addClass('floor-plan-none');
    $('.floor-room-boxis').addClass('floor-room-opened');

})
$('.found-cnt-box').on('click', function () {

    $('.floor-plan').addClass('floor-plan-none');
    $('.floor-room-boxis').addClass('floor-room-opened');

})


$('.back-floor-sel').on('click', function () {
    $('body').removeClass('body-fixed');
    $('.floor-plan').removeClass('floor-plan-opened');
    $('.floor-room-boxis').removeClass('floor-room-opened');
    // Проверяем: остались ли открытые модалки?
    const anyOpen = $('.floor-plan.floor-plan-opened').length > 0;

    if (!anyOpen && window.fullpage_api) {
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
    }
})

$('.back-select-layout').on('click', function() {
    $('body').removeClass('body-fixed');
    $('.floor-plan').removeClass('floor-plan-opened');
    $('.floor-room-boxis').removeClass('floor-room-opened');
    // Проверяем: остались ли открытые модалки?
    const anyOpen = $('.floor-plan.floor-plan-opened').length > 0;

    if (!anyOpen && window.fullpage_api) {
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
    }
})


$('.head-menu a').on('click', function() {
    $('body').removeClass('body-fixed');
    $('.floor-plan').removeClass('floor-plan-opened');
    $('.floor-room-boxis').removeClass('floor-room-opened');
})


document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".select-params");
    const views = document.querySelectorAll(".estate-view");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.dataset.type;

            // активная кнопка
            buttons.forEach(b => b.classList.remove("params-active"));
            btn.classList.add("params-active");

            // показ нужного контента
            views.forEach(view => {
                view.classList.remove("active-view");
                if (view.dataset.view === type) {
                    view.classList.add("active-view");
                }
            });
        });
    });
});



$('.map-all-object').on('click', function () {
    $('.infrast-map-cnt').addClass('touchstart-open');
    $('body').addClass('body-fon');
})



let startY = 0;
let endY = 0;
let threshold = 50;
let canClose = false;

$('.touchstart').on('touchstart', function (e) {
    const isDragZone = $(e.target).closest('.modal-drag-zone').length > 0;

    canClose = isDragZone;
    startY = e.originalEvent.touches[0].clientY;
});

$('.touchstart').on('touchmove', function (e) {
    endY = e.originalEvent.touches[0].clientY;
});

$('.touchstart').on('touchend', function () {

    if (!canClose) return;

    if (endY - startY > threshold) {
        $(this).removeClass('touchstart-open');
        $('body').removeClass('body-fon modal-open');
        $('.modal-overlay').removeClass('active');
        $('.select-property').removeClass('select-property-open');
    }
});









$(document).ready(function () {
    $('.news-box').on('click', function () {
        // Получаем данные из нажатого блока
        const imgSrc = $(this).find('.get-news-photo').attr('src');
        const title = $(this).find('.get-news-title').text();
        const text = $(this).find('.get-news-text').text();

        // Вставляем данные в окно
        $('.add-news-photo').attr('src', imgSrc);
        $('.add-news-title').text(title);
        $('.add-news-text').text(text);

        // Открытие окна (если оно скрыто, добавь свою логику)

        $('.all-news-col').fadeIn(); // или .addClass('active'), если ты используешь CSS-модалки
    });
});









$('.open-filter-mobile').on('click', function (e) {
    e.stopPropagation();
    $('.floor-plan-fixed').addClass('plan-fixed-open');

});


$('.floor-plan-fixed').on('touchstart', function (e) {
    startY = e.originalEvent.touches[0].clientY;
});

$('.floor-plan-fixed').on('touchmove', function (e) {
    endY = e.originalEvent.touches[0].clientY;
});

$('.floor-plan-fixed').on('touchend', function () {
    if (endY - startY > threshold) {
        $(this).removeClass('plan-fixed-open');
        console.log('Свайп вниз — окно закрыто');
    }
});