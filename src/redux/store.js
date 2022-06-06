import {configureStore} from '@reduxjs/toolkit'
import Magazine from './modules/Magazine'
import Users from './modules/Users'

const store = configureStore({reducer:{magazinePosts:Magazine, users:Users}})

export default store