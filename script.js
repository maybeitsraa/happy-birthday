const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 100;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size *= 0.98;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFirework(x, y) {
    const colors = ['#ff6b6b', '#ffa502', '#3742fa', '#2ed573', '#ff4757'];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();

// Trigger fireworks randomly or on click
setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
}, 2000);

canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

// Letter interaction
const letter = document.getElementById('letter');
const message = document.getElementById('message');

letter.addEventListener('click', () => {
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000); // Hide after 5 seconds
});