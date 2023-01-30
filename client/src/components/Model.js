import React, { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'

const Model = ({
  socket,
  models,
  setModels,
  modelOne,
  modelTwo,
  modelThree,
  memObjectArr,
}) => {
  const animationsModelOne = useAnimations(modelOne.animations, modelOne.scene)
  const animationModelTwo = useAnimations(modelTwo.animations, modelTwo.scene)
  const animationModelThree = useAnimations(
    modelThree.animations,
    modelTwo.scene
  )

  useEffect(() => {
    socket.on('startAnimation', (data) => {
      if (data.modelName === 'Cesium_Man') {
        models.map((user) => {
          // console.log(user)
          user.action = animationsModelOne.actions.animation_0
          user.action.play()
        })
      }
      if (data.modelName === 'Figure_2_geometry_23') {
        models.map((user) => {
          user.action = animationModelTwo.actions.animation_0
          user.action.play()
        })
      }
      if (data.modelName === 'Proxy') {
        console.log('true')
        models.map((user) => {
          user.action = animationModelThree.actions.animation_0
          user.action.play()
        })
      }
    })

    return () => {
      socket.off('startAnimation')
    }
  }, [socket])

  const handleClick = (e) => {
    e.stopPropagation()
    console.log(e.object.name)
    socket.emit('sendStartAnimation', {
      id: socket.id,
      modelName: e.object.name,
    })
  }

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      console.log(data)
      data.map((user, i) => {
        console.log(user, i)
        console.log(models)
        user.data = memObjectArr[i]
      })
      setModels(data)
    })
    return () => {
      socket.off('newUserResponse')
    }
  }, [socket])

  console.log(models)
  return (
    <group>
      {models.map((figure) => {
        // console.log(figure)
        const { id, data } = figure
        // console.log(id, data, scale)
        return (
          <primitive
            onClick={handleClick}
            key={id}
            object={data.model.scene}
            scale={data.scale}
            position={[data.x, data.y, data.z]}
          ></primitive>
        )
      })}
    </group>
  )
}
export default Model
