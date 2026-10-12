// A tiny mutable store shared between the DOM and the R3F render loop.
// Reading it inside useFrame avoids React re-renders on every scroll/mouse event.
export const pointer = { x: 0, y: 0, tx: 0, ty: 0 }; // normalized -1..1
export const scroll = { progress: 0, velocity: 0, current: 0, target: 0 }; // progress 0..1

export function initScrollStore(): () => void {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scroll.target = max > 0 ? window.scrollY / max : 0;
  };
  const onMove = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('pointermove', onMove);
  };
}

// Called once per frame by the scene: eases values for buttery motion.
export function stepStores(dt: number) {
  const k = 1 - Math.exp(-dt * 6);
  const prev = scroll.current;
  scroll.current += (scroll.target - scroll.current) * k;
  scroll.progress = scroll.current;
  scroll.velocity = (scroll.current - prev) / Math.max(dt, 1e-4);
  pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 4));
  pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 4));
}
