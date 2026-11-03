document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByTagName("button"));

    buttons.forEach((elem) => {
        elem.addEventListener("click", calculate)
    });

    document.addEventListener("keydown", (event) => {
        let pressedKey = event.key;

        const matchingButton = document.querySelector(`[data-key="${pressedKey}"]`)

        if (matchingButton) {
            event.preventDefault();
            matchingButton.click();
        }
    })

    function calculate(event) {
        const targetElement = event?.currentText || event?.target || this;

        if (targetElement.id === "effect" || targetElement.closest("#effect")) {
            return;
        }

        if (!targetElement) return;

        const value = event.target.getAttribute('data-key') || event.target.innerText;
        let digit = targetElement.id;
        let currentText = display.innerText

        if (digit == 'C') {
            display.innerText = ""
        }
        else if (digit == '←') {
            display.innerText = currentText.slice(0, -1);
        }
        else if (digit == '%') {
            if (currentText != "")
                display.innerText = parseFloat(currentText) / 100
        }
        else if (digit == "=") {
            try {
                display.innerText = eval(currentText);
            }
            catch (error) {
                alert("Invalid Experession");
                display.innerText = "";
            }
        }

        else {
            display.innerText += digit;
        }
    }
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext('2d');
const butterfly = document.getElementById("effect");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const imageURLs = [
    "/assets/bubble.png",
    "/assets/bubble.png",
    "/assets/bubble.png"
]

const preloadImages = imageURLs.map(url => {
    const img = new Image();
    img.src = url;
    return img;
});

let particles = [];

class ConfettiParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = preloadImages[Math.floor(Math.random() * preloadImages.length)];

        this.size = Math.random() * 20 + 20;

        this.SpeedX = Math.random() * 10 - 5;
        this.SpeedY = Math.random() * -10 - 5;

        this.gravity = 0.3;
        this.wind = Math.random() * 0.2 - 0.1;

        this.rotation = Math.random() * 360;
        this.scaleX = 1;
        this.scaleSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
        this.SpeedY += this.gravity;
        this.SpeedX += this.wind;
        this.x += this.SpeedX;
        this.y += this.SpeedY;

        this.scaleX = Math.sin(Date.now() * 0.005 * this.scaleSpeed);
    }

    draw() {
        if (!this.image.complete) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);

        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function triggerConfetti() {
    const rect = butterfly.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    for (let i = 0; i < 50; i++) {
        particles.push(new ConfettiParticle(startX, startY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.y > canvas.height + 50) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

butterfly.addEventListener('click', triggerConfetti);
animate();