const form = document.getElementById('form-validate');
const inputs = document.querySelectorAll('#form-validate input');

const regexp = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const shields = {
    user: false,
    name: false,
    password: false,
    email: false,
    phone: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "user":
            validateShield(regexp.user, e.target, 'user');
            break;
        case "name":
            validateShield(regexp.name, e.target, 'name');
            break;
        case "password":
            validateShield(regexp.password, e.target, 'password');
            validatePassConfirm();
            break;
        case "pass-confirm":
            validatePassConfirm();
            break;
        case "email":
            validateShield(regexp.email, e.target, 'email');
            break;
        case "phone":
            validateShield(regexp.phone, e.target, 'phone');
            break;
    }
}

const validateShield = (expression, input, shield) => {
    if(expression.test(input.value)){
        document.getElementById(`group-${shield}`).classList.remove('form-group-wrong');
        document.getElementById(`group-${shield}`).classList.add('form-group-correct');
        document.querySelector(`#group-${shield} i`).classList.add('fa-check-circle');
        document.querySelector(`#group-${shield} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group-${shield} .form-input-error`).classList.remove('form-input-error-active');
        shields[shield] = true;
    } else {
        document.getElementById(`group-${shield}`).classList.add('form-group-wrong');
        document.getElementById(`group-${shield}`).classList.remove('form-group-correct');
        document.querySelector(`#group-${shield} i`).classList.add('fa-times-circle');
        document.querySelector(`#group-${shield} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group-${shield} .form-input-error`).classList.add('form-input-error-active');
        shields[shield] = false;
    }
}

const validatePassConfirm = () => {
    const inputPassword = document.getElementById('password');
    const inputPassConfirm = document.getElementById('pass-confirm');

    if(inputPassword.value !== inputPassConfirm.value){
        document.getElementById(`group-pass-confirm`).classList.add('form-group-wrong');
        document.getElementById(`group-pass-confirm`).classList.remove('form-group-correct');
        document.querySelector(`#group-pass-confirm i`).classList.add('fa-times-circle');
        document.querySelector(`#group-pass-confirm i`).classList.remove('fa-check-circle');
        document.querySelector(`#group-pass-confirm .form-input-error`).classList.add('form-input-error-active');
        shields['password'] = false;
    } else {
        document.getElementById(`group-pass-confirm`).classList.remove('form-group-wrong');
        document.getElementById(`group-pass-confirm`).classList.add('form-group-correct');
        document.querySelector(`#group-pass-confirm i`).classList.remove('fa-times-circle');
        document.querySelector(`#group-pass-confirm i`).classList.add('fa-check-circle');
        document.querySelector(`#group-pass-confirm .form-input-error`).classList.remove('form-input-error-active');
        shields['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const terms = document.getElementById('terms');
    if(shields.user && shields.name && shields.password && shields.email && shields.phone && terms.checked ){
        form.reset();

        document.getElementById('form-success-message').classList.add('form-success-message-active');
        setTimeout(() => {
            document.getElementById('form-success-message').classList.remove('form-success-message-active');
        }, 3000);

        document.querySelectorAll('.form-group-correcto').forEach((icon) => {
            icon.classList.remove('form-group-correct');
        });
        
    } else {
        document.getElementById('form-message').classList.add('form-message-active');
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('form-message-active');
        }, 3000);
    }
});
