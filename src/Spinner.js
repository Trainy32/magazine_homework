import React from "react";
import styled, { keyframes } from 'styled-components'
import { FaHourglassHalf } from 'react-icons/fa'

const Spinner = () => {

  return (
    <SpinnerContent>
    <FaHourglassHalf id="hourglass"/>
    <p> Loding... </p>
    </SpinnerContent>
  )
}


const SpinnerAnimation =  keyframes `
0% {
  transform:rotate(0deg);
}

50% {
  transform:rotate(180deg);
}

100% {
  transform:rotate(360deg);
}
`


const SpinnerContent = styled.div`
position:fixed;
z-index: 9;
top: 80px;
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content : center;
align-items: center;
margin: 0px;
padding: 0px;
color: #fff;
background-color: #1c617af0;

#hourglass{
font-size: 6em;
animation: ${SpinnerAnimation} 2.5s 1s linear infinite ; 
}

p {
  font-size: 2.5em;
  font-weight: 300;
}
`

export default Spinner