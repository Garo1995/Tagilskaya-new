document.querySelectorAll(".filter-box").forEach(box => {

    const minInput = box.querySelector(".min-input");
    const maxInput = box.querySelector(".max-input");
    const minRange = box.querySelector(".range-min");
    const maxRange = box.querySelector(".range-max");
    const fill      = box.querySelector(".range-fill");

    const min = parseFloat(box.dataset.min);
    const max = parseFloat(box.dataset.max);

    function updateFill() {
        const v1 = parseFloat(minRange.value);
        const v2 = parseFloat(maxRange.value);

        const p1 = ((v1 - min) / (max - min)) * 100;
        const p2 = ((v2 - min) / (max - min)) * 100;

        fill.style.left  = p1 + "%";
        fill.style.width = (p2 - p1) + "%";
    }

    // RANGE → INPUT
    minRange.addEventListener("input", () => {
        let v1 = parseFloat(minRange.value);
        let v2 = parseFloat(maxRange.value);

        if (v1 > v2) v1 = v2;

        minRange.value = v1;
        minInput.value = v1;

        updateFill();
    });

    maxRange.addEventListener("input", () => {
        let v1 = parseFloat(minRange.value);
        let v2 = parseFloat(maxRange.value);

        if (v2 < v1) v2 = v1;

        maxRange.value = v2;
        maxInput.value = v2;

        updateFill();
    });

    // INPUT → RANGE
    minInput.addEventListener("input", () => {
        let v = parseFloat(minInput.value || min);

        if (v < min) v = min;
        if (v > parseFloat(maxRange.value)) v = parseFloat(maxRange.value);

        minInput.value  = v;
        minRange.value  = v;

        updateFill();
    });

    maxInput.addEventListener("input", () => {
        let v = parseFloat(maxInput.value || max);

        if (v > max) v = max;
        if (v < parseFloat(minRange.value)) v = parseFloat(minRange.value);

        maxInput.value  = v;
        maxRange.value  = v;

        updateFill();
    });

    // стартовое состояние
    minRange.value = minInput.value;
    maxRange.value = maxInput.value;
    updateFill();
});








$('.sort-floor').on('click', function (e) {
    e.stopPropagation();
    $('.sort-floor-abs').toggleClass('sort-floor-abs-act');
})



$('.sort-floor-abs').on('touchstart', function (e) {
    startY = e.originalEvent.touches[0].clientY;
});

$('.sort-floor-abs').on('touchmove', function (e) {
    endY = e.originalEvent.touches[0].clientY;
});

$('.sort-floor-abs').on('touchend', function () {
    if (endY - startY > threshold) {
        $(this).removeClass('sort-floor-abs-act');
        console.log('Свайп вниз — окно закрыто');
    }
});

