document.addEventListener('DOMContentLoaded', () => {
    const loginMenu = document.getElementById('user_data');
    const loginButton = document.getElementById('login_btn');
    const knownUserMenu = document.getElementById('known_user')
    const sendButton = document.getElementById('send_btn');
    const user_name = document.getElementById('name');
    const password = document.getElementById('password');
    const rememberMe = document.getElementById('remember_me');

    const choices = document.getElementById('choices');
    const result = document.getElementById('result');
    const result_head = document.getElementById('result_name');
    const answer = document.getElementById('answer');
    const choice_head = document.getElementById('choice_name');

    const knownUserName = document.getElementById('known_user_name');
    const acceptBtn = document.getElementById('accept');
    const cancelBtn = document.getElementById('cancel');

    const toLoginBtn = document.getElementById('to_login_btn')

    choices.style.display = 'none';
    result.style.display = 'none';
    knownUserMenu.style.display = 'none';

    const range = document.getElementById('ten_answer');
    const output = document.getElementById('tel_value');
    range.addEventListener('input', () => {
    output.textContent = range.value;
    });

    loginButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (!user_name.value || !password.value) {
        alert('Пожалуйста, введите логин и пароль.');
        return;
    }

    const savedName = localStorage.getItem('rememberedName');
    const testCompleted = localStorage.getItem('testCompleted');

    if (rememberMe.checked) {
    localStorage.setItem('rememberedName', user_name.value);
    } else {
        localStorage.removeItem('rememberedName');
    }

    if (savedName === user_name.value && testCompleted === 'true') {
        knownUserName.textContent = `Добро пожаловать, ${user_name.value}!`;
        loginMenu.style.display = 'none';
        knownUserMenu.style.display = 'block';

        acceptBtn.onclick = () => {
            knownUserMenu.style.display = 'none';
            result.style.display = 'block';
            result_head.textContent = `Результаты ${user_name.value}`;
            const savedResults = JSON.parse(localStorage.getItem('savedResults'));
            let formatted = '';
            for (const [key, value] of Object.entries(savedResults)) {
            if (key !== 'Цвет') {
                formatted += `<strong>${key}:</strong> ${value}<br>`;
            }
            }
            answer.innerHTML = formatted;
            answer.style.backgroundColor = savedResults['Цвет'];
        };

        cancelBtn.onclick = () => {
            knownUserMenu.style.display = 'none';
            choices.style.display = 'block';
            choice_head.textContent = `Анкета ${user_name.value}`;
        };
    } else {
        loginMenu.style.display = 'none';
        choices.style.display = 'block';
        choice_head.textContent = `Анкета ${user_name.value}`;
    }

    });

    sendButton.addEventListener('click', function () {
    const fir_answ = document.getElementById('first_answer').value;
    const sec_answ = document.getElementById('second_answer').value;

    const thir_radio = document.querySelector('input[name="third_answer"]:checked');
    const thir_answ = thir_radio ? thir_radio.parentElement.textContent.trim() : '';

    const four_select = document.getElementById('four_question');
    const four_answ = four_select.options[four_select.selectedIndex].text;

    const five_answ = document.getElementById('five_answer').value;

    const six_checkboxes = document.querySelectorAll('input[name="six_answer"]:checked');
    const six_answ = Array.from(six_checkboxes).map(cb => cb.value).join(', ');

    const seven_answ = document.getElementById('seven_answer').value;
    const eight_answ = document.getElementById('eight_answer').value;
    const nine_answ = document.getElementById('nine_answer').value;
    const ten_answ = document.getElementById('ten_answer').value;

    if (!fir_answ || !sec_answ || !thir_answ || !four_answ || !five_answ || !six_answ || !seven_answ || !eight_answ || !nine_answ || !ten_answ) {
        alert('Пожалуйста, ответьте на все обязательные вопросы!');
        return;
    }

    choices.style.display = 'none';
    result.style.display = 'block';
    result_head.textContent = `Результаты ${user_name.value}`;
    answer.innerHTML =
        `<strong>Имя:</strong> ${fir_answ}<br>` +
        `<strong>Возраст:</strong> ${sec_answ}<br>` +
        `<strong>Какой Вы кот:</strong> ${thir_answ}<br>` +
        `<strong>Любимое занятие:</strong> ${four_answ}<br>` +
        `<strong>День рождения:</strong> ${five_answ}<br>` +
        `<strong>Любимые языки:</strong> ${six_answ}<br>` +
        `<strong>Как перевезти воду в дуршлаге:</strong> ${seven_answ}<br>` +
        `<strong>Время:</strong> ${eight_answ}<br>` +
        `<strong>Номер телефона:</strong> +375${ten_answ}`;

    answer.style.backgroundColor = nine_answ

    const resultData = {
        Имя: fir_answ,
        Возраст: sec_answ,
        Кот: thir_answ,
        Занятие: four_answ,
        ДеньРождения: five_answ,
        Языки: six_answ,
        Дуршлаг: seven_answ,
        Время: eight_answ,
        Телефон: `+375${ten_answ}`,
        Цвет: nine_answ
    };

    localStorage.setItem('savedResults', JSON.stringify(resultData));
    localStorage.setItem('testCompleted', 'true');

    });

    toLoginBtn.addEventListener('click', function () {
    location.reload();
    });
});
