import React, {useRef} from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const SignUp = (props) => {
  const navigate = useNavigate()

  const id_ref = useRef(null);
  const nickname_ref = useRef(null);
  const pw_ref = useRef(null);
  const pw_check = useRef(null);
  const userthumb_ref = useRef(null);

  return (
    <div>
      <SignUpBox>
        <h1> 회원가입 </h1>
        <span>아이디</span><input ref={id_ref} type='email' required='required' placeholder='아이디를 입력해주세요'/>
        <span>닉네임</span><input ref={nickname_ref} type='text' required='required' placeholder='닉네임을 입력해주세요'/>
        <span>비밀번호</span><input ref={pw_ref} type='password'  required='required' placeholder='비밀번호를 입력해주세요'/>
        <span>비밀번호 확인</span><input ref={pw_check} type='password' required='required' placeholder='비밀번호를 다시 입력해주세요'/>
        <span>프로필 이미지 등록 (필수 x)</span><input ref={userthumb_ref} type='file'/>
        <button type="submit"> 회원가입 </button>
      </SignUpBox>
    </div>
  )
}


const SignUpBox = styled.form`
display:flex;
flex-direction:column;
width: 60%;
max-width: 500px;
margin: 40px auto;
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