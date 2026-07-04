'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generate dust particle data deterministically.
 */
function generateDustData(count: number) {
  let seed = 137
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const offsets = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (seededRandom() - 0.5) * 5
    positions[i * 3 + 1] = (seededRandom() - 0.5) * 6
    positions[i * 3 + 2] = (seededRandom() - 0.5) * 2

    speeds[i] = 0.05 + seededRandom() * 0.15
    offsets[i] = seededRandom() * Math.PI * 2
  }

  return { positions, speeds, offsets }
}

/**
 * Tiny golden dust motes that drift upward slowly — like sunlit spores
 * floating through a shaft of light in a dense forest.
 * Creates a dreamy, ethereal atmosphere layered over content.
 */
export default function JungleParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const data = generateDustData(count)
  const speedsRef = useRef(data.speeds)
  const offsetsRef = useRef(data.offsets)

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const time = clock.getElapsedTime()
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speedsRef.current[i]
      const offset = offsetsRef.current[i]

      // Gentle upward drift
      posArray[i3 + 1] += speed * 0.008

      // Reset when too high
      if (posArray[i3 + 1] > 3.5) {
        posArray[i3 + 1] = -3.5
      }

      // Horizontal sway
      posArray[i3] += Math.sin(time * speed * 0.5 + offset) * 0.001
      posArray[i3 + 2] += Math.cos(time * speed * 0.3 + offset) * 0.0005
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
          count={count}
          array={data.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E8C864"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
