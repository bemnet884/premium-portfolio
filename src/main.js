import './style.css'
import { initThreeJSBackground, initAbout3D } from './threeBg.js';

document.addEventListener("DOMContentLoaded", () => {
  initThreeJSBackground();
  initAbout3D();

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-up").forEach((el) => {
    observer.observe(el);
  });

  // Auto-scrolling project grid logic
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    let isHovered = false;
    let scrollSpeed = 1; // Increase for faster scroll

    // Pause functionality on hover
    projectGrid.addEventListener('mouseenter', () => isHovered = true);
    projectGrid.addEventListener('mouseleave', () => isHovered = false);
    
    // Pause functionality for touch screens
    projectGrid.addEventListener('touchstart', () => isHovered = true);
    projectGrid.addEventListener('touchend', () => { setTimeout(() => { isHovered = false; }, 1000) });

    const autoScroll = () => {
      if (!isHovered) {
        projectGrid.scrollLeft += scrollSpeed;
        
        // Loop mechanism: if scrolled to the end, instantly snap back to the beginning to loop
        if (projectGrid.scrollLeft >= projectGrid.scrollWidth - projectGrid.clientWidth - 1) {
          projectGrid.scrollLeft = 0;
        }
      }
      requestAnimationFrame(autoScroll);
    };

    // Initialize animation loop
    requestAnimationFrame(autoScroll);
  }

  // Deep-Dive Modal Logic
  const modal = document.getElementById('case-study-modal');
  const closeBtn = modal?.querySelector('.close-btn');
  const cards = document.querySelectorAll('.project-card');

  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modal.close();
      }
    });

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const tags = Array.from(card.querySelectorAll('.project-tags span')).map(s => s.innerText).join(' • ');
        
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-tags').innerText = tags;
        
        // Mocking dynamic deep-dive text based on title / tags for simplicity, 
        // in production these would map to a JSON manifest.
        document.getElementById('modal-challenge').innerText = `Building a scalable infrastructure for the ${title} platform required solving complex data-sync constraints while maintaining ultra-low latency for users across diverse networks. The primary objective was maintaining 99.9% uptime without breaking state.`;
        document.getElementById('modal-solution').innerText = `I leveraged ${tags} to spin up a fully typed backend API, utilizing optimized queries for fast resolution. The frontend was built with strict component boundaries to prevent excessive re-renders.`;
        document.getElementById('modal-arch').innerText = `The architecture relies on isolated context bounds for local state management, coupled with RESTful endpoints deployed securely via modern CI/CD pipelines. This ensures rapid iteration cycles.`;
        
        modal.showModal();
        
        // Prevent body scroll behind modal
        document.body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  }
});

