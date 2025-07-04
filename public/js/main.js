// 📁 public/js/main.js
import { firstLogin, changePassword } from './auth.js';
import { createAccount } from './account.js';
import { submitEnquiry } from './enquiry.js';

// ✅ FIRST LOGIN FORM (FirstLogin.html)

const firstLoginForm = document.getElementById('firstLoginForm');
if (firstLoginForm) {
  console.log('✅ First login form found');
  firstLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('🚀 Submitting first login form');
    await firstLogin();
  });
}

// ✅ CHANGE PASSWORD FORM
const changePwdBtn = document.getElementById('changePwdBtn');
if (changePwdBtn) {
  changePwdBtn.onclick = changePassword;
}

// ✅ CREATE ACCOUNT BUTTON
const createAccountBtn = document.getElementById('createAccountBtn');
if (createAccountBtn) {
  createAccountBtn.onclick = createAccount;
}

// ✅ SUBMIT ENQUIRY
const submitEnquiryBtn = document.getElementById('submitEnquiryBtn');
if (submitEnquiryBtn) {
  submitEnquiryBtn.onclick = submitEnquiry;
}

// ✅ FORGOT PASSWORD REDIRECT
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
if (forgotPasswordBtn) {
  forgotPasswordBtn.onclick = () => {
    window.location.href = 'ChangePassword.html';
  };
}

// ✅ DEFAULT LOGIN (SecurityLogin.html)
async function defaultLogin() {
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('defaultPassword')?.value.trim();

  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/security-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful!');
      window.location.href = 'CreateNewAccount.html';
    } else {
      alert(result.error || 'Login failed');
    }
  } catch (err) {
    alert('Login error: ' + err.message);
  }
}

// ✅ BIND DEFAULT LOGIN FORM (SecurityLogin.html)
const defaultLoginForm = document.getElementById('defaultLoginForm');
if (defaultLoginForm) {
  defaultLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    defaultLogin();
  });
}

// ✅ Show/hide password toggle
window.togglePassword = function (id) {
  const field = document.getElementById(id);
  field.type = field.type === 'password' ? 'text' : 'password';
};
