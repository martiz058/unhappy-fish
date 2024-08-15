function applyStylesToElements(className, styles) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        for (const [property, value] of Object.entries(styles)) {
            element.style[property] = value;
        }
    });
}

function changeNavbarColorOnScroll(targetId, baseColor, targetColor) {
    document.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const targetElement = document.getElementById(targetId);
        const targetBottom = targetElement.getBoundingClientRect().bottom;
        const scrollPosition = window.scrollY;
        const opacity = Math.min((scrollPosition - targetBottom) / 300, 1);

        if (scrollPosition < targetBottom) {
            navbar.style.backgroundColor = baseColor;
        } else {
            navbar.style.backgroundColor = targetColor;
        }
    });
}
