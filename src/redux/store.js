import {configureStore} from '@reduxjs/toolkit'
import Magazine from './modules/Magazine'
import Responses from './modules/Responses'

const store = configureStore({reducer:{magazinePost:Magazine, Responses:Responses}})

export default store