// 📁 public/js/api.js

// Automatically handles same-origin or localhost:3000
const isLocalhost = window.location.hostname === 'localhost';
export const API_BASE = isLocalhost ? 'http://localhost:3000/api' : '/api';

export async function apiPost(path, data) {
    try {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Handle non-JSON error responses gracefully
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid JSON response');
        }

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

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid JSON response');
        }

        const result = await res.json();
        return result;
    } catch (err) {
        console.error(`❌ GET ${path} failed:`, err);
        return { error: 'Network or server error' };
    }
}
