gsap.registerPlugin(ScrollTrigger);

// 🌌 Fond spatial
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let w, h;

function initStars() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2,
      alpha: Math.random(),
      speed: Math.random() * 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.speed;
    if (s.y > h) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();

// ✨ Animations GSAP
gsap.from(".hero h2", {y: 50, opacity: 0, duration: 1, ease: "power3.out"});
gsap.from(".hero p", {y: 30, opacity: 0, duration: 1, delay: 0.3});
gsap.from(".hero .btn", {scale: 0.8, opacity: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.7)"});

gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: { trigger: card, start: "top 80%" },
    y: 0, opacity: 1, duration: 0.8, delay: i * 0.1
  });
});

gsap.utils.toArray("h2").forEach(title => {
  gsap.from(title, {
    scrollTrigger: { trigger: title, start: "top 90%", scrub: true },
    y: 50, opacity: 0.5
  });
});

// 🎵 Musique
const playMusicBtn = document.getElementById('playMusic');
const bgMusic = document.getElementById('bg-music');
playMusicBtn.addEventListener('click', () => {
  bgMusic.play();
  playMusicBtn.textContent = "🎵 Musique activée";
  playMusicBtn.disabled = true;
});
