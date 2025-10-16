const button_left = document.getElementById('left');
const button_right = document.getElementById('right');
const image = document.getElementById('image');

const img_src = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg'];
let index = 0;
image.src = img_src[index];

const img_info = ['Шрексель', 'Окак', 'Чиловый парень', 'Выхожу после экзамена по дискретке'];
const p_info = document.getElementById('p_info')
const info_btn = document.getElementById('info')

const random_btn = document.getElementById('random')
let random_condition = -1

let last_index = index

function updateImage() {
    p_info.textContent = ''
    if (random_condition != -1){
        random_index = Math.floor(Math.random() * img_src.length)
        if (random_index === last_index) {
            image.src = img_src[random_index + 1]
            setCanvasBackground(img_src[random_index + 1]);
            last_index = random_index + 1
        }
        else {
            image.src = img_src[random_index]
            setCanvasBackground(img_src[random_index]);
            last_index = random_index
        }
    }
    else {
        image.src = img_src[index];
        setCanvasBackground(img_src[index]);
        last_index = index
    }
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

function show_info(){
    p_info.textContent = img_info[index]
}

function change_random(){
    random_condition *= -1
}

button_left.addEventListener('click', left);
button_right.addEventListener('click', right);
info_btn.addEventListener('click', show_info)
random_btn.addEventListener('click', change_random)





const canvas = document.getElementById('drawing_picture');
const ctx = canvas.getContext('2d');
const pos = { x: 0, y: 0 };
const clear_btn = document.getElementById('clear')

canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseenter', setPosition);


function setPosition(e) {
    pos.x = e.clientX - canvas.getBoundingClientRect().left;
    pos.y = e.clientY - canvas.getBoundingClientRect().top;
}

function draw(e) {
  if (e.buttons !== 1) return;

  const user_color = document.getElementById('drawer_color').value;
  const user_width = document.getElementById('drawer_width').value;

    ctx.beginPath();
    changeWidtg(user_width);
    ctx.lineCap = 'round';
    ctx.strokeStyle = user_color;
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function clearPlace(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function changeWidtg(user_width){
    ctx.lineWidth = user_width;
}

function setCanvasBackground(src) {
    const bg = new Image();
    bg.src = src;
    bg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // очистить холст
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // нарисовать фон
    };
}


clear_btn.addEventListener('click', clearPlace)