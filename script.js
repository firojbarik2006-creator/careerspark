var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hidemenu() {
    navLinks.style.right = "-200px";
}

function selectRole(role) {
    const studentForm = document.getElementById('student-form');
    const companyForm = document.getElementById('company-form');
    const roleButtons = document.querySelectorAll('.role-btn');

    // Hide all forms
    studentForm.classList.add('hidden');
    companyForm.classList.add('hidden');

    // Remove active state from all buttons
    roleButtons.forEach(btn => btn.classList.remove('active'));

    // Show the selected form and set button as active
    if (role === 'student') {
        studentForm.classList.remove('hidden');
        roleButtons[0].classList.add('active');
    } else if (role === 'company') {
        companyForm.classList.remove('hidden');
        roleButtons[1].classList.add('active');
    }
}

function togglePasswordVisibility(inputId, iconElement) {
    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === 'password') {
        // Change type to 'text' to show the password
        passwordInput.type = 'text';
        // Change the icon to 'fa-eye' (open eye)
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    } else {
        // Change type back to 'password' to hide it
        passwordInput.type = 'password';
        // Change the icon back to 'fa-eye-slash' (crossed-out eye)
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const userRole = document.getElementById('userRole');
    const studentFields = document.getElementById('studentFields');
    const employerFields = document.getElementById('employerFields');
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // 1. Conditional Field Display
    userRole.addEventListener('change', (event) => {
        const role = event.target.value;

        // Hide all conditional fields first
        studentFields.classList.add('hidden');
        employerFields.classList.add('hidden');

        // Remove 'required' attribute from all inputs in the conditional groups
        studentFields.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
        employerFields.querySelectorAll('input').forEach(input => input.removeAttribute('required'));

        // Show and set 'required' for the selected role
        if (role === 'student') {
            studentFields.classList.remove('hidden');
            // Set required fields for student
            document.getElementById('studentName').setAttribute('required', 'required');
            document.getElementById('studentId').setAttribute('required', 'required');
        } else if (role === 'employer') {
            employerFields.classList.remove('hidden');
            // Set required fields for employer
            document.getElementById('companyName').setAttribute('required', 'required');
            document.getElementById('contactName').setAttribute('required', 'required');
        }
    });

    // 2. Password Matching Validation
    signupForm.addEventListener('submit', (event) => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Error: Passwords do not match!');
            confirmPasswordInput.focus();
            event.preventDefault(); // Stop form submission
            return;
        }

        // 3. Basic Front-End Security Check for ID Upload
        const role = userRole.value;
        if (role === 'student') {
            const studentIdFile = document.getElementById('studentId').value;
            if (!studentIdFile) {
                alert('Error: Student ID Card upload is required for verification.');
                event.preventDefault();
                return;
            }
        }

        // If successful (on the front-end), the form will now submit to your back-end (e.g., /register)
        // Your back-end must handle the final security, validation, hashing, and file storage.
        // For demonstration, let's prevent actual submission here:
        // event.preventDefault(); 
        // alert('Sign Up Successful (Validation Passed)! Submitting data to server...');
    });
});