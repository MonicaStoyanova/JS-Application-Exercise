import { getAll, deleteById, createCatch, editCatch } from "../api/data.js";
import { html, nothing, page } from "../lib.js";



const homeTemplate = (catches, user, onLoad, onCreate, onDelete, onUpdate, catchesLoaded) => html`
        <section id="home-view">
            <fieldset id="main">
                <legend>Catches</legend>
                <div style="display:none;" id="catches">
                    ${catches.length > 0 && catchesLoaded ? catches.map(x => createCatchCard(x, user, onLoad, onCreate, onDelete, onUpdate)) : nothing }
                </div>
            </fieldset>
            <aside>
                <button @click=${onLoad} class="load">Load</button>
                <form @submit=${onCreate} id="addForm">
                    <fieldset>
                        <legend>Add Catch</legend>
                        <label>Angler</label>
                        <input type="text" name="angler" class="angler" />
                        <label>Weight</label>
                        <input type="number" name="weight" class="weight" />
                        <label>Species</label>
                        <input type="text" name="species" class="species" />
                        <label>Location</label>
                        <input type="text" name="location" class="location" />
                        <label>Bait</label>
                        <input type="text" name="bait" class="bait" />
                        <label>Capture Time</label>
                        <input type="number" name="captureTime" class="captureTime" />
                        ${user ? html`                        
                        <button class="add">Add</button>`:
                                html`
                        <button disabled="true" class="add">Add</button>`}
                    </fieldset>
                </form>
            </aside>
        </section>`;


const createCatchCard = (x, user, onLoad, onCreate, onDelete, onUpdate) => html`                    <div class="catch">
<label>Angler</label>
<input type="text" class="angler" .value=${x.angler}>
<label>Weight</label>
<input type="text" class="weight" .value=${x.weight}>
<label>Species</label>
<input type="text" class="species" .value=${x.species}>
<label>Location</label>
<input type="text" class="location" .value=${x.location}>
<label>Bait</label>
<input type="text" class="bait" .value=${x.bait}>
<label>Capture Time</label>
<input type="number" class="captureTime" .value=${x.captureTime}>
${user && user._id == x._ownerId ? 
html`<button @click=${onUpdate} class="update" data-id=${x._id}>Update</button>
<button @click=${onDelete} class="delete" data-id=${x._id}>Delete</button>` : 
html`<button disabled class="update" data-id=${x._id}>Update</button>
<button disabled class="delete" data-id=${x._id}>Delete</button>`}
</div>`;




export async function showHome(ctx) {
    let catchesLoaded = false;
    const homeLink = document.getElementById('home');
    const loginLink = document.getElementById('login');
    const registerLink = document.getElementById('register');
    if (loginLink) {
        loginLink.classList.remove('active')
    }
    if (registerLink) {
        registerLink.classList.remove('active')
    }
    if (homeLink) {
        homeLink.classList.add('active')
    }

    const user = ctx.user;
    const catches = await getAll();
    ctx.render(homeTemplate(catches, user, onLoad, onCreate, onDelete, onUpdate, catchesLoaded))

    async function onLoad() {
        const catchesContainer = document.getElementById('catches')
        catchesContainer.style.display = 'block';
        catchesLoaded = true;
        ctx.render(homeTemplate(catches, user, onLoad, onCreate, onDelete, onUpdate, catchesLoaded))
    }

    async function onDelete(e) {
        const id = e.target.getAttribute('data-id')
        await deleteById(id)
        ctx.page.redirect('/');
    }

    async function onCreate(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        let { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData)

        if ([angler, weight, species, location, bait, captureTime].some(e => e == '')) {
            return alert('All fields are required!');
        }
        
        await createCatch({
            angler, 
            weight, 
            species, 
            location, 
            bait, 
            captureTime
        });
        e.target.reset();
        ctx.page.redirect('/');
    }

    async function onUpdate(e){
        e.preventDefault()

        const id = e.target.parentElement.children[12].getAttribute('data-id');

        let angler = e.target.parentElement.children[1].value
        let weight = e.target.parentElement.children[3].value
        let species = e.target.parentElement.children[5].value
        let location = e.target.parentElement.children[7].value
        let bait = e.target.parentElement.children[9].value
        let captureTime = e.target.parentElement.children[11].value

        if ([angler, weight, species, location, bait, captureTime].some(e => e == '')) {
            return alert('All fields are required!');
        }
        
        await editCatch({
            angler, 
            weight, 
            species, 
            location, 
            bait, 
            captureTime
        }, id);

        ctx.page.redirect('/');
    }
}