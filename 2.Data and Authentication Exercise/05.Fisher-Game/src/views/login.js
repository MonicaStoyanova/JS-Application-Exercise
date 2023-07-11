import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import { login } from "../api/user.js"



const loginTemplate = (onLogin) => html`
        <section id="login-view">
            <h2>Login</h2>
            <form @submit=${onLogin} id="login">
                <label>Email: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <p class="notification"></p>
                <button>Login</button>
            </form>
        </section>`;

export async function showLogin(ctx) {

    const homeLink = document.getElementById('home');
    const loginLink = document.getElementById('login');
    const registerLink = document.getElementById('register');
    if (loginLink) {
        loginLink.classList.add('active')
    }
    if (registerLink) {
        registerLink.classList.remove('active')
    }
    if (homeLink) {
        homeLink.classList.remove('active')
    }

    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({email, password}) {
        if (email == "" || password == ""){
            return alert("All fields are required!");
        }

        await login(email, password);
        ctx.updateNav()
        ctx.page.redirect('/')
    }
}