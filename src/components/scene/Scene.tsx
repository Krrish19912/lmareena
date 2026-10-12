import { Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { MorphCore } from './MorphCore';
import { Starfield } from './Starfield';
import { GridFloor } from './GridFloor';
import { SkillRings } from './SkillRings';
import { scroll, stepStores } from '../../lib/scrollStore';

/** Advances shared store values once per frame and gently dollies the camera with scroll. */
function Rig() {
  useFrame((state, dt) => {
    stepStores(Math.min(dt, 0.05));
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 8 - scroll.progress * 1.6, 3, dt);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 0.35, 2, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, state.pointer.y * 0.2, 2, dt);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene({ reducedMotion, quality = 'high' }: { reducedMotion: boolean; quality?: 'high' | 'low' }) {
  const aberration = useMemo(() => new THREE.Vector2(0.0009, 0.0012), []);
  const isLow = quality === 'low';

  return (
    <Canvas
      className="scene-canvas"
      dpr={isLow ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 200 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Rig />
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 3, 4]} intensity={18} color="#22d3ee" distance={18} />
        <pointLight position={[-4, -2, 3]} intensity={14} color="#a78bfa" distance={18} />
        <Starfield count={isLow ? 900 : 2600} />
        <GridFloor />
        <MorphCore reducedMotion={reducedMotion} />
        <SkillRings />
        {!isLow && (
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom intensity={reducedMotion ? 0.6 : 1.15} luminanceThreshold={0.25} luminanceSmoothing={0.2} mipmapBlur />
            <ChromaticAberration offset={aberration} />
            <Noise premultiply opacity={0.06} />
            <Vignette eskil={false} offset={0.25} darkness={0.7} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
