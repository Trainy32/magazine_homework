import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'


const PostList = (props) => {
  const navigate = useNavigate()

  return (
    <div>
    <Card>
      <PostTitle>
        <div>
          닉네임
        </div>

        <div>
        <span> 업로드일자 </span>
        <span onClick={()=>navigate('/write')}> 수정하기</span>
        </div>
      </PostTitle>

      <TextArea>
        텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 
        텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 
        텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 
      </TextArea>

      <ImageArea>
        <div></div>
      </ImageArea>

      <PostResponses>
        <span>likes <span>00</span>개</span>
        <HeartBtn>♡</HeartBtn>
      </PostResponses>

    </Card>
    </div>
  )
}

const Card = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 30px auto 50px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px #0d0d0d38;
  height: 50px;
  padding: 0px 20px ;

  span {
    margin: 0px 10px;
  }
`
const ImageArea = styled.div`
  background-color: #ddd;
  height: 500px;
`
const TextArea = styled.div`
  margin: 20px;
  width: 90%;
  max-width: 800px;
`

const PostResponses = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -2px 5px #0d0d0d38;
  height: 60px;
  padding: 0px 20px;
  font-weight: bold;
`

const HeartBtn = styled.span`
font-size: 2em;
margin-right: 10px;
`



export default PostList