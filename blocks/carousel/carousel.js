export default function decorate(block) {
  block.classList.add('carousel');

  // Create wrapper elements
  const container = document.createElement('div');
  container.className = 'carousel__container';

  const track = document.createElement('div');
  track.className = 'carousel__track';

  // Extract heading (first row)
  const firstRow = block.querySelector(':scope > div:first-child');
  let heading;
  if (firstRow) {
    heading = document.createElement('p');
    heading.className = 'carousel__heading';
    heading.textContent = firstRow.textContent.trim();
    firstRow.remove();
  }

  // Process logo rows
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const item = document.createElement('div');
      item.className = 'carousel__item';

      const img = col.querySelector('img');
      if (img) {
        img.classList.add('carousel__logo');
        item.appendChild(img);
      } else {
        item.textContent = col.textContent.trim();
      }

      track.appendChild(item);
    });
    row.remove();
  });

  // Controls
  const controls = document.createElement('div');
  controls.className = 'carousel__controls';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'carousel__toggle';
  toggleBtn.setAttribute('aria-label', 'Pause carousel');
  toggleBtn.textContent = '❚❚';

  controls.appendChild(toggleBtn);

  // Assemble
  container.appendChild(track);
  block.appendChild(heading);
  block.appendChild(container);
  block.appendChild(controls);

  // Auto-scroll logic
  let isPlaying = true;
  let scrollAmount = 0;

  function autoScroll() {
    if (!isPlaying) return;
    scrollAmount += 0.3;
    track.style.transform = `translateX(-${scrollAmount}px)`;

    // Loop effect
    if (scrollAmount > track.scrollWidth / 2) {
      scrollAmount = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  toggleBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    toggleBtn.textContent = isPlaying ? '❚❚' : '▶';
    toggleBtn.setAttribute(
      'aria-label',
      isPlaying ? 'Pause carousel' : 'Play carousel'
    );
    if (isPlaying) autoScroll();
  });
}
