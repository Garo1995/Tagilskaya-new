/* ================= SETTINGS ================= */
const start = 2026;
const end = 2044;

const states = [
    { year: 2026, label: "1 год",  sale:"0 ₽", rent:"0 ₽", total:"0 ₽", percent:"0%" },
    { year: 2029, label: "3 года", sale:"1 200 000 ₽", rent:"0 ₽", total:"1 200 000 ₽", percent:"12%" },
    { year: 2031, label: "5 лет",  sale:"3 456 567 ₽", rent:"300 000 ₽", total:"3 756 567 ₽", percent:"20%" },
    { year: 2033, label: "7 лет",  sale:"5 200 000 ₽", rent:"900 000 ₽", total:"6 100 000 ₽", percent:"28%" },
    { year: 2037, label: "11 лет", sale:"8 900 000 ₽", rent:"2 200 000 ₽", total:"11 100 000 ₽", percent:"41%" },
    { year: 2044, label: "18 лет", sale:"14 262 086 ₽", rent:"3 546 605 ₽", total:"17 808 691 ₽", percent:"109%" }
];

/* ================= ELEMENTS ================= */
const track = document.getElementById("track");
const thumb = document.getElementById("thumb");
const progress = document.getElementById("progress");
const ticks = document.getElementById("ticks");
const labels = document.getElementById("labels");
const tooltip = document.getElementById("tooltip");

const topItems = document.querySelectorAll(".js-top-item");
const mobileItems = document.querySelectorAll(".timeline-track-mobile li");

const totalYears = end - start;

/* ================= LABEL DATA ================= */
const labelsData = {
    2026:"",
    2029:"3 года",
    2031:"5 лет",
    2033:"7 лет",
    2037:"11 лет",
    2039:"",
    2044:""
};

/* ================= CREATE TICKS ================= */
for(let year=start; year<=end; year++){
    const percent = (year - start)/totalYears*100;

    const tick = document.createElement("div");
    tick.className = "tick";
    tick.dataset.year = year;
    if(labelsData[year] !== undefined) tick.classList.add("big");
    tick.style.left = percent + "%";
    ticks.appendChild(tick);

    if(labelsData[year] !== undefined){
        const label = document.createElement("div");
        label.className = "label";
        label.style.left = percent + "%";
        label.innerHTML = year + (labelsData[year] ? `<small>${labelsData[year]}</small>` : "");
        labels.appendChild(label);
    }
}

/* ================= HELPERS ================= */
function getNearestYear(percent){
    const year = Math.round(start + percent * totalYears);
    return Math.min(Math.max(year, start), end);
}

// Интерполяция прибыли и процентов для любого года
function getInterpolatedState(year){

    // если раньше первой точки
    if(year <= states[0].year) return states[0];

    // если позже последней точки (ВОТ ЧТО ЛОМАЛО ТЕБЕ КАЛЬКУЛЯТОР)
    if(year >= states[states.length-1].year){
        const last = states[states.length-1];
        return {
            year,
            label: (year-start+1) + " лет",
            sale: last.sale,
            rent: last.rent,
            total: last.total,
            percent: last.percent
        };
    }

    let prev, next;

    for(let i=0;i<states.length-1;i++){
        if(year >= states[i].year && year <= states[i+1].year){
            prev = states[i];
            next = states[i+1];
            break;
        }
    }

    const t = (year - prev.year)/(next.year - prev.year);

    const salePrev = Number(prev.sale.replace(/\D/g,''));
    const saleNext = Number(next.sale.replace(/\D/g,''));

    const rentPrev = Number(prev.rent.replace(/\D/g,''));
    const rentNext = Number(next.rent.replace(/\D/g,''));

    const totalPrev = Number(prev.total.replace(/\D/g,''));
    const totalNext = Number(next.total.replace(/\D/g,''));

    const percentPrev = Number(prev.percent.replace(/\D/g,''));
    const percentNext = Number(next.percent.replace(/\D/g,''));

    const sale = Math.round(salePrev + (saleNext - salePrev)*t);
    const rent = Math.round(rentPrev + (rentNext - rentPrev)*t);
    const totalVal = Math.round(totalPrev + (totalNext - totalPrev)*t);
    const percentVal = Math.round(percentPrev + (percentNext - percentPrev)*t);

    return {
        year,
        label: (year-start+1) + " лет",
        sale: sale.toLocaleString('ru-RU') + " ₽",
        rent: rent.toLocaleString('ru-RU') + " ₽",
        total: totalVal.toLocaleString('ru-RU') + " ₽",
        percent: percentVal + "%"
    };
}

/* ================= TOP BLOCKS ================= */
function updateTopBlocks(year){

    let activeIndex = -1; // ничего активно

    // 2031–2032 → 50%
    if(year >= 2029 && year < 2031){
        activeIndex = 0;
    }

    // 2033–2036 → 13%
    else if(year >= 2031 && year < 2033){
        activeIndex = 1;
    }

    // 2037–2044 → 12%
    else if(year >= 2033 && year <= 2044){
        activeIndex = 2;
    }

    topItems.forEach((el,i)=>{
        el.classList.toggle("active", i === activeIndex);
    });
}

/* ================= UPDATE UI ================= */
let current = 2026;

function update(){
    const state = getInterpolatedState(current);
    const percent = (current - start)/totalYears*100;

    thumb.style.left = percent + "%";
    progress.style.width = percent + "%";
    tooltip.innerHTML = state.label;

    document.querySelectorAll(".tick").forEach(tick=>{
        const year = Number(tick.dataset.year);
        tick.classList.toggle("active", year <= current);
    });

    const blocks = document.querySelectorAll(".profit-sale-price");
    blocks[0].children[0].innerText = state.sale;
    blocks[0].children[1].innerText = state.percent;
    blocks[1].children[0].innerText = state.rent;
    blocks[1].children[1].innerText = state.percent;
    blocks[2].children[0].innerText = state.total;
    blocks[2].children[1].innerText = state.percent;

    updateTopBlocks(current);
    updateMobileTimeline(current);
}

update();

/* ================= CLICK ================= */
track.addEventListener("click",(e)=>{
    const rect = track.getBoundingClientRect();
    const percent = (e.clientX - rect.left)/rect.width;
    current = getNearestYear(percent);
    update();
});

/* ================= DRAG ================= */
let isDragging = false;

function startDrag(e){
    isDragging = true;
    document.body.style.userSelect = "none";
    moveAt(e);
}

function stopDrag(){
    isDragging = false;
    document.body.style.userSelect = "";
}

function moveAt(e){
    if(!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const rect = track.getBoundingClientRect();
    let x = clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width));

    const percent = x / rect.width;
    current = getNearestYear(percent);
    update();
}

/* MOUSE */
thumb.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", moveAt);
document.addEventListener("mouseup", stopDrag);

/* TOUCH */
thumb.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", moveAt);
document.addEventListener("touchend", stopDrag);







function updateMobileTimeline(year){

    mobileItems.forEach(item => {
        const itemYear = Number(item.dataset.year);
        item.classList.toggle("active", year === itemYear);
    });

}
mobileItems.forEach(item => {

    item.addEventListener("click", () => {

        // берём год из кнопки
        current = Number(item.dataset.year);

        // обновляем UI (двигает слайдер)
        update();

    });

});