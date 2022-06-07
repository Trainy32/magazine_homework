import {configureStore} from '@reduxjs/toolkit'
import Magazine from './modules/Magazine'
import Comments from './modules/Comments'

const store = configureStore({reducer:{magazinePost:Magazine, Comments:Comments}})

export default store