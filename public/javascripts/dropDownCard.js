document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-text');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.drop-down-card');
            const icon = this.querySelector('i');

            card.classList.toggle('expanded');

            if (card.classList.contains('expanded')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                card.style.height = 'auto';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                card.style.height = '200px'; // or any desired default height
            }
        });
    });
});