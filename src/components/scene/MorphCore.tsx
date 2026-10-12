import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CORE_VERT, CORE_SOLID_FRAG, CORE_WIRE_FRAG } from './shaders';
import { pointer, scroll } from '../../lib/scrollStore';

const COLOR_A = new THREE.Color('#22d3ee');
const COLOR_B = new THREE.Color('#a78bfa');

/** Morphing, noise-displaced wireframe core. Reacts to pointer and scroll. */
export function MorphCore({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const solidMat = useRef<THREE.ShaderMaterial>(null);
  const wireMat = useRef<THREE.ShaderMaterial>(null);
  const isWide = useThree((s) => s.size.width > 900);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.25, 28), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoise: { value: 0.32 },
      uPulse: { value: 0 },
      uA: { value: COLOR_A },
      uB: { value: COLOR_B },
    }),
    [],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime * (reducedMotion ? 0.25 : 1);
    if (solidMat.current) solidMat.current.uniforms.uTime.value = t;
    if (wireMat.current) wireMat.current.uniforms.uTime.value = t;
    const pulse = Math.sin(t * 1.4) * 0.03;
    if (solidMat.current) solidMat.current.uniforms.uPulse.value = pulse - 0.02;
    if (wireMat.current) {
      wireMat.current.uniforms.uPulse.value = pulse + 0.04;
      wireMat.current.uniforms.uNoise.value = 0.32 + scroll.velocity * 0.02;
    }

    const g = group.current;
    if (!g) return;
    const p = scroll.progress;
    // Hero: right of the copy on wide screens; centered on mobile.
    const baseX = isWide ? 2.9 : 0;
    const baseY = isWide ? 0 : 1.6;
    const fadeOut = 1 - THREE.MathUtils.smoothstep(p, 0.22, 0.45);
    const shrink = THREE.MathUtils.lerp(1, 0.7, THREE.MathUtils.smoothstep(p, 0.2, 0.6));
    const targetScale = shrink * 0.8 * (0.02 + 0.98 * fadeOut);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 4, dt));
    g.position.x = THREE.MathUtils.damp(g.position.x, baseX + Math.sin(t * 0.3) * 0.08, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, baseY - p * 1.5, 3, dt);
    g.rotation.y += dt * 0.15 + (pointer.x * 0.6 - g.rotation.y) * (1 - Math.exp(-dt * 2)) * 0.02;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.3 + p * 1.2, 3, dt);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={solidMat}
          vertexShader={CORE_VERT}
          fragmentShader={CORE_SOLID_FRAG}
          uniforms={uniforms}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.005}>
        <shaderMaterial
          ref={wireMat}
          vertexShader={CORE_VERT}
          fragmentShader={CORE_WIRE_FRAG}
          uniforms={uniforms}
          wireframe
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
