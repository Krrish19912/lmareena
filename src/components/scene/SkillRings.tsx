import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { skills } from '../../data/portfolio';
import { scroll } from '../../lib/scrollStore';

const RING_RADII = [1.5, 2.25, 3.0];
const RING_SPEEDS = [0.35, -0.22, 0.16];
const RING_TILTS = [0.25, -0.55, 0.9];

function OrbitLine({ radius, color }: { radius: number; color: string }) {
  const obj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22 });
    return new THREE.LineLoop(geo, mat);
  }, [radius, color]);
  return <primitive object={obj} />;
}

/** Three concentric orbits carrying the skill nodes, shown during the Skills section. */
export function SkillRings() {
  const group = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);
  const isWide = useThree((s) => s.size.width > 900);

  const rings = useMemo(
    () =>
      [0, 1, 2].map((r) => skills.filter((s) => s.ring === r)),
    [],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = scroll.progress;
    const show = isWide
      ? THREE.MathUtils.smoothstep(p, 0.2, 0.34) * (1 - THREE.MathUtils.smoothstep(p, 0.6, 0.72))
      : 0;
    g.visible = show > 0.01;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 0.22 + show * 0.3, 5, dt));
    g.position.x = THREE.MathUtils.damp(g.position.x, -3.4, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, -0.6 + (1 - show) * 1.5, 3, dt);
    ringRefs.current.forEach((r, i) => {
      if (r) r.rotation.y += dt * RING_SPEEDS[i];
    });
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <group ref={group} rotation-x={0.9} visible={false}>
      {RING_RADII.map((radius, i) => (
        <group key={i} rotation-x={RING_TILTS[i]} ref={(el) => { ringRefs.current[i] = el; }}>
          <OrbitLine radius={radius} color={['#22d3ee', '#a78bfa', '#a3e635'][i]} />
          {rings[i].map((s, j) => {
            const a = (j / Math.max(rings[i].length, 1)) * Math.PI * 2;
            return (
              <mesh key={s.name} position={[Math.cos(a) * RING_RADII[i], 0, Math.sin(a) * RING_RADII[i]]}>
                <sphereGeometry args={[0.09 + (s.level / 100) * 0.07, 24, 24]} />
                <meshBasicMaterial color={s.color} toneMapped={false} />
              </mesh>
            );
          })}
        </group>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}
