import React from "react";
import styled, { keyframes } from 'styled-components'
import { RiHeartAddFill } from 'react-icons/ri'

const HeartAni = () => {

  return (
    <Heart>
      <RiHeartAddFill/>
    </Heart>
  )
}

const HeartAnimation =  keyframes `

50% {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 18vmax;
color: #c52b2b;
}
60% {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 16vmax;
}

70% {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 18vmax;
}
80% {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 16vmax;
color: #c52b2b;
}

90% {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 18vmax;
color: transparent;
}

100% {
  color: transparent;
}
` 

const Heart = styled.div`
position: absolute;
top: 90%;
left: 85%;
transform: translate(0%, 0%);
font-size: 1.9em;
color: transparent;
animation: ${HeartAnimation} 2.5s ease-out ;
animation-iteration-count: 1;
`

export default HeartAni