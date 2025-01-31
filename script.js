const numParticles = 50;
const particles = [];

for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = `${Math.random() * 6 + 4}px`;
    particle.style.height = particle.style.width;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(particle);
    particles.push(particle);
}

document.addEventListener('mousemove', function (e) {
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const attractionRange = 150;

        if (distance < attractionRange) {
            const scale = 1 + (1 - distance / attractionRange) * 1.5;
            particle.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px) scale(${scale})`;
        } else {
            particle.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

const textElement = document.getElementById('changingText');
const textOptions = ["Welcome to My World", "I am Vivaan", "I am a developer", "I am a programmer", "I am a student"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 2000;

function animateText() {
    const currentText = textOptions[textIndex];

    if (isDeleting) {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textOptions.length;
            typingSpeed = 500;
        }
    } else {
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        }
    }

    textElement.textContent = currentText.substring(0, charIndex);
    setTimeout(animateText, isDeleting ? 100 : 200);
}

setTimeout(animateText, typingSpeed);
