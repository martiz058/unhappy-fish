/*function getRandomImage() {
    const max = imageUrls.length; const image = imageUrls[Math.floor(Math.random() *
        (max))]; return image;
}

const imageUrls = ["/data/images/fish-0.png", "/data/images/fish-1.png", "/data/images/fish-2.png"
    , "/data/images/fish-3.png", "/data/images/fish-4.png", "/data/images/fish-5.png"
    , "/data/images/fish-6.png", "/data/images/fish-7.png",];*/

function getRandomImage() {
    const imageUrls = [
        "/data/images/fish-0.png", "/data/images/fish-1.png", "/data/images/fish-2.png",
        "/data/images/fish-3.png", "/data/images/fish-4.png", "/data/images/fish-5.png",
        "/data/images/fish-6.png", "/data/images/fish-7.png",
    ];

    const max = imageUrls.length;
    const image = imageUrls[Math.floor(Math.random() * max)];
    return image;
}
const logoElements = document.querySelectorAll('[id^="getImage"]');

logoElements.forEach(function (logoElement) {
    logoElement.src = getRandomImage();
});