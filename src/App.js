import React, { useState } from "react";
import styled from 'styled-components'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { auth, db } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

import SignUp from "./SignUp";
import Login from "./Login";
import MyAlert from "./MyAlert";
import PostList from "./PostList";
import Write from "./Write";


function App() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const [userData, SetUserData] = useState(null)

  const loginChecker = async (user) => {
    if (user) {
      setIsLogin(true)

      const userIs = await getDocs(query(
        collection(db, 'users'), where('user_id', '==', user.email)
      ))

      userIs.forEach((u) => {
        SetUserData(u.data())
      })

    } else {
      setIsLogin(false)
    }
  }

  const logOut = () => {
    signOut(auth)
    navigate('/')
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, loginChecker)
  }, [])

  return (
    <div className="App">
      <Header>
        <Welcome>
          <div user_data={userData} onClick={() => navigate('/')}></div>
          {isLogin ?
            (<h3><span>{userData ? userData.nickname : ''}</span> 님</h3>)
            : (<h3>로그인해주세요 :)</h3>)
          }
        </Welcome>

        {isLogin ?
          (<div style={{display:'flex'}}>
            <button user_data={userData} onClick={() => navigate('/myalert')}>알림</button>
            <AlertBadge>{userData?.alerts.length}</AlertBadge>
            <button onClick={logOut}>로그아웃</button>
          </div>)
          : (<div><button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button></div>)
        }

      </Header>

      <Routes>
        <Route path='/' element={
            <> <PostList userData={userData} /> 
            <AddNew onClick={() => navigate('/write')}> 작성 </AddNew></>
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/myalert' element={<MyAlert userData={userData} />} />
        <Route path='/write' element={<Write userData={userData}/>} />
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
  align-items: center;

  h2 {
    font-size:40px;
    margin-right: 15px;
    cursor:pointer;
  }

  div {
    margin: 5px 20px 5px 0px;
    height: 60px;
    width: 60px;
    border-radius: 60px;
    background-color: #ddd;
    
    cursor:pointer;
  }

  span {
    color:#1c617a;
  }
`
const AlertBadge = styled.div `
display: flex;
justify-content: center;
align-items:center;
width:30px;
height: 30px;
border-radius:20px;
margin: -10px 0px 0px -20px;
font-weight: 600;
color: #fff;
background-color: #ff9c00;
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
