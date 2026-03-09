document.addEventListener("DOMContentLoaded", function () {
    const timerBlock = document.querySelector(".timer");
    if (!timerBlock) return; // нет таймера — выходим

    const deadlineStr = timerBlock.getAttribute("data-deadline");
    if (!deadlineStr) return; // нет даты — выходим

    // Парсер даты: поддерживает "31.10.2025 23:59:59" и просто "31.10.2025"
    function parseDeadline(str) {
        const trimmed = str.trim();

        // Если вдруг пришёл нормальный формат, который понимает Date.parse — сначала пробуем его
        let ts = Date.parse(trimmed);
        if (!isNaN(ts)) return ts;

        // Формат "ДД.ММ.ГГГГ" или "ДД.ММ.ГГГГ ЧЧ:ММ" или "ДД.ММ.ГГГГ ЧЧ:ММ:СС"
        const [datePart, timePart = "00:00:00"] = trimmed.split(" ");
        const [dd, mm, yyyy] = datePart.split(".");

        if (!dd || !mm || !yyyy) return NaN;

        const [hh = "00", mi = "00", ss = "00"] = timePart.split(":");

        return new Date(
            Number(yyyy),
            Number(mm) - 1,
            Number(dd),
            Number(hh),
            Number(mi),
            Number(ss)
        ).getTime();
    }

    const deadline = parseDeadline(deadlineStr);
    if (isNaN(deadline)) return; // кривая дата — тихо выходим, ничего не ломаем

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
        const now = Date.now();
        const t = deadline - now;

        if (t <= 0) {
            timerBlock.innerHTML = "<h3>Акция завершена!</h3>";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);

        daysEl.innerText    = String(days).padStart(2, "0");
        hoursEl.innerText   = String(hours).padStart(2, "0");
        minutesEl.innerText = String(minutes).padStart(2, "0");
        secondsEl.innerText = String(seconds).padStart(2, "0");
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});
