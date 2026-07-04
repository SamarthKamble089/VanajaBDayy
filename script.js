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

    // --- MAIN PAGE LOGIC ---
    const imageCols = document.querySelectorAll('.image-col');
    if (imageCols.length > 0) {
        imageCols.forEach(col => {
            col.addEventListener('click', () => {
                // Toggle 'active' class on the parent '.row'
                const row = col.closest('.row');
                if (row) {
                    row.classList.toggle('active');
                }
            });
        });
    }

    // --- POEM LOGIC ---
    const poemCard = document.getElementById('poemCard');
    const poemUnlockBtn = document.getElementById('poemUnlockBtn');
    const poemPinInput = document.getElementById('poemPinInput');
    const poemErrorMessage = document.getElementById('poemErrorMessage');
    const poemLockView = document.getElementById('poemLockView');
    const poemUnlockedView = document.getElementById('poemUnlockedView');

    // You can set your desired poem password here
    const POEM_PASSWORD = "hartie";

    if (poemCard) {
        function checkPoemPin() {
            let inputVal = poemPinInput.value;
            // Only consider the first 6 characters and convert to lower case
            let processedInput = inputVal.substring(0, 6).toLowerCase();
            let targetPassword = POEM_PASSWORD.substring(0, 6).toLowerCase();

            if (processedInput === targetPassword && processedInput.length > 0) {
                // Success! Unlock poem
                poemLockView.style.display = 'none';
                poemUnlockedView.style.display = 'block';
            } else {
                // Fail! Show error message and shake the card
                poemErrorMessage.classList.add('visible');
                poemCard.classList.add('shake');
                poemPinInput.value = ''; // clear input

                // Remove shake class so it can happen again next time
                setTimeout(() => {
                    poemCard.classList.remove('shake');
                }, 500);

                // Hide error message after a few seconds
                setTimeout(() => {
                    poemErrorMessage.classList.remove('visible');
                }, 3000);
            }
        }

        poemUnlockBtn.addEventListener('click', checkPoemPin);

        // Allow pressing "Enter" on keyboard to submit password
        poemPinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPoemPin();
            }
        });
    }
});
