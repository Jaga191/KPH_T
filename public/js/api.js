// 📁 public/js/api.js

export const API_BASE = 'http://localhost:3000'; // or '' if serving frontend from same origin

export async function apiPost(path, data) {
    try {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (err) {
        console.error(`❌ POST ${path} failed:`, err);
        return { error: 'Network or server error' };
    }
}

export async function apiGet(path) {
    try {
        const res = await fetch(`${API_BASE}${path}`);
        const result = await res.json();
        return result;
    } catch (err) {
        console.error(`❌ GET ${path} failed:`, err);
        return { error: 'Network or server error' };
    }
}
