const api = {
    register(name, email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find(u => u.email === email)) {
            return {ok: false, message: "Email já registrado"};
        }
        const user = {id: Date.now().toString(), name, email, password};
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        return {ok: true, user};
    },

    login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return { ok: false, message: "Credenciais inválidas"};
        localStorage.setItem("currentUser", JSON.stringify(user));
        return {ok: true, user};
    },

    logout() {
        localStorage.removeItem("currentUser");
    },

    get_current_user() {
        return JSON.parse(localStorage.getItem("currentUser") || "null");
    },

    get_tasks() {
        const user = this.get_current_user();
        if (!user) return [];
        const all = JSON.parse(localStorage.getItem("tasks") || "[]");
        return all.filter(t => t.userId === user.id);   
    }, 

    _save_all_tasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    //adicionar tarefa
    add_task(text) {
        const user = this.get_current_user();
        if (!user) return null;
        const all = JSON.parse(localStorage.getItem("tasks") || "[]");
        const new_task = {
            id: Date.now(),  // ID único baseado no timestamp
            userId: user.id,
            text,
            completed: false
        };
        all.push(new_task);
        this._save_all_tasks(all);
        return new_task;
    },
    //deletar tarefa pelo id
    delete_task(id) {
        const all = JSON.parse(localStorage.getItem("tasks") || "[]");
        this._save_all_tasks(all.filter(t => t.id !== id));
    },
    //editar o texto de uma tarefa
    edit_task(id, new_text) {
        const all = JSON.parse(localStorage.getItem("tasks") || "[]");
        const task = all.find(t => t.id === id);
        if (task) task.text = new_text;
        this._save_all_tasks(all);
    },
    //marcar tarefa como completa
    toggle_task(id) {
        const all = JSON.parse(localStorage.getItem("tasks") || "[]");
        const task = all.find(t => t.id === id);
        if (task) task.completed = !task.completed;
        this._save_all_tasks(all);
    }
};