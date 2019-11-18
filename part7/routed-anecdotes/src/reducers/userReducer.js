// import { generateID } from "../utils/tools"

export const loginUser = username => {
	return async dispatch => {
		dispatch({
			type: "LOGIN",
			data: username,
		})
	}
}

export const logoutUser = username => {
	return async dispatch => {
		dispatch({
			type: "LOGOUT",
		})
	}
}

const userReducer = (state = {}, action) => {
	let newState

	switch (action.type) {
		case "LOGIN":
			newState = { username: action.data }
			return newState
		case "LOGOUT":
			newState = {}
			return newState
		default:
			return state
	}
}

export default userReducer
