import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { db } from '../../firebase'
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'


export const loadPostFB = createAsyncThunk(
  'loadPost',
  async () => {
    const postListsFB = await getDocs(collection(db, 'magazinePost'))

    let myPostList = []

    postListsFB.forEach((doc) => {
      myPostList.push({id: doc.id, ...doc.data()})
    })

    return myPostList;
  }
);

export const createPostFB = createAsyncThunk(
  'createPost',
  async (postData) => {
    const docRef = await addDoc(collection(db, 'magazinePost'), postData)
    const newPost = {id: docRef.id, ...postData}
    return newPost;
  }
);

export const editPostFB = createAsyncThunk(
  'editPost',
  async (postData) => {
    const docRef = doc(db, 'magazinePost', postData.id)
    await updateDoc(docRef, {...postData})
    return postData;
  }
);

export const deletePostFB = createAsyncThunk(
  'deletePost',
  async (postId) => {
    const docRef = doc(db, 'magazinePost', postId)
    await deleteDoc(docRef)
    return postId;
  }
);

export const addLikeFB = createAsyncThunk(
  'addLike',
  async (likeData) => {
    const docRef = doc(db, 'magazinePost', likeData[0])
    const likeList = (await getDoc(docRef)).data().likedBy
    const newLike = likeData[1]

    await updateDoc(docRef, {likedBy:[...likeList,newLike]})

    return likeData
  }
);

export const unLikeFB = createAsyncThunk(
  'unLike',
  async (likeData) => {
    const docRef = doc(db, 'magazinePost', likeData[0])
    const likeList = (await getDoc(docRef)).data().likedBy
    const userId = likeData[1]
    const new_list = likeList.filter((u) => u !== userId)

    await updateDoc(docRef, {likedBy:[...new_list]})

    return [likeData[0], new_list]
  }
);

const Magazine = createSlice({
  name: 'magazinePost',
  initialState: {list:[]},
  reducers : {},
  extraReducers: {
    [loadPostFB.fulfilled] : (state, { payload }) => {
      state.list = payload
    },

    [createPostFB.fulfilled] : (state, { payload }) => {
      state.list = state.list.push(payload)
    },

    [editPostFB.fulfilled] :  (state, { payload }) => {
      state.list.map((p) =>  p.id === payload.id ? {...p, ...payload} : p )
    },

    [deletePostFB.fulfilled] :  (state, { payload }) => {
      state.list.filter((p) =>  p.id !== payload)
    },

    [addLikeFB.fulfilled] : (state, { payload }) => {
      state.list.forEach((p) => { 
        if(p.id === payload[0]) {
          p.likedBy.push(payload[1])}
        })
    },

    [unLikeFB.fulfilled] : (state, { payload }) => {
      state.list.forEach((p) => { 
        if(p.id === payload[0]) {
          p.likedBy = payload[1]}
        })
    },
  }
})

export const {createPost, readPosts, addLike, unLike} = Magazine.actions
export default Magazine.reducer