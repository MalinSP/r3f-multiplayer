import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Floor from './components/Floor'
import styled from 'styled-components'
import io from 'socket.io-client'
import Model from './components/Model'
import { useEffect, useMemo, useState } from 'react'
import { useGLTF } from '@react-three/drei'

const socket = io.connect('http://localhost:3001')

function App() {
  const modelOne = useGLTF('./models/CesiumMan.gltf')
  const modelTwo = useGLTF('./models/BrainStem.gltf')
  const modelThree = useGLTF('./models/RiggedFigure.gltf')
  const [models, setModels] = useState([])
  // console.log(modelOne)

  const modelsObject = [
    {
      id: 1,
      modelName: 'Cesium_Man',
      model: modelOne,
      x: -1,
      y: 0,
      z: 0,
      scale: 0.5,
    },
    {
      id: 2,
      modelName: 'BrainStem',
      model: modelTwo,
      x: 0,
      y: 0,
      z: 0,
      scale: 0.5,
    },
    {
      id: 3,
      modelName: 'riggedFigure',
      model: modelThree,
      x: 1,
      y: 0,
      z: 0,
      scale: 0.5,
    },
  ]
  const memorizedModelOne = useMemo(() => {
    return modelsObject[0]
  }, [])
  const memorizedModelTwo = useMemo(() => {
    return modelsObject[1]
  }, [])
  const memorizedModelTHree = useMemo(() => {
    return modelsObject[2]
  }, [])
  const memObjectArr = [
    memorizedModelOne,
    memorizedModelTwo,
    memorizedModelTHree,
  ]

  const randomNumber = Math.floor(Math.random() * modelsObject.length)
  const randomModel = modelsObject[randomNumber]
  // console.log(randomModel)

  useEffect(() => {
    socket.emit('setID', { id: socket.id })
    return () => {
      socket.off('setID')
    }
  }, [])

  useEffect(() => {
    socket.on('userCreated', (data) => {
      // console.log(data)
      data.map((user, i) => {
        // console.log(user, i)
        user.data = memObjectArr[i]
      })
      console.log(data)
      setModels(data)
    })
    // return () => {
    //   socket.off('userCreated')
    // }
  }, [socket])
  return (
    <>
      <CanvasContainerWrapper>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <fog attach='fog' args={['#17171b', 10, 20]} />
          <color attach='background' args={['#17171b']} />
          <ambientLight intensity={0.25} />
          <directionalLight
            castShadow
            intensity={2}
            position={[10, 6, 6]}
            shadow-mapSize={[1024, 1024]}
          />
          <Floor />
          <Model
            models={models}
            socket={socket}
            modelsObject={modelsObject}
            setModels={setModels}
            randomModel={randomModel}
            randomNumber={randomNumber}
            memObjectArr={memObjectArr}
            modelOne={modelOne}
            modelTwo={modelTwo}
            modelThree={modelThree}
          />

          <OrbitControls />
        </Canvas>
      </CanvasContainerWrapper>
    </>
  )
}

const CanvasContainerWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
`
export default App
