/* ================== ОБЩИЕ НАСТРОЙКИ ================== */
const states = [
    { year: 2026, label: "1 год",  sale:"0 ₽", rent:"0 ₽", total:"0 ₽", percent:"0%" },
    { year: 2029, label: "3 года", sale:"1 200 000 ₽", rent:"0 ₽", total:"1 200 000 ₽", percent:"12%" },
    { year: 2031, label: "5 лет",  sale:"3 456 567 ₽", rent:"300 000 ₽", total:"3 756 567 ₽", percent:"20%" },
    { year: 2033, label: "7 лет",  sale:"5 200 000 ₽", rent:"900 000 ₽", total:"6 100 000 ₽", percent:"28%" },
    { year: 2036, label: "10 лет", sale:"8 900 000 ₽", rent:"2 200 000 ₽", total:"11 100 000 ₽", percent:"41%" },
];

const labelsData = {
    2026:"РВЭ",
    2029:"3 года",
    2031:"5 лет",
    2033:"7 лет",
    2036:""
};

/* ================== ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ТАЙМЛАЙНА ================== */
function initTimeline(container){

    const start = states[0].year;
    const end = states[states.length-1].year;
    const totalYears = end - start;

    const track = container.querySelector(".timeline-track");
    const thumb = container.querySelector(".timeline-thumb");
    const progress = container.querySelector(".timeline-progress");
    const ticks = container.querySelector(".timeline-ticks");
    const labels = container.querySelector(".timeline-labels");
    const tooltip = container.querySelector(".tooltip");

    const topItems = container.querySelectorAll(".js-top-item");
    const mobileItems = container.querySelectorAll(".timeline-track-mobile li");

    let current = start;

    /* ================== СОЗДАНИЕ ТИКОВ И ПОДПИСЕЙ ================== */
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

    /* ================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ================== */
    function getNearestYear(percent){
        const year = Math.floor(start + percent * totalYears);
        return Math.min(Math.max(year, start), end);
    }

    function getInterpolatedState(year){

        if(year <= states[0].year) return states[0];
        if(year >= states[states.length-1].year) return states[states.length-1];

        let prev, next;
        for(let i=0;i<states.length-1;i++){
            if(year >= states[i].year && year <= states[i+1].year){
                prev = states[i];
                next = states[i+1];
                break;
            }
        }

        const t = (year - prev.year)/(next.year - prev.year);

        function parseVal(val){ return Number(val.replace(/\D/g,'')) }

        const sale = Math.round(parseVal(prev.sale) + (parseVal(next.sale) - parseVal(prev.sale))*t);
        const rent = Math.round(parseVal(prev.rent) + (parseVal(next.rent) - parseVal(prev.rent))*t);
        const totalVal = Math.round(parseVal(prev.total) + (parseVal(next.total) - parseVal(prev.total))*t);
        const percentVal = Math.round(parseVal(prev.percent) + (parseVal(next.percent) - parseVal(prev.percent))*t);

        return {
            year,
            label: (year-start+1) + " лет",
            sale: sale.toLocaleString('ru-RU') + " ₽",
            rent: rent.toLocaleString('ru-RU') + " ₽",
            total: totalVal.toLocaleString('ru-RU') + " ₽",
            percent: percentVal + "%"
        };
    }

    function update(){
        const state = getInterpolatedState(current);
        const percent = (current - start)/totalYears*100;

        thumb.style.left = percent + "%";
        progress.style.width = percent + "%";
        tooltip.innerHTML = state.label;

        container.querySelectorAll(".tick").forEach(tick=>{
            const year = Number(tick.dataset.year);
            tick.classList.toggle("active", year <= current);
        });

        const blocks = container.querySelectorAll(".profit-sale-price");
        if(blocks.length >= 3){
            blocks[0].children[0].innerText = state.sale;
            blocks[0].children[1].innerText = state.percent;
            blocks[1].children[0].innerText = state.rent;
            blocks[1].children[1].innerText = state.percent;
            blocks[2].children[0].innerText = state.total;
            blocks[2].children[1].innerText = state.percent;
        }

        // Верхние блоки
        let activeIndex = -1;
        if(current >= 2029 && current < 2031) activeIndex = 0;
        else if(current >= 2031 && current < 2033) activeIndex = 1;
        else if(current >= 2033 && current <= 2036) activeIndex = 2;

        topItems.forEach((el,i)=>{
            el.classList.toggle("active", i === activeIndex);
        });

        // Мобильная версия
        mobileItems.forEach(item => {
            const itemYear = Number(item.dataset.year);
            item.classList.toggle("active", current === itemYear);
        });
    }

    update();

    /* ================== КЛИК ПО ТРЕКУ ================== */
    track.addEventListener("click",(e)=>{
        const rect = track.getBoundingClientRect();
        const percent = (e.clientX - rect.left)/rect.width;
        current = getNearestYear(percent);
        update();
    });

    /* ================== ДРАГ ================== */
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

    thumb.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveAt);
    document.addEventListener("mouseup", stopDrag);

    thumb.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveAt);
    document.addEventListener("touchend", stopDrag);

    /* ================== МОБИЛЬНЫЕ КНОПКИ ================== */
    mobileItems.forEach(item=>{
        item.addEventListener("click", ()=>{
            current = Number(item.dataset.year);
            update();
        });
    });
}

/* ================== ИНИЦИАЛИЗАЦИЯ ВСЕХ ТАЙМЛАЙНОВ НА СТРАНИЦЕ ================== */
document.querySelectorAll(".timeline-wrapper").forEach(wrapper => {
    initTimeline(wrapper);
});