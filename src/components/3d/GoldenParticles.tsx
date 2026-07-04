'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Golden particles that orbit and float around the Ganesh image,
 * creating a divine, luminous aura effect.
 */
export default function GoldenParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!)

  // Generate random particle positions in a disc / sphere around center
  const { positions, sizes, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.6 + Math.random() * 1.8
      const height = (Math.random() - 0.5) * 2.4

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.3 // flatten z for depth

      sizes[i] = 0.008 + Math.random() * 0.025
      speeds[i] = 0.15 + Math.random() * 0.4
      offsets[i] = Math.random() * Math.PI * 2
    }

    return { positions, sizes, speeds, offsets }
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speeds[i]
      const offset = offsets[i]

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
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
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
