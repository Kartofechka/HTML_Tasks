const pomodoro = $('#pomodoro-button')
const lb = $('#lb-button')
const sb = $('#sb-button')
const timer = $('#time-show')
const start = $('#start-button')
const pause = $('#pause-button')
const reset = $('#reset-button')

let time = 600
let interval
let mins
let seconds

function show_time(time){
    if (time > 0){
        mins = Math.floor(time / 60)
        seconds = time % 60
        timer.text(`${mins} мин., ${seconds} сек.`)
    } else {
        timer.text(`Время вышло`)
        clearInterval(interval)
    }
}

function start_timer(){
    clearInterval(interval)
    interval = setInterval(function(){
        time--
        show_time(time)
    }, 1000)
}

start.click(function(){
    start_timer()
})

pause.click(function(){
    clearInterval(interval)
})

reset.click(function(){
    clearInterval(interval)
    time = 600
    show_time(time)
})

pomodoro.click(function(){
    clearInterval(interval)
    time = 1500
    show_time(time)
    start_timer()
})

lb.click(function(){
    clearInterval(interval)
    time = 900
    show_time(time)
    start_timer()
})

sb.click(function(){
    clearInterval(interval)
    time = 300
    show_time(time)
    start_timer()
})
