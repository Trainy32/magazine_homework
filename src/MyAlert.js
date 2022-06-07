import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const MyAlert = (props) => {
  const navigate = useNavigate()

  return (
    <Wrap>
      <DeleteAll>모두 삭제</DeleteAll>
      <Alerts>
        <Thumbnails></Thumbnails>
        <div>
          <p>2022. 6. 7.</p>
          <span>닉네임</span> 님이 게시글에 좋아요♥를 눌렀어요!
        </div>
        <DeleteBtn>✖</DeleteBtn>
      </Alerts>
    </Wrap>
  )
}

const Wrap = styled.div `
  display:flex;
  flex-direction:column;
  align-items : flex-end;
  width: 90%;
  max-width: 900px;
  margin: 120px auto 30px auto;
`

const DeleteAll = styled.button`
width: 200px;
height: 40px;
box-sizing: border-box;
border:none;
border-radius: 5px;
background-color: #daf1f9;
box-shadow: 1px 1px 1px #d5ecf4;
font-weight: 600;
color: #1c617a;
cursor:pointer;
`

const Alerts = styled.div`
  position: relative;
  box-sizing: border-box;
  display:flex;
  align-items: center;
  width: 100%;
  height: 140px;
  margin: 30px auto 30px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  box-shadow: 1px 1px 1px #0d0d0d38;
  font-size: 18px;
  overflow:hidden;

  span{
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: -20px 0px 5px 0px;
    font-size: 0.8em;
    color: #aaa;
  }
`
const Thumbnails = styled.div`
height: 110px;
width: 110px;
margin: 10px 30px 10px 10px;
background-color: #ddd;
`

const DeleteBtn = styled.span`
position: absolute;
font-size: 30px;
right: 10px;
top: 0px;
padding: 10px;
cursor:pointer;
`


export default MyAlert