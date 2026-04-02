let tasks = [];
let task_id = 1;
let editing_task_id = null;

function add_task () {
    const task_input = document.getElementById ("task_input");
    const task_text = task_input.value.trim ();
    if (task_text === "") return;

    const task = {
        id: task_id++,
        text: task_text,
        completed: false
    };

    tasks.push(task);
    updatetask_list();
    task_input.value= "";
}