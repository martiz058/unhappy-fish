document.addEventListener('DOMContentLoaded', () => {
    const readMoreButton = document.getElementById('readMoreButton');
    const features = document.querySelectorAll('.scroll-to-showcase');

    readMoreButton?.addEventListener('click', () => {
        scrollToId('features');
    });

    features.forEach(feature => {
        feature.addEventListener('click', () => {
            scrollToId('showcase');
        });
    });

    function scrollToId(sectionId) {
        const section = document.getElementById(sectionId);
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        window.scrollTo({
            top: section.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    }
});
