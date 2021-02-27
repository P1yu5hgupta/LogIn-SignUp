import { createStore } from 'redux'
import reducer from './reducers/reducers'

const getStore = () => createStore(reducer)

export default getStore