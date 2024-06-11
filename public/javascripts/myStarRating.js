document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', function () {
            highlightStars(index);
        });

        star.addEventListener('mouseout', function () {
            if (selectedRating === 0) {
                resetStars();
            } else {
                highlightStars(selectedRating - 1);
            }
        });

        star.addEventListener('click', function () {
            selectedRating = index + 1;
            ratingInput.value = selectedRating;
            highlightStars(index);
        });
    });

    function highlightStars(index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.src = '/data/images/starfish-1.png';
            } else {
                star.src = '/data/images/starfish-0.png';
            }
        });
    }

    function resetStars() {
        stars.forEach(star => {
            star.src = '/data/images/starfish-0.png';
        });
    }
});
