import React, {useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {createPost} from './redux/modules/Magazine'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

const Write = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const text_ref = useRef(null);
  const img_ref = useRef(null);
  const posts = useSelector(state =>state.magazinePosts)
  const [layout, setLayout] = useState('Top')
  const [imageUrl, setImageUrl] = useState('')

  const uploadImg = async (e) => {
    const file_path = 'postImg/'+ new Date().getTime()
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
        profileImg: props.userData.profile_img,
        postImg: imageUrl,
        postTxt: text_ref.current.value.trim(),
        postDate: `${writtenDate.toLocaleDateString()} ${writtenDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} `,
        likedBy: [],
        layout: layout
      }
      dispatch(createPost(newPost))
      navigate('/')
    } else if (text_ref.current.value === '') {
      window.alert('텍스트를 입력해주세요!')
    } else if (!img_ref.current) {
      window.alert('이미지를 등록해주세요!')
    }
  }


  return(
    <Wrap>
      <ContentEditor>
        <ImgArea htmlFor="fileInput" imageUrl={imageUrl}/>
        <TextArea ref={text_ref} type='text'/>
      </ContentEditor>

      <SelectLayout onChange={ (l) => { setLayout(l.target.value) } }>
        레이아웃 선택 <small>(텍스트 위치)</small> <br/>
        <label><input type='radio' name='layout' value='Top' defaultChecked/> Top </label>
        <label><input type='radio' name='layout' value='Right'/> Right </label>
        <label><input type='radio' name='layout' value='Left'/> Left </label>
      </SelectLayout>

      <input id='fileInput' type='file' onChange={uploadImg}/>
      <button onClick={writePost}>작성하기</button>

    </Wrap>
  )
}

const Wrap = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 900px;
  margin: 30px auto 50px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;

  button {
    width:90%;
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
  background: url(${(props)=> props.imageUrl !== '' ? props.imageUrl : 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/postImg%2Fdlal.jpg?alt=media&token=7d248256-73b9-421c-95d5-ce6854b7c566'}) no-repeat center;
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
`

const SelectLayout = styled.div`
margin: 10px;
line-height: 200%;
font-size: 1.1em;
font-weight: 600;
`

export default Write