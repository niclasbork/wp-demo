document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.wp-block-demo-theme-demo-contact-form-block .demo-contact-form');

    forms.forEach(form => {
        const block = form.closest('.wp-block-demo-theme-demo-contact-form-block');
        const toEmail = block.dataset.toEmail;
        const successMessage = block.dataset.successMessage;
        const errorMessage = block.dataset.errorMessage;
        const messageDiv = form.querySelector('.form-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            messageDiv.textContent = '';
            messageDiv.classList.remove('success', 'error');

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                toEmail: toEmail // Pass the recipient email from block attributes
            };

            // Basic client-side validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                messageDiv.textContent = 'Please fill in all fields.';
                messageDiv.classList.add('error');
                return;
            }

            try {
                const response = await fetch(wpApiSettings.root + 'demo-theme/v1/submit-contact-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': wpApiSettings.nonce // For authenticated requests
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    messageDiv.textContent = successMessage;
                    messageDiv.classList.add('success');
                    form.reset();
                } else {
                    messageDiv.textContent = errorMessage + (result.message ? ` (${result.message})` : '');
                    messageDiv.classList.add('error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                messageDiv.textContent = errorMessage + ` (${error.message})`;
                messageDiv.classList.add('error');
            }
        });
    });
});