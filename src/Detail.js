import React from "react";
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadOnePostFB, addLikeFB, unLikeFB } from './redux/modules/Magazine'
import { addCommentFB, loadCommentFB, deleteCommentFB } from "./redux/modules/Comments";
import { getDatabase, ref as rtRef, set, push } from "firebase/database";
import HeartAni from './HeartAni'


const Detail = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const alertdb = getDatabase()
  const userData = props.userData
  const commentList = useSelector(state => state.Comments.list)
  const [ isLiked, setIsLiked ] = React.useState(false)
  const [ heartOn, setHeartOn ] = React.useState(false)

  React.useEffect( () => {
    dispatch(loadOnePostFB(params.postId))
    dispatch(loadCommentFB(params.postId))
    setIsLiked(userData ? currentPost.likedBy.includes(userData.user_id) : null)
    console.log(isLiked)
      }, [userData, params.postId]);
  
      
  const currentPost = useSelector(state => state.magazinePost.selected)
  const comment_ref = React.useRef()
 

  const addComment = () => {
    if (userData) {
      const commentDate = new Date()
      const newComment = {
        post_id : currentPost.id,
        comment : comment_ref.current.value,
        comment_by: userData.user_id,
        comment_nick : userData.nickname,
        comment_time: commentDate.toLocaleDateString()+' '+ commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      } 
      dispatch(addCommentFB(newComment))

      const alertData = {
        date: commentDate.toLocaleDateString()+' '+ commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        post_id: currentPost.id,
        committed_by : userData.nickname,
        alert_type: 'comment'
      }
  
      const alertListRef = rtRef(alertdb, 'users/'+userData.uid+'/alerts')
      const newAlertRef = push(alertListRef)

      set(newAlertRef, alertData)


      window.alert('등록되었습니다')
    } else {
      window.alert('먼저 로그인해주세요!')
    }

  }

  const likePost = () => {
    try {
      const newLike = [currentPost.id, userData.user_id]
      const alertDate = new Date()

      if (!isLiked) {
        dispatch(addLikeFB(newLike))
        console.log(currentPost.id)
        const alertData = {
          date: alertDate.toLocaleDateString()+' '+ alertDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          post_id: currentPost.id,
          committed_by : userData.nickname,
          alert_type: 'like'
        }
    
        const alertListRef = rtRef(alertdb, 'users/'+userData.uid+'/alerts')
        const newAlertRef = push(alertListRef)
  
        set(newAlertRef, alertData)
        setIsLiked(true)
        setHeartOn(!heartOn)
      }
      else {
        dispatch(unLikeFB(newLike))
        setIsLiked(false)
        setHeartOn(false)
      }
    } catch (err) {
      if (!userData) {
        window.alert('먼저 로그인해주세요 :)')
      } else {
        console.log(err)
      }
    }
  }

  const editPostBtn = (writerId) => {
    if (userData?.user_id === writerId) {
      navigate('/write/'+params.postId)
    } else {
      window.alert('작성자만 수정할 수 있어요')
    }
  }

  const deleteComment = (commentData) => {
    if (userData?.user_id === commentData.comment_by) {
      if(window.confirm('코멘트를 삭제하시겠어요?')) {
        dispatch(deleteCommentFB(commentData.id))
        window.alert('삭제되었습니다')
        dispatch(loadCommentFB(params.postId))
      }
    } else {
      window.alert('코멘트 작성자만 삭제할 수 있어요')
    }
  }


  return (
    <Wrap>
      <PageTitle>
        <h2>상세보기</h2>
        <ListBtn onClick={() => navigate('/')}>리스트로</ListBtn>
      </PageTitle>
      <Card>
        <PostTitle>
          <Writer>
            <ProfileImg post_data={currentPost} /> <span> {currentPost?.nickname} </span>
          </Writer>
          <div>
            <span> {currentPost?.postDate} </span>
            <EditBtn onClick={() => editPostBtn(currentPost?.postedBy)}> 수정</EditBtn>
          </div>
        </PostTitle>

        <PostContent post_data={currentPost}>
          <TextArea post_data={currentPost}> {currentPost?.postTxt} </TextArea>
          <ImageArea post_data={currentPost}> </ImageArea>
        </PostContent>

        <PostResponses>
          <span>likes<span style={{ margin: '0px 5px 0px 10px', color: '#cd332b', fontSize: '1.1em' }}>
            {currentPost.likedBy ? currentPost.likedBy.length : 0}</span>개</span>
          <HeartBtn onClick={() => likePost()}>
            {isLiked ? '❤️' : '🤍'}
            {heartOn ? <HeartAni/> : null}
          </HeartBtn>
        </PostResponses>
      </Card>

      <CommentWrap>
        <span> {userData ? userData.nickname : '로그인해주세요'} </span>
        <textarea ref={comment_ref}/>
        <button onClick={addComment}>코멘트<br /> 남기기</button>
      </CommentWrap>

      {
        commentList?.map((p,i) => { return (
          <CommentList key={i}>
          <span> {p.comment_nick} </span>
          <div> {p.comment}  <DeleteBtn onClick={() => deleteComment(p)}>x</DeleteBtn> </div>
          <h5>{p.comment_time}</h5>
        </CommentList>
        ) })
      }
    </Wrap>
  )
}

const Wrap = styled.div`
margin-top: 120px;
`
const PageTitle = styled.div`
width: 90vw;
max-width: 600px;
margin: 0px auto 15px auto;
display:flex;
align-items: flex-end;
justify-content: space-between;


h2{
  color: #606060;
  margin: 0px;
}
`


const ListBtn = styled.button`
width: 150px;
height: 45px;
margin-left: 20px;
border: none;
border-radius: 50px;
font-size: 95%;
font-weight: 500;
background-color: #ddd;
color: #6f6f6f;
cursor: pointer;

&:hover {
      background-color: #a9a9a9;
      color: #fff;
      transition: all 0.3s linear;
    }
`

const Card = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 0px auto 20px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #0d0d0d21;
  position: relative;
`

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px #0d0d0d38;
  height: 60px;
  padding: 0px 20px ;

  span {
    margin-left: 8px;
  }
`

const EditBtn = styled.span`
cursor:pointer;

&:hover {
  font-weight: 600;
  color:#1c617a;
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
    background: url(${(props) => props.post_data.profileImg !== '' ? props.post_data.profileImg : 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/postImg%2F1654615696359?alt=media&token=d4e28986-f13d-48c5-a320-ca6ea48503d5'}) no-repeat center;
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
  background-size: contain;
  box-shadow: ${(props) => (props.post_data.layout !== 'Top' ? '0px 2px 5px #0d0d0d38 inset' : 'none')}; 
  margin-left:-1px;
`

const TextArea = styled.div`
  margin: 24px;
  width: ${(props) => (props.post_data.layout === 'Top' ? '90%' : '40%')};
  max-width: 800px;
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
cursor:pointer;
`

const CommentWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  width: 90vw;
  max-width: 600px;
  height: 80px;
  margin: 20px auto 20px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #0d0d0d21;
  box-sizing:border-box;

  span{
    width: 20%;
    height: 85%;
    box-sizing:border-box;
    margin: auto;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align: center;

    font-weight: 600;
    font-size: 100%;
  }

  textarea{
    width: 60%;
    height: 85%;
    box-sizing:border-box;
    margin-left: 20px;
    white-space: pre-wrap;
    padding: 10px;
  }

  button{
    width: 20%;
    height: 85%;
    box-sizing:border-box;
    margin-left: 10px;
    font-weight: 600;
    background-color: #1c617a;
    color: #fff;
    cursor:pointer;
    border: none;
    border-radius: 5px;
    text-align: center;

    :hover {
      background-color: #16a3d6;  
      transition: background-color 0.2s ease-in;
    }
  }
`

const CommentList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  width: 90vw;
  max-width: 600px;
  margin: 10px auto 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;

  span{
    width: 20%;
    height: 100%;
    box-sizing:border-box;
    margin: 0px;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    border-right: 1px solid #ddd;
    font-weight: 600;
    font-size: 80%;
    color: #1c617a
  }

  div{
    width: 65%;
    height: 100%;
    display:flex;
    align-items:center;
    margin-left: 10px;

  }

  h5 {
    font-weight: 400;
    color: #aaa;
    text-align: right;
    margin: 0px;
    padding: 0px;
  }
`
const DeleteBtn = styled.h3 `
  margin: 0px 0px 0px 15px;
  padding: 0px;
  font-weight: 300;
  color: #aaa;
  cursor:pointer;
`


export default Detail