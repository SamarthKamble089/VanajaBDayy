document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Set the secret PIN here!
    // ==========================================
    const CORRECT_PIN = "2553";

    // --- LOGIN LOGIC ---
    const loginPage = document.getElementById('loginPage');
    const birthdayPage = document.getElementById('birthdayPage');
    const unlockBtn = document.getElementById('unlockBtn');
    const pinInput = document.getElementById('pinInput');
    const errorMessage = document.getElementById('errorMessage');
    const loginCard = loginPage.querySelector('.card');

    function checkPin() {
        if (pinInput.value === CORRECT_PIN) {
            // Success! Fade out login and show birthday card
            loginPage.classList.remove('active');
            setTimeout(() => {
                birthdayPage.classList.add('active');
                // Optional: Throw some confetti immediately upon entering
                for (let i = 0; i < 40; i++) {
                    createConfetti();
                }
            }, 50);
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


    // --- CONFETTI LOGIC ---
    const celebrateBtn = document.getElementById('celebrateBtn');
    const container = document.getElementById('confetti-container');

    // Vibrant confetti colors
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9f43', '#54a0ff', '#e056fd'];

    celebrateBtn.addEventListener('click', () => {
        // Create confetti burst (100 pieces)
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }

        // Button interaction effect
        celebrateBtn.textContent = "Yay! 🎊";
        setTimeout(() => {
            celebrateBtn.textContent = "Let's Celebrate! 🎉";
        }, 2000);
    });

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random properties for each confetti piece
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100 + 'vw';
        const animationDuration = Math.random() * 3 + 2 + 's';
        const delay = Math.random() * 0.5 + 's';

        confetti.style.backgroundColor = color;
        confetti.style.left = left;
        confetti.style.top = '-10px';

        // Randomly make some confetti circular
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        // Generate dynamic keyframes for random falling paths
        const animationName = `fall-${Math.random().toString(36).substr(2, 9)}`;
        const endTranslateY = window.innerHeight + 100;
        const randomX = (Math.random() - 0.5) * 300; // Spread horizontally

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes ${animationName} {
                0% { 
                    transform: translate(0, 0) rotate(0deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translate(${randomX}px, ${endTranslateY}px) rotate(${Math.random() * 360 * 5}deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);

        confetti.style.animation = `${animationName} ${animationDuration} ease-in ${delay} forwards`;

        container.appendChild(confetti);

        // Cleanup DOM after animation completes
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, parseFloat(animationDuration) * 1000 + parseFloat(delay) * 1000);
    }
});
