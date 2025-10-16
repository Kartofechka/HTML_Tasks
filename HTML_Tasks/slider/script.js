const button_left = document.getElementById('left');
const button_right = document.getElementById('right');
const image = document.getElementById('image');

const img_src = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg'];
let index = 0;
image.src = img_src[index];

function updateImage() {
    image.src = img_src[index];
}

function right() {
    index += 1;
    if (index >= img_src.length) {
        index = 0;
    }
    updateImage();
}

function left() {
    if (index <= 0) {
        index = img_src.length;
    }
    index -= 1;
    updateImage();
}

button_left.addEventListener('click', left);
button_right.addEventListener('click', right);

updateButtons();