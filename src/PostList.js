import React from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'
import {readPosts, addLike, unLike} from './redux/modules/Magazine'


const PostList = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector(state =>state.magazinePosts)
  const userData = props.userData

  const likePost = (post_index) => {
    try {
    const newLike = [post_index, userData.user_id]

    if (! posts[post_index].likedBy.includes(userData?.user_id)) {
      dispatch(addLike(newLike))
    }
    else {
      dispatch(unLike(newLike))
    }
    } catch {
      if(!userData) {
        window.alert('먼저 로그인해주세요 :)')
      }
    }
  }


  React.useEffect( () => {
    dispatch(readPosts());
      }, []);

  return (
    <div>
      { posts.map((p,i) => {return(
    <Card key={i}>
      <PostTitle>
        <Writer>
          <ProfileImg post_data={posts[i]}/> <span> {posts[i].postedBy} </span>
        </Writer>
        <div>
          <span> {posts[i].postDate} </span>
          <span onClick={()=>navigate('/write')}> 수정하기</span>
        </div>
      </PostTitle>

      <PostContent post_data={posts[i]}>
        <TextArea post_data={posts[i]}> {posts[i].postTxt} </TextArea>
        <ImageArea post_data={posts[i]}> </ImageArea>
      </PostContent>

      <PostResponses>
        <span>likes<span style={{margin:'0px 5px 0px 10px', color:'#cd332b', fontSize:'1.1em'}}>{posts[i].likedBy.length}</span>개</span>
        <HeartBtn post_data={posts[i]} onClick={() => likePost(i)}> 
          { posts[i].likedBy.includes(userData?.user_id) ? '❤️' : '🤍'} 
        </HeartBtn>
      </PostResponses>
    </Card>
    )}
    )}
    </div>
  )
}

const Card = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 30px auto 50px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #0d0d0d21;

  &:hover {
    box-shadow: 3px 3px 5px #0d0d0d38;
  }
`

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px #0d0d0d38;
  height: 60px;
  padding: 0px 20px ;

  span {
    margin-left: 10px;
  }
`

const Writer = styled.div`
display: flex;
align-items: center;

  span {
      font-size: 1.15em;
      font-weight: 600;
    }

`

const ProfileImg = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background: url(${(props) => props.post_data.profileImg}) no-repeat center;
    background-size: 90%;
`


const PostContent = styled.div`
  display:flex;
  flex-direction: ${(props) => (props.post_data.layout === 'Top' ? 'column' : props.post_data.layout === 'Left' ? 'row' : 'row-reverse')};
  flex-wrap: nowrap;
`

const ImageArea = styled.div`
  width: ${(props) => (props.post_data.layout === 'Top' ? '100%' : '60%')};
  height: ${(props) => (props.post_data.layout === 'Top' ? '90vw' : '50vh')};
  max-height: 500px;
  border: 1px solid #ddd;
  background: url(${(props) => props.post_data.postImg}) no-repeat center;
  background-size: cover;
  box-shadow: ${(props) => (props.post_data.layout !== 'Top' ? '0px 2px 5px #0d0d0d38 inset' : 'none')}; 
`

const TextArea = styled.div`
  margin: 24px;
  width: ${(props) => (props.post_data.layout === 'Top' ? '90%' : '40%')};
  max-width: 800px;
  max-height: ${(props) => (props.post_data.layout === 'Top' ? '100px' : '45vh')};
  overflow:hidden;
  white-space:pre-wrap;
`

const PostResponses = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  height: 60px;
  padding: 0px 20px;
  font-weight: bold;
`

const HeartBtn = styled.span`
font-size: 1.9em;
margin-top: -5px;
margin-right: 0px;
`



export default PostList