import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'
import {readPosts} from './redux/modules/Magazine'


const PostDetail = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector(state =>state.magazinePosts)

  React.useEffect( () => {
    dispatch(readPosts());
      }, []);

  return (
    <div>
      { posts.map((p,i) => {return(
    <Card key={i}>
      <PostTitle>
        <span> {posts[i].postedBy} </span>
        <div>
          <span> {posts[i].postDate} </span>
          <span onClick={()=>navigate('/write')}> 수정하기</span>
        </div>
      </PostTitle>

      <TextArea> {posts[i].postTxt} </TextArea>
      <ImageArea> </ImageArea>

      <PostResponses>
        <span>likes <span>{posts[i].likedBy.length}</span>개</span>
        <HeartBtn>♡</HeartBtn>
      </PostResponses>
    </Card>
    )}
    )}
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



export default PostDetail