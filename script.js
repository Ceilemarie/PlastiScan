// Scroll Animation for About Us Section
document.addEventListener('DOMContentLoaded', function() {
  
  // About Us Section Animation
  const aboutText = document.querySelector('#about .about-text');
  const aboutImage = document.querySelector('#about .about-image-wrapper');
  const aboutSection = document.querySelector('#about');
  
  const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (aboutText) aboutText.classList.add('visible');
        if (aboutImage) aboutImage.classList.add('visible');
      } else {
        if (aboutText) aboutText.classList.remove('visible');
        if (aboutImage) aboutImage.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px'
  });
  
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
  
  // Scroll Animation for Instructions - Alternating Left/Right
  
  // Get all instruction items
  const instructionItems = document.querySelectorAll('#instructions li');
  const instructionsSection = document.querySelector('#instructions');
  
  // Flag to prevent observer interference during nav click
  let isNavClick = false;
  let animationTimeout = null;
  
  console.log('Found', instructionItems.length, 'instruction items'); // Debug
  
  function animateInstructions() {
    // Clear any pending animation
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
    
    instructionItems.forEach((item, index) => {
      item.classList.remove('visible');
      
      setTimeout(() => {
        item.classList.add('visible');
        console.log('Animating item', index + 1);
      }, index * 200);
    });
  }
  

  function resetInstructions() {
    instructionItems.forEach(item => {
      item.classList.remove('visible');
    });
  }
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      // Don't trigger if nav click is in progress
      if (isNavClick) {
        return;
      }
      
      if (entry.isIntersecting) {
        console.log('Instructions section visible - animating');
        animateInstructions();
      } else {
        console.log('Instructions section hidden - resetting');
        resetInstructions();
      }
    });
  }, observerOptions);
  
  if (instructionsSection) {
    observer.observe(instructionsSection);
  }
  
  
  const instructionsNavLink = document.querySelector('a[href="#instructions"]');
  if (instructionsNavLink) {
    instructionsNavLink.addEventListener('click', function(e) {
      console.log('Instructions nav link clicked');
      
      // Set flag to prevent observer interference
      isNavClick = true;
      resetInstructions();
      
      // Wait for smooth scroll to complete, then animate
      animationTimeout = setTimeout(() => {
        animateInstructions();
        // Reset flag after animation starts
        setTimeout(() => {
          isNavClick = false;
        }, 500);
      }, 1000);
    });
  }
  
});