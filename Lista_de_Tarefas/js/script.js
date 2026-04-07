let editing_task_id = null;

function add_task() {
    const task_input = document.getElementById("task_input");
    const task_text = task_input.value.trim();
    if (task_text === "") return;

    api.add_task(task_text);
    task_input.value = "";
    update_task_list();
}

function update_task_list() {
    const tasks = api.get_tasks();
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
    if (editing_task_id === id) {
        const input = document.getElementById("editing_task_input");
        const new_text = input ? input.value.trim() : "";
        if (new_text !== "") {
            api.edit_task(id, new_text);
            editing_task_id = null;
            update_task_list();
        }
    } else {
        editing_task_id = id;
        update_task_list();
    }
}

function delete_task(id) {
    api.delete_task(id);
    if (editing_task_id === id) editing_task_id = null;
    update_task_list();
}

function toggle_task_completion(id) {
    api.toggle_task(id);
    update_task_list();
}

function update_progress() {
    const tasks = api.get_tasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.getElementById("progress_bar").style.width = percent + "%";
}

document.getElementById("task_input").addEventListener("keydown", e => {
    if (e.key === "Enter") add_task();
});

// ===== TEMA =====
function toggle_theme() {
    const body = document.body;
    const btn = document.querySelector(".theme_toggle");

    if (body.getAttribute("data-theme") === "light") {
        body.removeAttribute("data-theme");
        btn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    } else {
        body.setAttribute("data-theme", "light");
        btn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    }
}

// Carrega o tema guardado ao abrir a página
(function () {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.body.setAttribute("data-theme", "light");
        const btn = document.querySelector(".theme_toggle");
        if (btn) btn.textContent = "☀️";
    }
})();
update_task_list();