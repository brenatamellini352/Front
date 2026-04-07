// ---- Utilitários de validação ----

function show_field_error(field_id, error_id, message) {
    document.getElementById(field_id).classList.add("input_error");
    document.getElementById(error_id).textContent = message;
}

function clear_field_error(field_id, error_id) {
    document.getElementById(field_id).classList.remove("input_error");
    document.getElementById(error_id).textContent = "";
}

function show_form_error(message) {
    const el = document.getElementById("form_error");
    el.textContent = message;
    el.hidden = false;
}

function clear_form_error() {
    const el = document.getElementById("form_error");
    el.hidden = true;
    el.textContent = "";
}

// ---- LOGIN ----

const login_form = document.getElementById("login_form");

if (login_form) {
    // Se já está autenticado, redireciona
    if (api.get_current_user()) location.href = "index.html";

    login_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        clear_form_error();
        clear_field_error("email", "email_error");
        clear_field_error("password", "password_error");

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email) {
            show_field_error("email", "email_error", "Introduz o teu email.");
            valid = false;
        }
        if (!password) {
            show_field_error("password", "password_error", "Introduz a tua senha.");
            valid = false;
        }
        if (!valid) return;

        const result = api.login(email, password);

        if (!result.ok) {
            show_form_error(result.error);
            return;
        }

        location.href = "index.html";
    });
}

// ---- REGISTO ----

const register_form = document.getElementById("register_form");

if (register_form) {
    if (api.get_current_user()) location.href = "index.html";

    register_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        clear_form_error();
        clear_field_error("name", "name_error");
        clear_field_error("email", "email_error");
        clear_field_error("password", "password_error");
        clear_field_error("confirm_password", "confirm_password_error");

        const name             = document.getElementById("name").value.trim();
        const email            = document.getElementById("email").value.trim();
        const password         = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm_password").value;

        if (!name) {
            show_field_error("name", "name_error", "Introduz o teu nome.");
            valid = false;
        }
        if (!email) {
            show_field_error("email", "email_error", "Introduz o teu email.");
            valid = false;
        }
        if (!password) {
            show_field_error("password", "password_error", "Introduz uma senha.");
            valid = false;
        } else if (password.length < 6) {
            show_field_error("password", "password_error", "A senha deve ter pelo menos 6 caracteres.");
            valid = false;
        }
        if (!confirm_password) {
            show_field_error("confirm_password", "confirm_password_error", "Confirma a tua senha.");
            valid = false;
        } else if (password !== confirm_password) {
            show_field_error("confirm_password", "confirm_password_error", "As senhas não coincidem.");
            valid = false;
        }
        if (!valid) return;

        const result = api.register(name, email, password);

        if (!result.ok) {
            show_form_error(result.error);
            return;
        }

        // Login automático após registo
        api.login(email, password);
        location.href = "index.html";
    });
}