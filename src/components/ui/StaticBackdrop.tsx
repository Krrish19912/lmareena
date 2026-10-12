/** Shown instead of the 3D scene when WebGL is unavailable. */
export function StaticBackdrop() {
  return (
    <div className="static-backdrop" aria-hidden>
      <div className="static-backdrop__orb static-backdrop__orb--a" />
      <div className="static-backdrop__orb static-backdrop__orb--b" />
    </div>
  );
}
