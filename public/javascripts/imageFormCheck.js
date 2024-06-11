document.getElementById('images').addEventListener('change', function () {
    const files = this.files;

    if (files.length > 5) {
        alert('You can only select up to 5 images.');
        this.value = '';
    }
});