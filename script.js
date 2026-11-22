/**
 * L'AMOUR PET SHOP — SCRIPTS DE INTERATIVIDADE, TEMA CLARO/ESCURO E VÍDEO HERO
 * Feito com JavaScript moderno, sem dependências externas e sem emojis.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Alternador Discreto de Modo Claro / Escuro (Theme Toggle)
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const drawerThemeToggle = document.getElementById('drawerThemeToggle');
  const themeTextIndicator = document.querySelector('.theme-text-indicator');

  // Recupera o tema salvo ou usa 'dark' como padrão cinematográfico
  const savedTheme = localStorage.getItem('lamour_theme') || 'dark';
  
  const applyTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('lamour_theme', theme);

    if (themeTextIndicator) {
      themeTextIndicator.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    }

    if (themeToggle) {
      themeToggle.setAttribute('title', theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro');
    }
  };

  applyTheme(savedTheme);

  const toggleTheme = () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (drawerThemeToggle) drawerThemeToggle.addEventListener('click', toggleTheme);

  // 2. Controle de Reprodução do Vídeo na Hero
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startVideoOnInteraction = () => {
          heroVideo.play();
          document.removeEventListener('touchstart', startVideoOnInteraction);
          document.removeEventListener('click', startVideoOnInteraction);
        };
        document.addEventListener('touchstart', startVideoOnInteraction, { once: true });
        document.addEventListener('click', startVideoOnInteraction, { once: true });
      });
    }
  }

  // 3. Menu Mobile Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 4. Mudança de fundo do Header ao rolar a página
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 5. Highlight dos links da navegação de acordo com a seção visível
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-links a');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 6. Scroll Reveal Suave (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 7. Carrossel de Depoimentos Interativo
  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80",
      quote: "\"Único pet shop que não passou medo na July. Somos imensamente agradecidos pelo carinho, paciência e pelos cuidados dedicados a ela. O atendimento vai muito além do padrão!\"",
      name: "Helma Aguiar",
      role: "Tutora da July • Cliente L'AMOUR"
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80",
      quote: "\"Levo o Thor para banho e tosa toda semana. A tosa na tesoura é impecável e o cheirinho dura muito. Melhor pet shop da região norte de Palmas!\"",
      name: "Rodrigo Mendes",
      role: "Tutor do Thor • Golden Retriever"
    },
    {
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80",
      quote: "\"O atendimento para gatos é super delicado. Meu felino sempre voltava estressado de outros lugares, mas na L'AMOUR ele fica calmo e muito bem cuidado.\"",
      name: "Camila Nogueira",
      role: "Tutora do Simba • Gato Persa"
    }
  ];

  const avatarImg = document.querySelector('.testimonial-avatar');
  const quoteEl = document.querySelector('.testimonial-quote');
  const authorNameEl = document.querySelector('.author-name');
  const authorRoleEl = document.querySelector('.author-role');
  const dots = document.querySelectorAll('.testimonial-pagination .dot');

  let currentTestimonialIndex = 0;

  const updateTestimonial = (index) => {
    currentTestimonialIndex = index;
    const t = testimonials[index];

    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      avatarImg.src = t.avatar;
      quoteEl.textContent = t.quote;
      authorNameEl.textContent = t.name;
      authorRoleEl.textContent = t.role;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      quoteEl.style.transition = 'all 0.35s ease';
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 200);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateTestimonial(index);
    });
  });

  setInterval(() => {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(nextIndex);
  }, 7000);
});
