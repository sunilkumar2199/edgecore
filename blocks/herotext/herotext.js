import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  console.log("Block = " + block);
  const wrapper = block.querySelector('div > div');
  if (!wrapper) return;

  const paragraphs = wrapper.querySelectorAll('p');

  if (paragraphs.length > 0) {
    const heading = document.createElement('h1');
    heading.innerHTML = paragraphs[0].innerHTML;

    wrapper.replaceChild(heading, paragraphs[0]);
  }
}
