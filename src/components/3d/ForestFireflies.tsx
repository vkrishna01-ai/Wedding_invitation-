'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generate firefly particle data deterministically from a seed.
 * Extracted outside the component to satisfy React purity rules.
 */
function generateFireflyData(count: number) {
  // Use a simple seeded PRNG for deterministic results
  let seed = 42
  function seededRandom() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const glowSpeeds = new Float32Array(count)
  const radii = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const theta = seededRandom() * Math.PI * 2
    const phi = Math.acos(2 * seededRandom() - 1)
    const r = 1.5 + seededRandom() * 4

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = (seededRandom() - 0.3) * 3
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.5

    phases[i] = seededRandom() * Math.PI * 2
    glowSpeeds[i] = 0.8 + seededRandom() * 2.5
    radii[i] = 0.3 + seededRandom() * 0.8
  }

  return { positions, phases, glowSpeeds, radii }
}

/**
 * Magical forest fireflies — hundreds of glowing amber particles
 * that drift and pulse like fireflies in a jungle at dusk.
 * Creates an enchanting, immersive atmosphere for the destination section.
 */
export default function ForestFireflies({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  // Generate particle data deterministically (pure)
  const data = generateFireflyData(count)

  // Create shader material once via ref
  useEffect(() => {
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#FFB830') },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aPhase;
        attribute float aGlowSpeed;
        attribute float aSize;
        
        uniform float uTime;
        uniform float uPixelRatio;
        
        varying float vGlow;
        
        void main() {
          vec3 pos = position;
          
          // Gentle drifting motion
          pos.x += sin(uTime * 0.3 + aPhase) * 0.15;
          pos.y += cos(uTime * 0.2 + aPhase * 1.3) * 0.1;
          pos.z += sin(uTime * 0.25 + aPhase * 0.7) * 0.08;
          
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
          
          // Pulsing brightness — each firefly blinks at its own rhythm
          vGlow = 0.3 + 0.7 * pow(max(0.0, sin(uTime * aGlowSpeed + aPhase)), 3.0);
          
          // Size attenuation
          gl_PointSize = aSize * uPixelRatio * (120.0 / -viewPosition.z);
          gl_PointSize = max(gl_PointSize, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vGlow;
        
        void main() {
          // Soft circular glow
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 2.0);
          
          // Warm amber core with soft outer glow
          vec3 glowColor = mix(uColor, vec3(1.0, 0.95, 0.8), strength * 0.5);
          
          gl_FragColor = vec4(glowColor, strength * vGlow * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    // Assign material to points mesh
    if (pointsRef.current) {
      pointsRef.current.material = materialRef.current
    }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()

    // Slow overall rotation for depth movement
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015
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
        <bufferAttribute
          attach="attributes-aPhase"
          args={[data.phases, 1]}
          count={count}
          array={data.phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aGlowSpeed"
          args={[data.glowSpeeds, 1]}
          count={count}
          array={data.glowSpeeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[data.radii, 1]}
          count={count}
          array={data.radii}
          itemSize={1}
        />
      </bufferGeometry>
      {/* Fallback material until shader is assigned via ref */}
      <pointsMaterial
        size={0.035}
        color="#FFB830"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
