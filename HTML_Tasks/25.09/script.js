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
        
        let task_buttons = document.createElement("div");
        task_buttons.className = "task_buttons";

        task_buttons.appendChild(deleteBtn);
        task_buttons.appendChild(changeBtn);

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        wrapper.appendChild(task_buttons);

        container.appendChild(wrapper);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    output();
}

function changeTask(index) {
    const container = document.getElementById("check_tasks");
    const wrapper = container.children[index];
    const label = wrapper.querySelector("label");

    label.style.display = "none";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = tasks[index];
    inputField.className = "edit-input";

    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const newValue = inputField.value.trim();
            if (newValue !== "") {
                tasks[index] = newValue;
                saveTasks();
                output();
            }
        }
    });

    wrapper.insertBefore(inputField, label.nextSibling);
    inputField.focus();
}

function hide(evt, changeBtn) {
    evt.target.style.visibility = "hidden";
    changeBtn.style.visibility = "hidden";
  }




let writes = (localStorage.getItem("writes") || "").split("|").filter(w => w.trim() !== "");

function inputWrite() {
    let note = document.getElementById("input_write").value.trim();
    if (note !== "") {
        writes.push(note);
        document.getElementById("input_write").value = "";
        saveWrites();
        outputWrite();
    }
}
  
function saveWrites() {
    localStorage.setItem("writes", writes.join("|"));
}
  
function outputWrite() {
    let container = document.getElementById("check_write");
    container.innerHTML = "";
  
    writes.forEach((note, index) => {
        let noteDiv = document.createElement("div");
        noteDiv.textContent = note;
        noteDiv.className = "note";
        noteDiv.id = `note-${index}`;
        noteDiv.draggable = true;
  
        noteDiv.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
  
        container.appendChild(noteDiv);
    });
}
  
document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
});
  
document.body.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedId);
  
    draggedElement.style.position = "absolute";
    draggedElement.style.left = `${e.pageX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${e.pageY - draggedElement.offsetHeight / 2}px`;
});
  
  
