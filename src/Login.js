import React, {useRef} from "react";
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {auth} from './firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = (props) => {
  const navigate = useNavigate()

  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  const userLogin = async() => {
    try { 
    await signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value)
    navigate('/')
  } catch {
    window.alert('아이디와 비밀번호를 체크해주세요')
  }
  }  


  return (
    <LoginBox>
      <h1> LOGIN </h1>
      <span>아이디</span><input ref={id_ref} type='email' placeholder='아이디를 입력해주세요'/>
      <span>비밀번호</span><input ref={pw_ref} type='password' placeholder='비밀번호를 입력해주세요'/>
      <LoginBtn onClick={userLogin}> 로그인 </LoginBtn>
      <SignupBtn onClick={()=>{navigate('/signup')}}> 회원가입 </SignupBtn>
    </LoginBox>
  )
}

const LoginBox = styled.div`
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
  height:30px;
  padding: 10px;
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
  height: 60px;
  border: none;
  border-radius: 5px;
  font-size:1.1em;
  font-weight: 600;
}
`
const LoginBtn = styled.button`
  background-color: #1c617a;
  color: #fff;
  cursor:pointer;
  :hover {
    background-color: #16a3d6;  
    transition: background-color 0.2s ease-in;
  }
`
const SignupBtn = styled.button`
color: #6f6f6f;
cursor: pointer;

&:hover {
      background-color: #a9a9a9;
      color: #fff;
      transition: all 0.3s linear;
    }
`


export default Login