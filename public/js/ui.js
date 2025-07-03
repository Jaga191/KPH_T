// ui.js
export function hideAllSections() {
    document.querySelectorAll('.form-section').forEach(sec => sec.style.display = 'none');
}

export function showFirstLogin() {
    hideAllSections();
    document.getElementById('firstLoginSection').style.display = 'block';
}

export function showChangePasswordPage() {
    hideAllSections();
    document.getElementById('changePasswordSection').style.display = 'block';
}

export function showFormsPage() {
    hideAllSections();
    document.getElementById('formsSection').style.display = 'block';
}

// Add other UI switches...
