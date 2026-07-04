'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating flower petals (marigold-inspired) that drift around the scene.
 * Adds a traditional Indian wedding feel with gentle falling petal motion.
 */
export default function FloatingPetals({ count = 20 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 1.5,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.3,
      wobble: 0.3 + Math.random() * 0.8,
      scale: 0.03 + Math.random() * 0.05,
      offset: Math.random() * Math.PI * 2,
      color: ['#D4AF37', '#C5A55A', '#E8C864', '#B38728'][
        Math.floor(Math.random() * 4)
      ],
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.children.forEach((child, i) => {
      const petal = petals[i]
      if (!petal) return

      // Gentle falling + swaying motion
      child.position.y =
        petal.position[1] - ((t * petal.speed * 0.15 + petal.offset * 5) % 4) + 2
      child.position.x =
        petal.position[0] + Math.sin(t * petal.wobble + petal.offset) * 0.3
      child.position.z =
        petal.position[2] + Math.cos(t * petal.wobble * 0.5 + petal.offset) * 0.15

      // Tumbling rotation
      child.rotation.x = t * petal.speed * 0.5 + petal.offset
      child.rotation.z = Math.sin(t * petal.wobble + petal.offset) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {petals.map((petal, i) => (
        <mesh key={i} position={petal.position} scale={petal.scale}>
          {/* Petal shape — a slightly curved ellipse */}
          <sphereGeometry args={[1, 6, 4, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshBasicMaterial
            color={petal.color}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
