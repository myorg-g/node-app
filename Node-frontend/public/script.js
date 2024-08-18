document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const messageElement = document.getElementById('message');
    const toggleFormButton = document.getElementById('toggleForm');
    const forgotPasscodeLink = document.getElementById('forgotPasscodeLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');
    const usernameField = document.getElementById('username-field');
    const registrationSection = document.getElementById('registrationSection');
    const forgotPasscodeSection = document.getElementById('forgotPasscodeSection');
    const resetPasscodeSection = document.getElementById('resetPasscodeSection');
    const forgotPasscodeContainer = document.getElementById('forgotPasscodeContainer');
    let isLogin = false;

    // Toggle between Register and Login
    toggleFormButton.addEventListener('click', () => {
        isLogin = !isLogin;
        if (isLogin) {
            formTitle.textContent = 'Login';
            submitButton.textContent = 'Login';
            toggleFormButton.textContent = 'Switch to Register';
            usernameField.style.display = 'none';
            forgotPasscodeContainer.style.display = 'block';
        } else {
            formTitle.textContent = 'Register';
            submitButton.textContent = 'Register';
            toggleFormButton.textContent = 'Switch to Login';
            usernameField.style.display = 'block';
            forgotPasscodeContainer.style.display = 'none';
        }
    });

    // Show Forgot Passcode form
    forgotPasscodeLink.addEventListener('click', (e) => {
        e.preventDefault();
        registrationSection.style.display = 'none';
        forgotPasscodeSection.style.display = 'block';
    });

    // Go back to Login form from Forgot Passcode form
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasscodeSection.style.display = 'none';
        registrationSection.style.display = 'block';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        let endpoint = '/register';
        if (isLogin) {
            endpoint = '/login';
        } else {
            data.username = formData.get('username');
        }

        try {
            const response = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                messageElement.textContent = isLogin ? 'Login successful!' : 'Registration successful!';
                messageElement.style.color = 'green';
            } else {
                const error = await response.json();
                messageElement.textContent = `Error: ${error.message}`;
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'An error occurred!';
            messageElement.style.color = 'red';
        }
    });

    // Handle Forgot Passcode form submission
    const forgotPasscodeForm = document.getElementById('forgotPasscodeForm');
    forgotPasscodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(forgotPasscodeForm);
        const data = {
            email: formData.get('email'),
        };

        try {
            const response = await fetch('/forgot-passcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageElement.textContent = 'Reset link sent to your email!';
                messageElement.style.color = 'green';

                setTimeout(() => {
                    resetPasscodeSection.style.display = 'block';
                    forgotPasscodeSection.style.display = 'none';
                }, 5000);
            } else {
                const error = await response.json();
                messageElement.textContent = `Error: ${error.message}`;
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'An error occurred!';
            messageElement.style.color = 'red';
        }
    });
});
