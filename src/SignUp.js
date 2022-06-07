import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

const SignUp = (props) => {
  const navigate = useNavigate()

  const id_ref = useRef(null);
  const nickname_ref = useRef(null);
  const pw_ref = useRef(null);
  const pw_check_ref = useRef(null);
  const profileImg_ref = useRef(null);

  const uploadImg = async (e) => {
    const file_path = 'profileImg/'+ new Date().getTime()
    const uploaded_file = await uploadBytes(ref(storage, file_path), e.target.files[0])
    const file_url = await getDownloadURL(uploaded_file.ref)
    profileImg_ref.current = { url: file_url }
  }

  const signupBtn = async (event) => {
    event.preventDefault()
    const pwConfirmed = pw_ref.current.value === pw_check_ref.current.value
    const idFormConfirmed = Boolean((id_ref.current.value).split('@')[1].split('.')[1])

    if (pwConfirmed && idFormConfirmed) {
      try {
        const user = await createUserWithEmailAndPassword(auth, id_ref.current.value, pw_check_ref.current.value)

        await addDoc(collection(db, 'users'), {
          uid: user.user.uid,
          user_id: user.user.email,
          nickname: nickname_ref.current.value,
          profile_img: profileImg_ref.current? profileImg_ref.current.url : '',
          alerts: []
        })

        window.alert(`환영합니다! ${ nickname_ref.current.value}님!\n회원가입이 완료되었습니다.`)
        navigate('/')
      } catch {
        window.alert('중복된 아이디입니다.')
      }
    } else if (!idFormConfirmed) {
      window.alert('아이디를 정확히 입력해주세요')
    } else if (!pwConfirmed) {
      window.alert('비밀번호 확인이 일치하지 않습니다.')
    }

  }

  return (
    <div>
      <SignUpBox>
        <h1> 회원가입 </h1>
        <span>아이디</span><input ref={id_ref} type='email' required='required' placeholder='아이디를 입력해주세요' />
        <span>닉네임</span><input ref={nickname_ref} type='text' required='required' placeholder='닉네임을 입력해주세요' />
        <span>비밀번호</span><input ref={pw_ref} type='password' required='required' placeholder='비밀번호를 입력해주세요' />
        <span>비밀번호 확인</span><input ref={pw_check_ref} type='password' required='required' placeholder='비밀번호를 다시 입력해주세요' />
        <span>프로필 이미지 등록 (필수 x)</span><input type='file' onChange={uploadImg} />
        <button onClick={signupBtn} type="submit"> 회원가입 </button>
      </SignUpBox>
    </div>
  )
}


const SignUpBox = styled.form`
display:flex;
flex-direction:column;
width: 60%;
max-width: 500px;
margin: 120px auto;
padding: 60px;
border: 1px solid #aaa;

h1 {
  margin: 0px 0px 40px 0px;
}

span {
  margin-bottom: 5px;
}

input {
  height:20px;
  padding: 10px;
  margin-bottom: 30px;
}

button {
  margin-top: 20px;
  height: 60px;
  border: none;
  border-radius: 5px;
  font-size:1.1em;
  font-weight: 600;
  background-color: #1c617a;
  color: #fff;
}
`


export default SignUp