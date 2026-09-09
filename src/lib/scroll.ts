export function scrollToSection(id: string, duration = 420): void {
  const target = document.getElementById(id);
  if (!target) return;

  const start = window.scrollY;
  const distance = target.getBoundingClientRect().top;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
