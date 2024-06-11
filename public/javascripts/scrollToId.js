function scrollToId(sectionId) {
    const section = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: 'smooth'
    });
}