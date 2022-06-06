import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const MyAlert = (props) => {
  const navigate = useNavigate()

  return (
    <div>
      <Alerts>
        <Thumbnails></Thumbnails>
        <span>닉네임</span> 님이 게시글에 좋아요♥를 눌렀어요!
      </Alerts>

      <Alerts>
        <Thumbnails></Thumbnails>
        <span>닉네임</span> 님이 게시글에 좋아요♥를 눌렀어요!
      </Alerts>

      <Alerts>
        <Thumbnails></Thumbnails>
        <span>닉네임</span> 님이 게시글에 좋아요♥를 눌렀어요!
      </Alerts>

    </div>
  )
}

const Alerts = styled.div`
  display:flex;
  align-items: center;
  height: 120px;
  width: 90%;
  max-width: 900px;
  margin: 30px auto 30px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 1px 1px 1px #0d0d0d38;
  font-size: 20px;

  span{
    margin: 0px 10px 0px 30px;
    font-weight: 600;
  }
`
const Thumbnails = styled.div`
height: 110px;
width: 110px;
margin:10px;
background-color: #ddd;
`


export default MyAlert