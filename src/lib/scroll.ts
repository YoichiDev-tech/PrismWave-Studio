export function scrollToSection(id: string, duration = 420): void {
  const target = document.getElementById(id);
  if (!target) return;

  const start = window.scrollY;
  // Honor the section's scroll-margin-top so the fixed nav doesn't cover it
  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const distance = target.getBoundingClientRect().top - offset;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
