import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { db } from '../../firebase'
import {collection, getDoc, getDocs, addDoc, doc, deleteDoc} from 'firebase/firestore'


export const addCommentFB = createAsyncThunk(
  'addComment',
  async (commentData) => {
    const docRef = await addDoc(collection(db, 'magazineComments'), commentData)
    const newComment = {id: docRef.id, ...commentData}
    return newComment;
  }
);

export const loadCommentFB = createAsyncThunk(
  'loadComment',
  async (postId) => {
    const commentsFB = await getDocs(collection(db, 'magazineComments'))
    const allComments = []

    commentsFB.forEach((c) =>allComments.push({id:c.id, ...c.data()}))
    const commentList = allComments.filter((c) => c.post_id === postId)

    return commentList
  }
);

export const deleteCommentFB = createAsyncThunk(
  'deleteComment', 
  async (commentId) => {
    const docRef = doc(db, 'magazineComments', commentId)
    await deleteDoc(docRef)

    return commentId
  }
)

const Comments = createSlice({
  name: 'Comments',
  initialState: {list:[]},
  reducers : {},
  extraReducers: {
    [addCommentFB.fulfilled] : (state, { payload }) => {
      state.list = state.list.push(payload)
    },
    [loadCommentFB.fulfilled] : (state, { payload }) => {
      state.list = payload
    },
    [deleteCommentFB.fulfilled] : (state, { payload }) => {
      state.list.filter((c) =>  c.id !== payload)
    }
  }
})


export default Comments.reducer