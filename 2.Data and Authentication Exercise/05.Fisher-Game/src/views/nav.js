import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const nav = document.querySelector('header')


const navTemplate = (hasUser) => html`
  <h1>Biggest Catch</h1>
        <nav>
            <a id="home" href="/">Home</a>
            ${hasUser ? html`            
            <div id="user">
                <a @click=${onLogout} id="logout" href="javascript:void(0)">Logout</a>
            </div>
            <p class="email">Welcome, <span>${hasUser.email}</span></p>` : 
            html`            
            <div id="guest">
                <a id="login" href="/login">Login</a>
                <a id="register" href="/register">Register</a>
            </div>
            <p class="email">Welcome, <span>guest</span>`}


        </nav>`;

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav()
    page.redirect('/')
    const catchesContainer = document.getElementById('catches')
    catchesContainer.style.display = 'none';
}
