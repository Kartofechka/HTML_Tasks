const loginMenu = document.getElementById('user_data')
const loginButton = document.getElementById('login_btn')
const user_name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')

const choices = document.getElementById('choices')

choices.style.display = 'none'
let choice_head = document.getElementById('choice_name')

loginButton.addEventListener('click', function(){
    const USER_NAME = 'Егор';
    const PASSWORD = '123';
    if (user_name.value == USER_NAME && password.value == PASSWORD){
        console.log('good')
        loginMenu.style.display = 'none'
        choices.style.display = 'block'
        choice_head.textContent = `Анкета ${user_name.value}`;
    }
})
