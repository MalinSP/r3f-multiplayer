import React, { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

const CesiumMan = ({ socket }) => {
  const foxModel = useGLTF('./models/RiggedFigure.gltf')
  const animations = useAnimations(foxModel.animations, foxModel.scene)
  // console.log(animations.names)
  const ref = useRef()

  const handleClick = (e) => {
    // e.stopPropagation()
    e.stopPropagation()
    console.log(e.object.name)
    socket.emit('sendStartAnimation', {
      id: socket.id,
      modelName: e.object.name,
    })
  }

  useEffect(() => {
    socket.on('startAnimation', (data) => {
      if (data.modelName === 'Proxy') {
        const action = animations.actions.animation_0
        action.play()
      }
    })
  }, [])

  return (
    <primitive
      ref={ref}
      object={foxModel.scene}
      position={[0, 0, -1.4]}
      scale={0.5}
      onClick={handleClick}
    ></primitive>
  )
}

export default CesiumMan
