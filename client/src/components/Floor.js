import React, { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import planeVertexShader from '../shaders/vertex.js'
import planeFragmentShader from '../shaders/fragment.js'

const PlaneMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  planeVertexShader,
  planeFragmentShader
)
extend({ PlaneMaterial })

const Floor = () => {
  const portalMaterialRef = useRef()

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta
  })
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <planeMaterial ref={portalMaterialRef} />
    </mesh>
  )
}

export default Floor
