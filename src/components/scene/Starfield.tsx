import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { STARS_VERT, STARS_FRAG } from './shaders';
import { pointer, scroll } from '../../lib/scrollStore';

/** GPU-animated starfield: stars stream toward the camera; speed follows scroll velocity. */
export function Starfield({ count = 2600 }: { count?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 44;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPixelRatio: { value: dpr },
      uSize: { value: 0.09 },
    }),
    [dpr],
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uSpeed.value = THREE.MathUtils.clamp(Math.abs(scroll.velocity) * 0.5, 0, 1.5);
    (m.uniforms.uPointer.value as THREE.Vector2).set(pointer.x, pointer.y);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={STARS_VERT}
        fragmentShader={STARS_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
