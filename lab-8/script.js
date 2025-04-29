document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('secureForm');
    const successMessage = document.getElementById('successMessage');

    // Listen for form submit
    form.addEventListener('submit', validateForm);

    // Fallback for button click
    document.getElementById('submitBtn').addEventListener('click', function (event) {
        validateForm(event);
    });

    function validateForm(event) {
        event.preventDefault();

        // Hide all previous error messages
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.style.display = 'none';
        });

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        let isValid = true;

        // First name validation
        if (firstName === '') {
            document.getElementById('firstNameError').style.display = 'block';
            isValid = false;
        }

        // Last name validation
        if (lastName === '') {
            document.getElementById('lastNameError').style.display = 'block';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        // Password length check
        if (password.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }

        // Confirm password empty
        if (confirmPassword === '') {
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }

        // Password mismatch check
        if (password !== confirmPassword) {
            document.getElementById('passwordMismatchError').style.display = 'block';
            isValid = false;

            console.log("Password does not match");
            return "Password does not match";
        } else {
            document.getElementById('passwordMismatchError').style.display = 'none';
        }

        // If all validations passed
        if (isValid) {
            const sanitizedFirstName = sanitizeInput(firstName);
            const sanitizedLastName = sanitizeInput(lastName);
            const sanitizedEmail = sanitizeInput(email);

            successMessage.style.display = 'block';
            form.reset();

            console.log({
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email: sanitizedEmail,
            });

            console.log("Form submitted successfully!");
            return true;
        }

        return false;
    }

    // Sanitize user input
    function sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    // Escape output if rendering user input (unused but secure practice)
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Simulated secure SQL query usage
    function secureSQLQuery(param) {
        console.log("Using secure parameterized query with:", param);
        return "Successfully executed secure query";
    }
});