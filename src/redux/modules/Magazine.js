import {createSlice} from '@reduxjs/toolkit'
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'

const Magazine = createSlice({
  name: 'magazinePosts',
  initialState: [{
    postedBy: 'test@test.com',
    profileImg: 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/profileImg%2F1654512372409?alt=media&token=f9ea42a0-f601-4329-946a-1d326b0b3aac',
    postImg: 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/images%2F20220528_185915.png?alt=media&token=bf2323b0-00bd-4231-abf6-273850dcc760',
    postTxt: '여기에 포스트의 텍스트 내용이 들어갑니다',
    postDate: '2022-06-06',
    likedBy: [],
    layout: 'Top'
  }],
  reducers : {    
    readPosts: (state, action) =>{
    console.log('로딩테스트')
  },
  createPost: (state, action) =>{
    console.log(action.payload)
    state = state.push(action.payload)
  },
  addLike: (state, action) =>{
    state.map((p,i) => i === action.payload[0] ? p.likedBy.push(action.payload[1]) : p)
  },
  unLike: (state, action) =>{
    state.forEach((p,i) => {
      if(i === action.payload[0]){
        p.likedBy = p.likedBy.filter((l) => l !== action.payload[1])
      } })
  }},
  extraReducers: {

  }
})

export const {createPost, readPosts, addLike, unLike} = Magazine.actions
export default Magazine.reducer