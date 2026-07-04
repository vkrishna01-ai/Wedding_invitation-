'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generate golden particle data deterministically.
 */
function generateParticleData(count: number) {
  let seed = 73
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const speeds = new Float32Array(count)
  const offsets = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const angle = seededRandom() * Math.PI * 2
    const radius = 0.6 + seededRandom() * 1.8
    const height = (seededRandom() - 0.5) * 2.4

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius * 0.3

    sizes[i] = 0.008 + seededRandom() * 0.025
    speeds[i] = 0.15 + seededRandom() * 0.4
    offsets[i] = seededRandom() * Math.PI * 2
  }

  return { positions, sizes, speeds, offsets }
}

/**
 * Golden particles that orbit and float around the Ganesh image,
 * creating a divine, luminous aura effect.
 */
export default function GoldenParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!)
  const data = generateParticleData(count)
  const speedsRef = useRef(data.speeds)
  const offsetsRef = useRef(data.offsets)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speedsRef.current[i]
      const offset = offsetsRef.current[i]

      // Gentle orbital + floating motion
      posArray[i3] += Math.sin(time * speed + offset) * 0.0008
      posArray[i3 + 1] += Math.cos(time * speed * 0.7 + offset) * 0.0005
      posArray[i3 + 2] += Math.sin(time * speed * 0.5 + offset) * 0.0003
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = time * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
          count={count}
          array={data.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[data.sizes, 1]}
          count={count}
          array={data.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#D4AF37"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
