import React from "react";
import {useNavigate} from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getDatabase, ref as rtRef, update, remove } from "firebase/database";

import styled from 'styled-components'
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsVectorPen } from 'react-icons/bs'



const MyAlert = (props) => {
  const navigate = useNavigate()
  const posts = useSelector(state => state.magazinePost.list)
  const userData = props.userData
  const alertData = props.alertData
  const alertdb = getDatabase()


  const deleteAlert = (i) => {
    const alertKey = Object.keys(alertData)[i]

    const alert_ref = rtRef(alertdb, 'users/'+userData.uid+'/alerts/'+alertKey)
    remove(alert_ref)
  }

  const deleteAllAlert = (i) => {
    if(window.confirm('정말요?')) {
      const userAlert_ref = rtRef(alertdb,'users/'+userData.uid)
      update(userAlert_ref, { alerts:null } )
      window.location.reload()
    }
  }

  return (
    <Wrap>
      <DeleteAll onClick={deleteAllAlert}>모두 삭제</DeleteAll>
      {Object.values(alertData).map((a,i) => {return(
        <Alerts key={i}>
        <Thumbnails post_id={a.post_id} posts={posts} onClick={() => {
          deleteAlert(i);
          navigate('/detail/'+a.post_id)
          }}></Thumbnails>
        <AlertContent>
          <p>{a.date}</p>
          <span>{a.committed_by}</span> 님이 게시글에 {a.alert_type === 'like' ? '좋아요♥를 눌렀어요!' : <>댓글<BsVectorPen/>을 달아줬어요!</>}
        </AlertContent>
        <DeleteBtn><RiDeleteBinLine onClick={() => deleteAlert(i)}/></DeleteBtn>
      </Alerts>
      )})}
    </Wrap>
  )
}

const Wrap = styled.div `
  display:flex;
  flex-direction:column;
  align-items : flex-end;
  width: 90%;
  max-width: 900px;
  margin: 120px auto 30px auto;
`

const DeleteAll = styled.button`
  width: 200px;
  height: 40px;
  box-sizing: border-box;
  border:none;
  border-radius: 5px;
  background-color: #ddd;
  font-weight: 600;
  margin-bottom: 20px;
  color: #434343;
  cursor:pointer;

  &:hover {
    background-color: #a9a9a9;
    color: #fff;
    transition: all 0.3s linear;
  }
`

const Alerts = styled.div`
  box-sizing: border-box;
  display:flex;
  align-items: center;
  width: 100%;
  height: 140px;
  margin: 10px auto 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  box-shadow: 1px 1px 1px #0d0d0d38;
  font-size: 18px;
  overflow:hidden;

  span{
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: -20px 0px 5px 0px;
    font-size: 0.8em;
    color: #aaa;
  }

  &:hover {
    box-shadow: 3px 3px 5px #0d0d0d38;
  }
`

const AlertContent = styled.div`
  width: 75%;
`

const Thumbnails = styled.div`
  height: 110px;
  width: 110px;
  margin: 10px 30px 10px 10px;
  border-radius: 5px;
  background: url(${(props) => props.posts? (props.posts.find((p) => p.id === props.post_id).postImg) : ''});
  background-size: cover;
  cursor:pointer;
`

const DeleteBtn = styled.span`
  font-size: 50px;
  right: 10px;
  top: 0px;
  color: #aaa;
  cursor:pointer;
`


export default MyAlert