let fone = document.getElementById("body");

function change_color(color){
    if (color === "random"){
        fone.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    else {
    fone.style.backgroundColor = color;
    }
}

function check_input(){
    let word = document.getElementById("user_input").value;
    let temp_word = word.split('').reverse().join('');
    alert(word === temp_word)
}

let tasks = (localStorage.getItem("tasks") || "").split("|").filter(t => t.trim() !== "");

function input() {
    let task = document.getElementById("user_input").value.trim();
    if (task !== "") {
        tasks.push(task);
        document.getElementById("user_input").value = "";
        saveTasks();
        output();
    }
}

function saveTasks() {
    localStorage.setItem("tasks", tasks.join("|"));;
}

function output() {
    let container = document.getElementById("check_tasks");
    container.innerHTML = "";

    tasks.forEach((task, index) => {
        let wrapper = document.createElement("div");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task${index}`;
        checkbox.value = task;

        let label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = task;
        label.style.fontSize = "30px"
        label.style.fontFamily = "Comfortaa"

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
                label.style.color = "gray";
            } 
            else {
                label.style.textDecoration = "none";
                label.style.color = "black";
            }
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => removeTask(index);

        let changeBtn = document.createElement("button");
        changeBtn.textContent = "Изменить";
        changeBtn.onclick = () => changeTask(index);

        checkbox.addEventListener("click", (evt) => hide(evt, changeBtn), false);

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        wrapper.appendChild(deleteBtn);
        wrapper.appendChild(changeBtn);

        container.appendChild(wrapper);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    output();
}

function changeTask(index) {
    let newTask = prompt("Введите новое значение задачи:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        output();
    }
}

function hide(evt, changeBtn) {
    evt.target.style.visibility = "hidden";
    changeBtn.style.visibility = "hidden";
  }

