// enquiry.js
import { apiPost } from './api.js';

export async function submitEnquiry() {
    const data = {
        contact: localStorage.getItem('userContact'),
        phone: document.getElementById('countryCode').value + document.getElementById('enquiryPhone').value,
        course: document.getElementById('course').value,
        // Add all fields...
    };

    const result = await apiPost('/enquiry', data);
    alert('Submitted: ' + result.enquiryId);
}
