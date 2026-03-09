const boxes = document.querySelectorAll('.floor-svg-box');
const infoBox = document.getElementById('info-box');
const floorCount = infoBox.querySelector('.floor-count');
const numberRooms = infoBox.querySelector('.number-rooms');
const numberPremises = infoBox.querySelector('.number-premises');
const costPremises = infoBox.querySelector('.cost-premises');
const floorButtons = document.querySelectorAll('.floor-selection-count li');

let isOverSvg = false;

// Показать инфо-блок
function showInfoBox(box) {
    const floor = box.getAttribute('data-count'); // этаж
    const rooms = box.getAttribute('data-number'); // помещений
    const premises = box.getAttribute('data-premises');
    const cost = box.getAttribute('data-cost');

    floorCount.textContent = floor;
    numberRooms.textContent = rooms;
    numberPremises.textContent = premises;
    costPremises.textContent = cost;
}

// Очистить активные состояния
function clearActive() {
    boxes.forEach(f => f.classList.remove('active-floor'));
    floorButtons.forEach(b => b.classList.remove('active-btn'));
}

// Наведение на SVG этаж
boxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        isOverSvg = true;
        showInfoBox(box);
    });
    box.addEventListener('mouseleave', () => {
        isOverSvg = false;
        setTimeout(() => {
            if (!isOverSvg) return;
        }, 100);
    });
});

// Клик по цифрам этажей
floorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const floorNum = btn.textContent.trim();
        const box = document.querySelector(`.floor-svg-box[data-count="${floorNum}"]`);
        if (!box) return;
        clearActive();
        btn.classList.add('active-btn');
        box.classList.add('active-floor');
        showInfoBox(box);
    });
});






