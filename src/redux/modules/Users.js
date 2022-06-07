import {createSlice} from '@reduxjs/toolkit'

const Users = createSlice({
  name: '테스터',
  initialState: [{
    user_id: 'test@test.com',
    nickname: '리덕스수현이',
    profile_img: 'https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-b15c2.appspot.com/o/profileImg%2F1654513587348?alt=media&token=2be9e383-979e-4151-ae08-ed6bf42bd931',
    alerts: [[1654563257483, 'https://firebasestorage.googleapis.com/v0/b/sparta…=media&token=bf2323b0-00bd-4231-abf6-273850dcc760', 'test@test.com', 'Like']]
  }],
  reducers: {
    newAlerts: (state, action) =>{
      state.map((u) => u.user_id === action.payload[0] ? u.alerts.push(action.payload[1]) : u)
      console.log(action.payload[1])
    },
    removeAlerts: (state, action) =>{
      state.forEach((u) => {
        if(u.user_id === action.payload[0]){
          u.alerts = u.alerts.filter((a) => a[0] !== action.payload[1][0])
        } })
    }
  }
})

export const {newAlerts, removeAlerts} = Users.actions
export default Users.reducer