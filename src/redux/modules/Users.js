import {createSlice} from '@reduxjs/toolkit'

const Users = createSlice({
  name: '테스터',
  initialState: [{
    user_id: 'test@test.com',
    nickname: '리덕스수현이',
    profile_img: 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/profileImg%2F1654513587348?alt=media&token=2be9e383-979e-4151-ae08-ed6bf42bd931',
    alerts: []
  }],
  reducers: {
  }
})

export const {} = Users.actions
export default Users.reducer