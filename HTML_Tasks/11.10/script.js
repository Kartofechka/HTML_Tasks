const loginMenu = document.getElementById('user_data')
const loginButton = document.getElementById('login_btn')
const sendButton = document.getElementById('send_btn')
const user_name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')

const choices = document.getElementById('choices')
choices.style.display = 'none'

let choice_head = document.getElementById('choice_name')

loginButton.addEventListener('click', function(event){
    if (!user_name.value || !password.value) {
        alert('Пожалуйста, введите логин и пароль.');
        return;
    }
    else {
        event.preventDefault()
        loginMenu.style.display = 'none'
        choices.style.display = 'block'
        choice_head.textContent = `Анкета ${user_name.value}`
    }
})

const result = document.getElementById('result')
result.style.display = 'none'
let result_head = document.getElementById('result_name')

sendButton.addEventListener('click', function(){
    const fir_answ = document.getElementById('first_answer').value
    const sec_answ = document.getElementById('second_answer').value
    const thir_answ = document.querySelector('input[name="third_answer"]:checked')?.value || ''

    if (!fir_answ|| !sec_answ || !thir_answ) {
        alert('Пожалуйста, ответьте на все вопросы!');
        return;
    }
    else {
        let answer = document.getElementById('answer')
        choices.style.display = 'none'
        result.style.display = 'block'
        result_head.textContent = `Результаты ${user_name.value}`;
        answer.textContent = `Первый ответ: ${fir_answ}\nВторой ответ: ${sec_answ}\nТретий ответ: ${thir_answ}`
    }
})
