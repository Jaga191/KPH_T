// 📁 public/js/auth.js
import { apiPost } from './api.js';

export async function firstLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please enter email and password');
    return;
  }

  // ✅ FIXED route: now points to /api/first-login
  const data = await apiPost('/api/first-login', { email, password });
  console.log('🔁 Server response:', data);

  if (data.error) {
    alert(data.error || 'Login failed');
    return;
  }

  localStorage.setItem('userContact', email);

  if (data.firstLogin === true) {
    window.location.href = 'ChangePassword.html';
  } else {
    window.location.href = 'SelectForm.html';
  }
}

export async function changePassword() {
  const email = localStorage.getItem('userContact');
  const oldPassword = document.getElementById('oldPassword')?.value.trim();
  const newPassword = document.getElementById('newPasswordChange')?.value.trim();
  const confirmPassword = document.getElementById('retypeNewPassword')?.value.trim();

  if (!oldPassword || !newPassword || newPassword !== confirmPassword) {
    alert('Passwords do not match or are empty');
    return;
  }

  // ✅ FIXED route: now points to /api/change-password
  const data = await apiPost('/api/change-password', {
    email,
    oldPassword,
    newPassword,
  });

  if (data.error) {
    alert(data.error);
  } else {
    alert(data.message || 'Password changed successfully!');
    window.location.href = 'SelectForm.html';
  }
}
