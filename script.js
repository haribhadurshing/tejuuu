// Custom Cursor following and trailing effect
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
let speed = 0.15;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    ballX = ballX + (distX * speed);
    ballY = ballY + (distY * speed);

    cursor.style.left = ballX + 'px';
    cursor.style.top = ballY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Click sparks effect
document.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
        createSpark(e.clientX, e.clientY);
    }
});

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    const size = Math.random() * 10 + 5;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--color', ['#ff0080', '#ff8a00', '#7928ca', '#fff'][Math.floor(Math.random() * 4)]);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;

    gsap.to(spark, {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        opacity: 0,
        rotation: 360,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => spark.remove()
    });
}

// Typing effect for greeting
const greetingText = "Hey teju! You're special, you're rare, and you're the most amazing soul! 💖✨";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (greetingElement && charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 70);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕', '🎂', '🎁', '💗', '🍓', '🦋'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '110vh';
    element.style.fontSize = (Math.random() * 30 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -innerHeight - 200,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 720,
        duration: Math.random() * 4 + 4,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Reveal text with a slight stagger/bounce
    gsap.to('h1', {
        opacity: 1,
        duration: 1.5,
        y: 0,
        ease: "elastic.out(1, 0.3)"
    });

    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: 0.5,
        ease: "back.out"
    });

    setTimeout(typeGreeting, 1000);
    setInterval(createFloating, 400);
});

// Extra Interactive: Heading follow mouse slightly
const interactiveTitle = document.querySelector('h1');
document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(interactiveTitle, {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Hover and Click effects for buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.1, duration: 0.3 }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
    button.addEventListener('click', () => {
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => { window.location.href = 'cause.html'; }
        });
    });
});