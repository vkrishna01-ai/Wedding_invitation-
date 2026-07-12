'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generate sacred fire particle data deterministically.
 */
function generateFireData(count: number) {
  let seed = 419
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const offsets = new Float32Array(count)
  const glows = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const angle = seededRandom() * Math.PI * 2
    const radius = seededRandom() * 0.6
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = seededRandom() * 2.5 - 0.5
    positions[i * 3 + 2] = Math.sin(angle) * radius * 0.5
    speeds[i] = 0.3 + seededRandom() * 0.8
    offsets[i] = seededRandom() * Math.PI * 2
    glows[i] = 0.3 + seededRandom() * 0.7
  }

  return { positions, speeds, offsets, glows }
}

/**
 * Generates diya (oil lamp) flame data.
 */
function generateDiyaData(count: number) {
  let seed = 113
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  return Array.from({ length: count }, () => {
    const angle = seededRandom() * Math.PI * 2
    const radius = 1.2 + seededRandom() * 0.8
    return {
      position: [
        Math.cos(angle) * radius,
        -0.8 + seededRandom() * 0.3,
        Math.sin(angle) * radius * 0.4 - 0.5,
      ] as [number, number, number],
      flicker: 0.5 + seededRandom() * 0.5,
      offset: seededRandom() * Math.PI * 2,
      color: ['#FFB830', '#FF9500', '#FFCC00', '#E8A000'][
        Math.floor(seededRandom() * 4)
      ],
    }
  })
}

/**
 * Sacred fire particles rising upward — like a havan kund flame.
 */
function SacredFireParticles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!)
  const data = generateFireData(count)
  const speedsRef = useRef(data.speeds)
  const offsetsRef = useRef(data.offsets)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speedsRef.current[i]
      const offset = offsetsRef.current[i]

      // Rise upward and reset
      posArray[i3 + 1] = ((t * speed * 0.4 + offset * 3) % 3) - 0.5
      // Gentle sway
      posArray[i3] += Math.sin(t * speed + offset) * 0.001
      posArray[i3 + 2] += Math.cos(t * speed * 0.7 + offset) * 0.0005
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = t * 0.02
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
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FFB830"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Floating diya (oil lamp) flames — small glowing orbs that flicker.
 */
function FloatingDiyas({ count = 12 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const diyas = generateDiyaData(count)
  const diyasRef = useRef(diyas)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.children.forEach((child, i) => {
      const diya = diyasRef.current[i]
      if (!diya) return

      // Gentle floating
      child.position.y = diya.position[1] + Math.sin(t * diya.flicker + diya.offset) * 0.1
      child.position.x = diya.position[0] + Math.sin(t * 0.3 + diya.offset) * 0.05

      // Flicker scale
      const flicker = 0.8 + Math.sin(t * diya.flicker * 4 + diya.offset) * 0.2
      child.scale.setScalar(flicker)
    })
  })

  return (
    <group ref={groupRef}>
      {diyas.map((diya, i) => (
        <mesh key={i} position={diya.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={diya.color}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Sacred rotating mandala rings with Vedic geometry.
 */
function SacredMandala() {
  const outerRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerRef.current) outerRef.current.rotation.z = t * 0.04
    if (innerRef.current) innerRef.current.rotation.z = -t * 0.06
    if (glowRef.current) {
      const pulse = 1.0 + Math.sin(t * 1.5) * 0.05
      glowRef.current.scale.set(pulse, pulse, 1)
    }
  })

  return (
    <group position={[0, 0.3, -1]}>
      {/* Outer sacred ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[1.8, 0.012, 16, 120]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner sacred ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.4, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#E8C864"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft divine glow */}
      <mesh ref={glowRef} position={[0, 0, -0.2]}>
        <circleGeometry args={[2.0, 64]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/**
 * Floating sacred symbols (Om symbols represented as small golden dots
 * arranged in a sacred geometry pattern).
 */
function SacredGeometry() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.z = t * 0.015
    groupRef.current.children.forEach((child, i) => {
      const baseOpacity = 0.15 + Math.sin(t * 0.8 + i * 0.5) * 0.1
      if ((child as THREE.Mesh).material) {
        ;((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = baseOpacity
      }
    })
  })

  // Create 8 points in an octagonal pattern
  const points = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 1.6
    return [Math.cos(angle) * radius, Math.sin(angle) * radius + 0.3, -0.8] as [
      number,
      number,
      number,
    ]
  })

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <circleGeometry args={[0.02, 8]} />
          <meshBasicMaterial
            color="#D4AF37"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Complete Sacred RSVP 3D scene — combines sacred fire, diyas,
 * mandala rings, and sacred geometry for a divine atmosphere.
 */
export default function SacredRSVPScene() {
  return (
    <group>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Warm divine light from above */}
      <directionalLight position={[0, 3, 2]} intensity={0.5} color="#FFF8E7" />

      {/* Sacred fire glow */}
      <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#FFB830" distance={4} />
      <pointLight position={[0, -0.5, 0.5]} intensity={0.8} color="#D4AF37" distance={3} />

      {/* Sacred mandala rings */}
      <SacredMandala />

      {/* Sacred geometry dots */}
      <SacredGeometry />

      {/* Rising sacred fire particles */}
      <SacredFireParticles count={60} />

      {/* Floating diya flames */}
      <FloatingDiyas count={10} />
    </group>
  )
}
