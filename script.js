// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor grows on hover
document.querySelectorAll('a, button, .role-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width = '48px';
    follower.style.height = '48px';
    follower.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '28px';
    follower.style.height = '28px';
    follower.style.opacity = '0.6';
  });
});

// ===========================
// NAV SCROLL
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// MOBILE NAV
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Check for siblings to stagger
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      const delay = entry.target.style.getPropertyValue('--delay') || (idx * 80) + 'ms';

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseFloat(delay) * 1000 || idx * 80);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--charcoal)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// PIP ANIMATION ON SCROLL
// ===========================
const pipObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pips = entry.target.querySelectorAll('.pip.on');
      pips.forEach((pip, i) => {
        pip.style.background = 'transparent';
        pip.style.borderColor = 'rgba(201,168,76,0.3)';
        setTimeout(() => {
          pip.style.background = 'var(--gold)';
          pip.style.borderColor = 'var(--gold)';
        }, i * 120 + 300);
      });
      pipObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-row').forEach(row => {
  // Reset pips initially
  row.querySelectorAll('.pip.on').forEach(pip => {
    pip.style.background = 'transparent';
    pip.style.borderColor = 'rgba(201,168,76,0.3)';
  });
  pipObserver.observe(row);
});
