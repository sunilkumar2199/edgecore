import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  console.log("Block = " + block.innerHTML);
  const inner = block.querySelector('div > div');
  if (!inner) return;

  const paragraphs = inner.querySelectorAll('p');
  if (!paragraphs.length) return;

  // Create container
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  paragraphs.forEach((p, index) => {
    if (index === 0) {
      // First paragraph → H1
      const h1 = document.createElement('h1');
      h1.innerHTML = p.innerHTML;
      h1.className = 'hero-title';
      heroContent.appendChild(h1);
    } else {
      // Remaining → description
      p.classList.add('hero-description');
      heroContent.appendChild(p);
    }
  });

  // Replace entire block content
  block.replaceChildren(heroContent);
}
