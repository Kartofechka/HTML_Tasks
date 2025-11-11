const pomodoro = $('#pomodoro-button')
console.log(pomodoro)
const lb = $('lb-button')
console.log(lb)
const timer = $('#time-show')
const start = $('#start-button')
const pause = $('#pause-button')
const reset = $('#reset-button')

let time = 10
let interval
let mins
let seconds

function show_time(){
    if (time != 0){
    mins = Math.floor(time / 60)
    seconds = time - (mins * 60)
    timer.text(`${mins} минут,  ${seconds} секунд`);
    }
    else {
        timer.text(`Время вышло`)
        clearInterval(interval)
    }
}

start.click(function(){
    interval = setInterval(function(){
        time--;
        show_time(time);
    }, 1000);
} )

pause.click(function(){
    clearInterval(interval)
})

reset.click(function(){
    time = 1500
})