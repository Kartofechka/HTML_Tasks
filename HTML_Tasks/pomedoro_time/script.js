const pomodoro = $('#pomodoro-button')
const lb = $('#lb-button')
const sb = $('#sb-button')
const timer = $('#time-show')
const start = $('#start-button')
const pause = $('#pause-button')
const reset = $('#reset-button')
const skip = $('#skip-button')

let time = 1500
let interval
let mins
let seconds
let currentMode = "pomodoro"


function show_time(time){
    if (time > 0){
        mins = Math.floor(time / 60)
        seconds = time % 60
        timer.text(`${mins} мин., ${seconds} сек.`)
    } else {
        timer.text(`Время вышло`)
        clearInterval(interval)
        nextMode()
    }
}


function start_timer(){
    clearInterval(interval)
    interval = setInterval(function(){
        time--
        show_time(time)
    }, 1000)
}


function setMode(mode){
    clearInterval(interval)
    currentMode = mode
    if(mode === "pomodoro"){
        time = 1500
        $('body').css('background', '#a8011aff')
    } else if(mode === "longbreak"){
        time = 900
        $('body').css('background', '#007d0aff')
    } else if(mode === "shortbreak"){
        time = 300
        $('body').css('background', '#007d43ff')
    }
    show_time(time)
    start_timer()
}


function nextMode(){
    if(currentMode === "pomodoro"){
        setMode("longbreak")
    } else {
        setMode("pomodoro")
    }
}

start.click(function(){
    start_timer()
})

pause.click(function(){
    clearInterval(interval)
})

reset.click(function(){
    clearInterval(interval);
    time = 1500;
    show_time(time)
})

pomodoro.click(function(){
    setMode("pomodoro")
})

lb.click(function(){
    setMode("longbreak")
})

sb.click(function(){
    setMode("shortbreak")
})

skip.click(function(){
    nextMode()
})




const todoInput = $('#todo-input')
const addTodo = $('#add-todo')
const todoList = $('#todo-list')

addTodo.click(function(){
    const task = todoInput.val().trim()
    if(task !== ""){
        const li = $('<li></li>').text(task)
        const delBtn = $('<button>✖</button>').css({
            marginLeft: '10px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        })
        delBtn.click(function(){ li.remove() })
        li.append(delBtn)
        todoList.append(li)
        todoInput.val("")
    }
})
