'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A golden glowing ring/halo behind the Ganesh image.
 * Creates a divine mandala-like halo effect using a torus
 * with custom shader for pulsating gold glow.
 */
export default function DivineMandalaRing() {
  const ringRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  // Create shader material once via ref
  useEffect(() => {
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#B38728') },
        uColor2: { value: new THREE.Color('#F9EF99') },
        uColor3: { value: new THREE.Color('#D4AF37') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          // Rotating gradient around the ring
          float angle = atan(vPosition.y, vPosition.x);
          float normalized = (angle + 3.14159) / (2.0 * 3.14159);

          // Animate the gradient rotation
          float shifted = fract(normalized + uTime * 0.08);

          // Multi-color gold gradient
          vec3 color;
          if (shifted < 0.33) {
            color = mix(uColor1, uColor2, shifted * 3.0);
          } else if (shifted < 0.66) {
            color = mix(uColor2, uColor3, (shifted - 0.33) * 3.0);
          } else {
            color = mix(uColor3, uColor1, (shifted - 0.66) * 3.0);
          }

          // Pulsating opacity
          float pulse = 0.5 + 0.3 * sin(uTime * 1.5 + shifted * 6.28);

          // Edge fade for softness
          float edgeFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

          gl_FragColor = vec4(color, pulse * edgeFade * 0.7);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    if (ringRef.current) {
      ringRef.current.material = materialRef.current
    }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.03
    }
    if (glowRef.current) {
      const scale = 1.0 + Math.sin(t * 1.2) * 0.03
      glowRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <group position={[0, 0.15, -0.2]}>
      {/* Main ornamental ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.15, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner ring */}
      <mesh rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.95, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft glow disc behind everything */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <circleGeometry args={[1.3, 64]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
