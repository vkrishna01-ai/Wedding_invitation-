'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import GaneshPlane from './GaneshPlane'
import GoldenParticles from './GoldenParticles'
import DivineMandalaRing from './DivineMandalaRing'
import FloatingPetals from './FloatingPetals'

/**
 * Complete 3D Ganesh scene with divine aura effects.
 * Renders the Ganesh image as a 3D plane surrounded by
 * golden particles, mandala rings, and floating petals.
 */
export default function GaneshScene() {
  return (
    <div className="ganesh-scene-container">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Ambient light for base visibility */}
          <ambientLight intensity={0.6} />

          {/* Warm directional light from above — like divine light */}
          <directionalLight
            position={[0, 3, 2]}
            intensity={0.8}
            color="#FFF8E7"
          />

          {/* Point light behind for rim/back-glow */}
          <pointLight
            position={[0, 0.5, -1]}
            intensity={1.2}
            color="#D4AF37"
            distance={5}
          />

          {/* The Ganesh image as a 3D plane */}
          <GaneshPlane />

          {/* Golden mandala halo ring behind Ganesh */}
          <DivineMandalaRing />

          {/* Orbiting golden particles */}
          <GoldenParticles count={100} />

          {/* Drifting marigold-inspired petals */}
          <FloatingPetals count={16} />
        </Suspense>
      </Canvas>
    </div>
  )
}
