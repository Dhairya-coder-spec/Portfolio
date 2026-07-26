
const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevents page reload/redirect

    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Clear all form fields
            form.reset();

            // Show success feedback
            statusMsg.style.display = 'block';
            statusMsg.style.color = '#7EE787'; // Accent 2 (Green)
            statusMsg.innerText = 'Message sent successfully!';
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        statusMsg.style.display = 'block';
        statusMsg.style.color = '#F0883E'; // Attention (Orange/Red)
        statusMsg.innerText = 'Oops! There was a problem sending your message.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Message';

        // Hide status message after 5 seconds
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 5000);
    }
});
