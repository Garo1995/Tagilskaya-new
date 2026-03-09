
document.querySelectorAll('.validate-form').forEach(form => {

    const submitBtn = form.querySelector('.btn-submit');

    function checkValidity() {
        let isValid = true;

        // Телефон
        form.querySelectorAll('.required-phone').forEach(phone => {
            if (phone.value.trim().length < 6) isValid = false;
        });



        // Чекбоксы
        form.querySelectorAll('.required-check').forEach(ch => {
            if (!ch.checked) isValid = false;
        });

        // Активируем / блокируем кнопку
        if (isValid) {
            submitBtn.classList.remove('disabled');
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.classList.add('disabled');
            submitBtn.setAttribute('disabled', true);
        }
    }

    // Слушаем изменения
    form.addEventListener('input', checkValidity);
    form.addEventListener('change', checkValidity);

});