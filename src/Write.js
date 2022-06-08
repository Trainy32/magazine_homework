import React, { useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createPostFB, editPostFB, deletePostFB } from './redux/modules/Magazine'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

const Write = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams()
  const currentPost = useSelector((state) => state.magazinePost.list).find((p) => p.id === params.postId)

  const [layout, setLayout] = useState('Top')
  const [imageUrl, setImageUrl] = useState('')

  const text_ref = useRef(null);
  const img_ref = useRef(null);

  React.useEffect( () => {
    if (params.postId !== 'new') {
      setImageUrl(currentPost.postImg)
      img_ref.current = currentPost.postImg
    }
  }, []);

  const uploadImg = async (e) => {
    const file_path = 'postImg/' + new Date().getTime()
    const uploaded_file = await uploadBytes(ref(storage, file_path), e.target.files[0])
    const file_url = await getDownloadURL(uploaded_file.ref)
    img_ref.current = { url: file_url }
    setImageUrl(img_ref.current.url)
  }

  const writePost = () => {

    if (text_ref.current.value !== '' && img_ref.current) {
      const writtenDate = new Date()
      const newPost = {
        postedBy: props.userData.user_id,
        posted_uid: props.userData.uid,
        nickname: props.userData.nickname,
        profileImg: props.userData.profile_img,
        postImg: imageUrl,
        postTxt: text_ref.current.value.trim(),
        postDate: `${writtenDate.toLocaleDateString()} ${writtenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `,
        likedBy: [],
        layout: layout
      }
      dispatch(createPostFB(newPost))
      window.alert('게시글이 등록되었습니다!')
      navigate('/')
    } else if (text_ref.current.value === '') {
      window.alert('텍스트를 입력해주세요!')
    } else if (!img_ref.current) {
      window.alert('이미지를 등록해주세요!')
    }
  }

  const editPost = () => {
    if (text_ref.current.value !== '' && img_ref.current) {
      const newPostData = {
        id: currentPost.id,
        nickname: props.userData.nickname,
        profileImg: props.userData.profile_img,
        postImg: imageUrl,
        postTxt: text_ref.current.value.trim(),
        layout: layout
      }
      dispatch(editPostFB(newPostData))
      window.alert('게시글이 수정 되었습니다!')
      navigate('/')
    } else if (text_ref.current.value === '') {
      window.alert('텍스트를 입력해주세요!')
    } else if (!img_ref.current) {
      window.alert('이미지를 등록해주세요!')
    }
  }

  const deletePost = () => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deletePostFB(currentPost.id))
      window.alert('삭제되었습니다')
      navigate('/')
    }
  }


  return (
    <Wrap>
      <ContentEditor>
        <ImgArea htmlFor="fileInput" imageUrl={imageUrl} />
        <TextArea ref={text_ref} type='text' defaultValue={params.postId !== 'new' ? currentPost.postTxt : ''} />
      </ContentEditor>

      <SelectLayout onChange={(l) => { setLayout(l.target.value) }}>
        레이아웃 선택 <small>(텍스트 위치)</small> <br />
        <label>
          {params.postId !== 'new' && currentPost.layout !== 'Top' ?
            <input type='radio' name='layout' value='Top' />
            : <input type='radio' name='layout' value='Top' defaultChecked />
          } Top </label>

        <label>
          {params.postId !== 'new' && currentPost.layout === 'Right' ?
            <input type='radio' name='layout' value='Right' defaultChecked />
            :<input type='radio' name='layout' value='Right' />
            } Right </label>
        <label>
        {params.postId !== 'new' && currentPost.layout === 'Left' ?
        <input type='radio' name='layout' value='Left' defaultChecked/> :
        <input type='radio' name='layout' value='Left' />
        } Left </label>
      </SelectLayout>

      <input id='fileInput' type='file' onChange={uploadImg} />

      { params.postId === 'new' ?
        <button id="newBtn" onClick={writePost}>작성하기</button>
        : <><button id="editBtn" onClick={editPost}>수정하기</button>
        <button id="deleteBtn" onClick={deletePost}>삭제하기</button></>
      }

    </Wrap>
  )
}

const Wrap = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 900px;
  margin: 120px auto 50px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;


  button {
    width:90%;
    height: 60px;
    margin: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 110%;
    cursor:pointer;
  }

  #newBtn {
    background-color: #1c617a;
    color: #fff;

    &:hover {
      background-color: #16a3d6;  
      transition: background-color 0.3s linear;
    }
  }

  #editBtn {
    background-color: #1c617a;
    color: #fff;

    &:hover {
      background-color: #16a3d6;  
      transition: background-color 0.3s linear;
    }
  }

  #deleteBtn {
    color: #434343;

    &:hover {
      background-color: #a9a9a9;
      color: #fff;
      transition: all 0.3s linear;
    }
  }


  input[type='file'] {
    width: 0px;
    height:0px;
    margin: -1px;
    padding: 0px;
    overflow:hidden;
  }

  
`
const ContentEditor = styled.div`
  display:flex;
  flex-direction: row;
`

const ImgArea = styled.label`
  width: 35vw;
  max-width: 400px;
  height: 35vw;
  max-height: 400px;
  margin: 10px;
  border: 1px solid #ddd;
  cursor:pointer;

  background-color: #ddd;
  background: url(${(props) => props.imageUrl !== '' ? props.imageUrl : 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/profileImg%2Fdlal.jpg?alt=media&token=422b4620-8215-4864-9607-184e52bc3ec6'}) no-repeat center;
  background-size: cover;
`
const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 4%;
  width: 35vw;
  max-width: 400px;
  height: 35vw;
  max-height: 400px;
  margin: 10px;
  white-space: pre-wrap;
  font-size: 140%;
`

const SelectLayout = styled.div`
margin: 10px;
line-height: 200%;
font-size: 1.1em;
font-weight: 600;
`

export default Write