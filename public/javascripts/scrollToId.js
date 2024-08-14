document.querySelectorAll('.scroll-button').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target'); // Get the target section ID
        const targetElement = document.getElementById(targetId); // Find the target element
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navbar
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});