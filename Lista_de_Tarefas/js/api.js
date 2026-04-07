const api = {
    get_tasks() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }, 
    _save_tasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    //adicionar tarefa
    add_task(text) {
        const tasks = this.get_tasks();
        const new_task = {
            id: Date.now(),  // ID único baseado no timestamp
            text: text,
            completed: false
        };
        tasks.push(new_task);
        this._save_tasks(tasks);
        return new_task;
    },
    //deletar tarefa pelo id
    delete_task(id) {
        const tasks = this.get_tasks().filter(t => t.id !== id);
        this._save_tasks(tasks);
    },
    //editar o texto de uma tarefa
    edit_task(id, new_text) {
        const tasks = this.get_tasks();
        const task = tasks.find(t => t.id === id);
        if (task) task.text = new_text;
        this._save_tasks(tasks);
    },
    //marcar tarefa como completa
    toggle_task(id) {
        const tasks = this.get_tasks();
        const task = tasks.find(t => t.id === id);
        if (task) task.completed = !task.completed;
        this._save_tasks(tasks);
    }
};