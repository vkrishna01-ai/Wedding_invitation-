'use client'

import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The central Ganesh image rendered as a textured plane in 3D space
 * with a gentle floating animation and subtle depth.
 */
export default function GaneshPlane() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const texture = useTexture('/ganesh.png')

  // Make the texture transparent
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Very gentle floating bob
    meshRef.current.position.y = 0.15 + Math.sin(t * 0.8) * 0.04

    // Subtle breathing scale
    const breathe = 1.0 + Math.sin(t * 1.0) * 0.012
    meshRef.current.scale.set(breathe, breathe, 1)
  })

  return (
    <mesh ref={meshRef} position={[0, 0.15, 0.1]}>
      <planeGeometry args={[1.4, 1.4]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        side={THREE.FrontSide}
        depthWrite={false}
      />
    </mesh>
  )
}
