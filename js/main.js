// Simple form message (placeholder)
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
});

function openPreview(url) {
  document.getElementById("previewFrame").src = url;
  document.getElementById("previewModal").style.display = "block";
}

function closePreview() {
  document.getElementById("previewFrame").src = "";
  document.getElementById("previewModal").style.display = "none";
}

// ===========================
// HAMBURGER MENU FIX
// ===========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking a link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

}


const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you! Your message has been received. We will contact you shortly.");
    form.reset();
  });
}

/* ===== NOVA PARTICLE + SHOOTING STAR SYSTEM ===== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let shootingStars = [];

// Nova palette
const colors = [
  "rgba(123, 47, 247, OPACITY)",   // Purple
  "rgba(255, 60, 172, OPACITY)",   // Pink
  "rgba(0, 198, 255, OPACITY)"     // Blue
];

/* ================= PARTICLES ================= */

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.6 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;

    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    this.color = baseColor.replace("OPACITY", this.opacity);
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ================= SHOOTING STARS ================= */

class ShootingStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height / 2;
    this.length = Math.random() * 120 + 80;
    this.speed = Math.random() * 10 + 6;
    this.angle = Math.PI / 4; // diagonal
    this.opacity = 1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.02;
  }

  draw() {
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    ctx.stroke();
  }
}

/* ================= INIT ================= */

function initParticles() {
  particlesArray = [];
  let numberOfParticles = window.innerWidth < 768 ? 60 : 140;

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Particles
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  // Shooting stars
  shootingStars.forEach((star, index) => {
    star.update();
    star.draw();

    if (star.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

/* Spawn shooting star occasionally */
setInterval(() => {
  if (Math.random() < 0.5) { // 50% chance every interval
    shootingStars.push(new ShootingStar());
  }
}, 4000); // every 4 seconds

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();

function toggleCompare() {
  const table = document.getElementById("comparisonTable");
  const button = document.querySelector(".compare-toggle button");

  table.classList.toggle("hidden");

  if (!table.classList.contains("hidden")) {
    button.textContent = "Hide Comparison";
    table.scrollIntoView({ behavior: "smooth" });
  } else {
    button.textContent = "Compare All Features";
  }
}



function payWithPaystack(amount){
  let handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',
    email: 'customer@email.com',
    amount: amount,
    currency: "ZAR",
    callback: function(response){
      alert('Payment successful!');
    }
  });
  handler.openIframe();
}


