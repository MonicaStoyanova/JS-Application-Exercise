import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import { register } from "../api/user.js"



const registerTemplate = (onRegister) => html`
                <section id="register-view">
            <h2>Register</h2>
            <form @submit=${onRegister} id="register">
                <label>Email: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <p class="notification"></p>
                <button>Register</button>
            </form>
        </section>`;

export async function showRegister(ctx) {

    const homeLink = document.getElementById('home');
    const loginLink = document.getElementById('login');
    const registerLink = document.getElementById('register');
    if (loginLink) {
        loginLink.classList.remove('active')
    }
    if (registerLink) {
        registerLink.classList.add('active')
    }
    if (homeLink) {
        homeLink.classList.remove('active')
    }

    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({email, password, rePass}) {
        if (email == "" || password == ""){
            return alert("All fields are required!");
        }

        if(password != rePass){
            return alert("Passwords don\'t match!")
        }

        await register(email, password);
        ctx.updateNav()
        ctx.page.redirect('/')
    }
}