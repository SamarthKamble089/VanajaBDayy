document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Set the secret PIN here!
    // ==========================================
    const CORRECT_PIN = "12072007";

    // --- LOGIN LOGIC ---
    const loginPage = document.getElementById('loginPage');
    const unlockBtn = document.getElementById('unlockBtn');
    const pinInput = document.getElementById('pinInput');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loginPage) {
        const loginCard = loginPage.querySelector('.card');

    function checkPin() {
        if (pinInput.value === CORRECT_PIN) {
            // Success! Redirect to main page
            window.location.href = 'main.html';
        } else {
            // Fail! Show error message and shake the card
            errorMessage.classList.add('visible');
            loginCard.classList.add('shake');
            pinInput.value = ''; // clear input

            // Remove shake class so it can happen again next time
            setTimeout(() => {
                loginCard.classList.remove('shake');
            }, 500);

            // Hide error message after a few seconds
            setTimeout(() => {
                errorMessage.classList.remove('visible');
            }, 3000);
        }
    }

        unlockBtn.addEventListener('click', checkPin);

        // Allow pressing "Enter" on keyboard to submit PIN
        pinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPin();
            }
        });
    }

    // --- CONFETTI LOGIC REMOVED ---
});
