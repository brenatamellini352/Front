let tasks = [];
let task_id = 1;
let editing_task_id = null;

function add_task() {
    const task_input = document.getElementById("task_input");
    const task_text = task_input.value.trim();
    if (task_text === "") return;

    tasks.push({ id: task_id++, text: task_text, completed: false });
    task_input.value = "";
    update_task_list();
}

function update_task_list() {
    const task_list = document.getElementById("task_list");
    task_list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task_item");

        const task_content = document.createElement("div");
        task_content.classList.add("task_content");

        if (editing_task_id === task.id) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "editing_task_input";
            input.value = task.text;
            task_content.appendChild(input);
        } else {
            const span = document.createElement("span");
            if (task.completed) span.classList.add("completed_task");
            span.textContent = task.text;
            task_content.appendChild(span);
        }

        const task_actions = document.createElement("div");
        task_actions.classList.add("task_actions");

        const edit_btn = document.createElement("button");
        edit_btn.innerHTML = editing_task_id === task.id ? "&#10004;" : "&#9998;";
        edit_btn.onclick = () => edit_task(task.id);

        const delete_btn = document.createElement("button");
        delete_btn.innerHTML = "&#128465;";
        delete_btn.onclick = () => delete_task(task.id);

        const toggle_btn = document.createElement("button");
        toggle_btn.innerHTML = task.completed ? "&#10060;" : "&#10004;";
        toggle_btn.onclick = () => toggle_task_completion(task.id);

        task_actions.append(edit_btn, delete_btn, toggle_btn);
        li.append(task_content, task_actions);
        task_list.appendChild(li);
    });

    update_progress();
}

function edit_task(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (editing_task_id === id) {
        const input = document.getElementById("editing_task_input");
        const new_text = input ? input.value.trim() : "";
        if (new_text !== "") {
            task.text = new_text;
            editing_task_id = null;
            update_task_list();
        }
    } else {
        editing_task_id = id;
        update_task_list();
    }
}

function delete_task(id) {
    tasks = tasks.filter(t => t.id !== id);
    if (editing_task_id === id) editing_task_id = null;
    update_task_list();
}

function toggle_task_completion(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        update_task_list();
    }
}

function update_progress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.getElementById("progress_bar").style.width = percent + "%";
}

document.getElementById("task_input").addEventListener("keydown", e => {
    if (e.key === "Enter") add_task();
});