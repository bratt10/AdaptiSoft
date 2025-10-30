// ========== CURSOR PERSONALIZADO ==========
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smooth cursor movement
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  dotX += (mouseX - dotX) * 0.3;
  dotY += (mouseY - dotY) * 0.3;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .service-card, .floating-card, .footer-logo').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorDot.style.transform = 'scale(2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorDot.style.transform = 'scale(1)';
  });
});

// ========== PARTÍCULAS ANIMADAS ==========
const particlesContainer = document.getElementById('particles');
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
  
  // Colores alternados
  if (Math.random() > 0.5) {
    particle.style.background = 'rgba(39, 174, 96, 0.6)';
  }
  
  particlesContainer.appendChild(particle);
}

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 120;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== INDICADOR DE PROGRESO DE SCROLL ==========
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-indicator').style.width = scrolled + '%';
});

// ========== NAVEGACIÓN ACTIVA AL HACER SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ========== ANIMACIÓN DE ENTRADA (SCROLL OBSERVER) ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

// Observar elementos con data-aos
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// ========== EFECTO PARALLAX EN HERO ==========
const heroContent = document.querySelector('.hero-content');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  if (scrolled < window.innerHeight) {
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / 600);
    }
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// ========== HEADER CON EFECTO AL SCROLL ==========
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.top = currentScroll > lastScroll ? '-100px' : '10px';
    header.style.boxShadow = '0 15px 60px rgba(0, 0, 0, 0.7)';
  } else {
    header.style.top = '20px';
  }
  
  lastScroll = currentScroll;
});

// ========== ANIMACIÓN 3D EN TARJETAS DE SERVICIO ==========
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.03)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ========== ANIMACIÓN DE FORMULARIO ==========
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Efecto al enviar formulario
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    const button = form.querySelector('.btn-submit');
    const buttonText = button.querySelector('span:first-child');
    
    buttonText.textContent = 'Enviando...';
    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    // El formulario se enviará normalmente a FormSubmit
  });
}

// ========== EFECTO DE RIPPLE AL HACER CLIC ==========
document.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(230, 126, 34, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    left: ${e.clientX - 15}px;
    top: ${e.clientY - 15}px;
    animation: rippleEffect 0.8s ease-out;
  `;
  document.body.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 800);
});

// Keyframe para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ========== FLOATING CARDS CON ANIMACIÓN MEJORADA ==========
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    card.style.animationPlayState = 'paused';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.animationPlayState = 'running';
  });
});

// ========== PARTÍCULAS INTERACTIVAS AL MOVER EL MOUSE ==========
document.addEventListener('mousemove', (e) => {
  // Crear partículas ocasionales al mover el mouse
  if (Math.random() > 0.95) {
    createMouseParticle(e.clientX, e.clientY);
  }
});

function createMouseParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: rgba(230, 126, 34, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    left: ${x}px;
    top: ${y}px;
    animation: fadeOut 1s ease-out forwards;
  `;
  document.body.appendChild(particle);
  
  setTimeout(() => particle.remove(), 1000);
}

const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes fadeOut {
    to {
      transform: translateY(-50px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(fadeOutStyle);

// ========== ANIMACIÓN ESPECIAL PARA EL LOGO DEL FOOTER ==========
const footerLogo = document.querySelector('.footer-logo');

if (footerLogo) {
  // Efecto de rotación suave al hacer hover prolongado
  let hoverTimeout;
  
  footerLogo.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(() => {
      footerLogo.style.transition = 'all 2s ease';
      footerLogo.style.transform = 'scale(1.15) rotate(360deg)';
    }, 500);
  });
  
  footerLogo.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    footerLogo.style.transition = 'all 0.4s ease';
    footerLogo.style.transform = 'scale(1) rotate(0deg)';
  });
}

// ========== EFECTO DE CARGA INICIAL ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
  }, 100);
  
  // Mensaje de consola
  console.log('%c🚀 AdaptiSoft - Sitio Cargado Exitosamente! ', 
    'background: linear-gradient(90deg, #e67e22, #27ae60); color: white; font-size: 16px; font-weight: bold; padding: 10px;'
  );
});

// ========== PREVENIR COMPORTAMIENTO POR DEFECTO EN MÓVILES ==========
if ('ontouchstart' in window) {
  document.body.style.cursor = 'auto';
  if (cursor) cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
}

// ========== PERFORMANCE: REDUCIR ANIMACIONES EN DISPOSITIVOS LENTOS ==========
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.querySelectorAll('.particle').forEach(particle => {
    if (Math.random() > 0.5) {
      particle.remove();
    }
  });
}

// ========== EASTER EGG: MODO NEÓN (CLICK EN LOGO DEL FOOTER) ==========
let clickCount = 0;
const footerLogoEasterEgg = document.querySelector('.footer-logo');

if (footerLogoEasterEgg) {
  footerLogoEasterEgg.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => {
        document.body.style.filter = 'none';
        clickCount = 0;
      }, 3000);
      
      console.log('%c✨ MODO NEÓN ACTIVADO! ✨', 
        'background: linear-gradient(90deg, #ff00ff, #00ffff); color: white; font-size: 20px; font-weight: bold; padding: 15px;'
      );
    }
  });
}

// ========== SMOOTH SCROLL PARA SAFARI ==========
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

console.log('✨ Todas las animaciones cargadas correctamente!');