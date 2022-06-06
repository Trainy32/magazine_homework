import React from "react";
import styled from 'styled-components'
import {Route, Routes, useNavigate} from 'react-router-dom'

import SignUp from "./SignUp";
import Login from "./Login";
import MyAlert from "./MyAlert";
import PostList from "./PostList";
import Write from "./Write";


function App() {
  const navigate = useNavigate()

  return (
    <div className="App">
      <Header>
        <Welcome>
        <div onClick={() => navigate('/')}></div>
        <h3><span>닉네임</span> 님 안녕하세요!</h3>
        </Welcome>
        <div>
        <button onClick={() => navigate('/myalert')}>알림</button>
        <button onClick={() => navigate('/login')}>로그인</button>
        <button onClick={() => navigate('/signup')}>회원가입</button>
        <button>로그아웃</button>
        </div>
      </Header>
      
      <Routes>
      <Route path='/' element={<> <PostList/> <AddNew onClick={() => navigate('/write')}> 작성 </AddNew></>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/myalert' element={<MyAlert/>}/>
      <Route path='/write' element={<Write/>}/>
      </Routes>
    </div>  
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  box-shadow: 0px 2px 5px #0d0d0d38;

  height: 80px;

  button {
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    height: 40px;
    width: 80px;
    font-weight: 600;
    background-color: #1c617a;
    color: #fff;
    cursor:pointer;
  }
  
`
const Welcome = styled.div`
  display: flex;

  div {
    margin: 5px 30px 5px 0px;
    background-color: #ddd;
    height: 60px;
    width: 60px;
    cursor:pointer;
  }

  span {
    color:#1c617a;
  }
`

const AddNew = styled.button`
  position: absolute;
  bottom: 8%;
  right: 5%;
  height: 100px;
  width: 100px;
  border-radius: 80px;
  border: none;
  outline: none;
  background-color: #1c617a;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  cursor:pointer;
`



export default App;
