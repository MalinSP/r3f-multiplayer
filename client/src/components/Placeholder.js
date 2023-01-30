import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGLTF } from '@react-three/drei'

const Placeholder = ({ handleClick }) => {
  return (
    <Wrapper>
      <button onClick={handleClick}>Enter</button>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background: black;
  display: grid;
  place-items: center;
  button {
    font-size: 1rem;
    padding: 0.6rem 1.4rem;
    border-radius: 0.25rem;
    border: none;
    background: orange;
  }
`

export default Placeholder
