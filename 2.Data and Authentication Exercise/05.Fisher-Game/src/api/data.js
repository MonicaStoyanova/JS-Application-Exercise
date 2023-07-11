import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get('/data/catches');
};

export async function deleteById(id) {
    return del('/data/catches/' + id)
}

export async function createCatch(catchData) {
    return post(`/data/catches`, catchData)
};

export async function editCatch(catchData, id) {
    return put(`/data/catches/` + id, catchData)
};