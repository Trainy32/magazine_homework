import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Write = (props) => {
  const navigate = useNavigate()

  return (
    <Wrap>
      <ContentPreview>
        <ImgArea htmlFor="fileInput"> 이미지를 추가해주세요! <br/> Click! </ImgArea>
        <TextArea type='text' cols='40' rows='4'/>
      </ContentPreview>
      레이아웃선택 Top right left

      <input id='fileInput' type='file'/>
      <button>작성하기</button>
      
    </Wrap>
  )
}

const Wrap = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 900px;
  margin: 30px auto 50px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;

  button {
    width:500px;
    height: 60px;
    margin: 20px;
  }

  input[type="file"] {
    width: 0px;
    height:0px;
    margin: -1px;
    padding: 0px;
    overflow:hidden;
  }
`
const ContentPreview = styled.div`
  display:flex;
`


const ImgArea = styled.label`
display:flex;
align-items:center;
justify-content: center;
text-align: center;
width: 20vw;
height: 20vw;
margin-left: 20px;
background-color: #ddd;
cursor:pointer;
`
const TextArea = styled.input`
width: 20vw;
height: 20vw;
margin-left: 20px;
`

export default Write