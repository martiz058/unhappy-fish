(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(el => {
        el.addEventListener('submit', event => {
            if (!el.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            el.classList.add('was-validated')
        }, false)
    })
})()