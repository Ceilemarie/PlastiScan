// Scroll Animation for Instructions - Alternating Left/Right
document.addEventListener('DOMContentLoaded', function() {
  
  // Get all instruction items
  const instructionItems = document.querySelectorAll('#instructions li');
  const instructionsSection = document.querySelector('#instructions');
  
  console.log('Found', instructionItems.length, 'instruction items'); // Debug
  
  function animateInstructions() {
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
     
      setTimeout(() => {
        resetInstructions();
        setTimeout(() => {
          animateInstructions();
        }, 100);
      }, 800);
    });
  }
  
});