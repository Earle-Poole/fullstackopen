//React imports
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
//Reducers
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
	blogsByUser: blogReducer,
	notification: notificationReducer,
	loggedUser: userReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
