/* ============================
      МОДАЛКА ТРЕЙЛЕРА
============================= */

const openBtn = document.getElementById("openTrailer");
const modal = document.getElementById("trailerModal");
const closeBtn = document.getElementById("closeTrailer");
const trailerFrame = document.getElementById("trailerFrame");

if (openBtn) {
    openBtn.addEventListener("click", () => {
        openModal(modal);
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        closeTrailerModal();
    });
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeTrailerModal();
        }
    });
}

function closeTrailerModal() {
    if (modal) modal.style.display = "none";
    if (trailerFrame) {
        trailerFrame.src = trailerFrame.src;
}
}

/* ============================
      МОДАЛКА РЕГИСТРАЦИИ
============================= */

/* ============================
      МОДАЛКА РЕГИСТРАЦИИ
============================= */

const openRegister = document.getElementById("openRegister");
const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");
const cancelRegister = document.getElementById("cancelRegister");

const registerForm = document.getElementById("registerForm");

const errName = document.getElementById("err-name");
const errEmail = document.getElementById("err-email");
const errPassword = document.getElementById("err-password");
const errPassword2 = document.getElementById("err-password2");
const errAgree = document.getElementById("err-agree");
const formSuccess = document.getElementById("formSuccess");

function openModal(modal) {
    if (!modal) return;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Сброс ошибок
    [errName, errEmail, errPassword, errPassword2, errAgree].forEach(el => {
        if (el) el.textContent = "";
    });

    if (formSuccess) formSuccess.hidden = true;
}

if (openRegister) {
    openRegister.addEventListener("click", () => openModal(registerModal));
}

if (closeRegister) {
    closeRegister.addEventListener("click", () => closeModal(registerModal));
}

if (cancelRegister) {
    cancelRegister.addEventListener("click", () => closeModal(registerModal));
}

if (registerModal) {
    registerModal.addEventListener("click", (e) => {
        if (e.target === registerModal) closeModal(registerModal);
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (registerModal && registerModal.style.display === "flex") {
            closeModal(registerModal);
        }
        if (modal && modal.style.display === "flex") {
            closeTrailerModal();
        }
    }
});

let openedRegister = false;

window.addEventListener("scroll", () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    if (!openedRegister && scrollPosition >= pageHeight - 50) {
        openModal(registerModal);
        openedRegister = true;
    }
});

/* ============================
      ВАЛИДАЦИЯ ФОРМЫ РЕГИСТРАЦИИ
============================= */

function validateRegisterForm() {
    let isValid = true;

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const password2 = registerForm.password2.value;
    const agree = registerForm.agree.checked;

    // Сброс ошибок
    [errName, errEmail, errPassword, errPassword2, errAgree].forEach(el => {
        if (el) el.textContent = "";
    });

    // Проверка имени
    if (!name) {
        errName.textContent = "Введите имя";
        isValid = false;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errEmail.textContent = "Введите email";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errEmail.textContent = "Некорректный email";
        isValid = false;
    }

    // Проверка пароля
    if (!password) {
        errPassword.textContent = "Введите пароль";
        isValid = false;
    } else {
        const errors = [];
        if (password.length < 8) errors.push("не меньше 8 символов");
        if (!/[A-Z]/.test(password)) errors.push("хотя бы одна заглавная буква");
        if (!/[a-z]/.test(password)) errors.push("хотя бы одна строчная буква");
        if (!/[0-9]/.test(password)) errors.push("хотя бы одна цифра");
        if (!/[^A-Za-z0-9]/.test(password)) errors.push("хотя бы один спецсимвол");

        if (errors.length) {
            errPassword.textContent = "Пароль должен содержать: " + errors.join(", ");
            isValid = false;
        }
    }

    // Проверка подтверждения пароля
    if (password !== password2) {
        errPassword2.textContent = "Пароли не совпадают";
        isValid = false;
    }

    // Проверка согласия
    if (!agree) {
        errAgree.textContent = "Необходимо согласие";
        isValid = false;
    }

    return isValid;
}

// Обработка отправки формы
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateRegisterForm()) {
            if (formSuccess) {
                formSuccess.hidden = false;
                formSuccess.textContent = "Регистрация успешна!";
            }
            registerForm.reset();
        }
    });
}