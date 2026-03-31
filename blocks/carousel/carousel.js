export default function decorate(block) {
  block.classList.add('carousel');

  const container = document.createElement('div');
  container.className = 'carousel__container';

  const track = document.createElement('div');
  track.className = 'carousel__track';

  // Heading
  const firstRow = block.querySelector(':scope > div:first-child');
  let heading;
  if (firstRow) {
    heading = document.createElement('p');
    heading.className = 'carousel__heading';
    heading.textContent = firstRow.textContent.trim();
    firstRow.remove();
  }

  // Build items
  const items = [];
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const item = document.createElement('div');
      item.className = 'carousel__item';

      const img = col.querySelector('img');
      if (img) {
        img.classList.add('carousel__logo');
        item.appendChild(img);
      }

      track.appendChild(item);
      items.push(item.cloneNode(true)); // store clone
    });
    row.remove();
  });

  // 🔥 Duplicate items for seamless loop
  items.forEach((clone) => {
    track.appendChild(clone);
  });

  // Controls
  const controls = document.createElement('div');
  controls.className = 'carousel__controls';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'carousel__toggle';
  toggleBtn.textContent = '❚❚';

  controls.appendChild(toggleBtn);

  // Assemble
  container.appendChild(track);
  block.appendChild(heading);
  block.appendChild(container);
  block.appendChild(controls);

  // Animation
  let isPlaying = true;
  let scrollX = 0;
  const speed = 0.5;

  function animate() {
    if (isPlaying) {
      scrollX += speed;

      // Reset at half (because we duplicated content)
      if (scrollX >= track.scrollWidth / 2) {
        scrollX = 0;
      }

      track.style.transform = `translateX(-${scrollX}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Toggle Play/Pause
  toggleBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    toggleBtn.textContent = isPlaying ? '❚❚' : '▶';
  });
}
