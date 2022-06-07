import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { db } from '../../firebase'
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'


const Responses = createSlice({
  name: 'Responses',
  initialState: {list:[]},
  reducers : {},
  extraReducers: {
  }
})

export const {} = Responses.actions
export default Responses.reducer