import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

export default store