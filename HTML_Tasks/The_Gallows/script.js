const wordInput = document.getElementById("word_for_play");
const startBtn = document.getElementById("to_game_btn");
const answerDiv = document.getElementById("answer");
const gallowsImg = document.getElementById("gallows_img");
const gallowsImgRes = document.getElementById("gallows_img_res");
const lettersDiv = document.getElementById("latters");
const resultText = document.getElementById("res_text");
const newGameBtn = document.getElementById("new_game");
const inputWordDiv = document.getElementById("input_word")
const gameDiv = document.getElementById("Game")
const resultsDiv = document.getElementById("results")

let secretWord = "";
let displayWord = [];
let wrongAttempts = 0;
const maxAttempts = 10;

const gallowsStages = [
    "assets/stage_0.png",
    "assets/stage_1.png",
    "assets/stage_2.png",
    "assets/stage_3.png",
    "assets/stage_4.png",
    "assets/stage_5.png",
    "assets/stage_6.png",
    "assets/stage_7.png",
    "assets/stage_8.png",
    "assets/stage_9.png",
    "assets/stage_10.png",
    "assets/stage_win.png"
];

startBtn.addEventListener("click", () => {
    secretWord = wordInput.value.toUpperCase();
    if (!secretWord) return;

    displayWord = Array(secretWord.length).fill("_");
    answerDiv.textContent = displayWord.join(" ");
    wrongAttempts = 0;
    gallowsImg.textContent = gallowsStages[0];
    resultText.textContent = "";

    Array.from(lettersDiv.querySelectorAll("button")).forEach(btn => {
        btn.disabled = false;
    });

    inputWordDiv.style.display = "none";
    gameDiv.style.display = "block";
});

lettersDiv.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" || !secretWord) return;

    const letter = e.target.textContent;
    e.target.disabled = true;

    if (secretWord.includes(letter)) {
        e.target.classList.add("good_button")
        secretWord.split("").forEach((ch, i) => {
            if (ch === letter) {
                displayWord[i] = letter;
            }
        });
        answerDiv.textContent = displayWord.join(" ");

        if (!displayWord.includes("_")) {
            resultText.textContent = "Победа!";
            resultsDiv.style.display = "block";
            gameDiv.style.display = "none";
            gallowsImgRes.src = gallowsStages[11]
            Array.from(lettersDiv.querySelectorAll("button")).forEach(btn => {
                btn.disabled = true;
                btn.classList.remove("good_button", "bad_button")
            });
        }
    } else {
        e.target.classList.add("bad_button")
        wrongAttempts++;
        gallowsImg.src = gallowsStages[wrongAttempts];

        if (wrongAttempts >= maxAttempts) {
            resultText.textContent = `Повесили! Загаданное слово: ${secretWord}`;
            Array.from(lettersDiv.querySelectorAll("button")).forEach(btn => {
                btn.disabled = true;
                btn.classList.remove("good_button", "bad_button")
            });
            resultsDiv.style.display = "block";
            gameDiv.style.display = "none";
        }
    }
});

newGameBtn.addEventListener("click", () => {
    wordInput.value = "";
    answerDiv.textContent = "";
    gallowsImg.src = gallowsStages[0];
    resultText.textContent = "";
    secretWord = "";
    displayWord = [];
    wrongAttempts = 0;

    Array.from(lettersDiv.querySelectorAll("button")).forEach(btn => {
        btn.disabled = false;
    });

    resultsDiv.style.display = "none";
    inputWordDiv.style.display = "block";
});
