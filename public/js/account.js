import { apiPost } from './api.js';
import { showFirstLogin } from './ui.js';

export async function createAccount() {
    const body = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        contact: document.getElementById('contact').value,
        education: document.getElementById('education').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        password: document.getElementById('newPassword').value,
        accessEnquiry: document.getElementById('enquiryAccess').checked,
        accessDemo: document.getElementById('demoAccess').checked,
        accessStudent: document.getElementById('studentAccess').checked
    };

    // ✅ Prefix with /api
    const result = await apiPost('/api/create-account', body);

    if (result.message) {
        alert('Account created!');
        showFirstLogin();
    } else {
        alert('Failed: ' + (result.error || 'Unknown'));
    }
}
