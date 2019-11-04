const initialState = { good: 0, neutral: 0, bad: 0 }

const reducer = (state = initialState, action) => {
  let newState = {}
  switch ( action.type ) {
    case 'GOOD':
      newState = { ...state, good: state.good + 1}
      return newState
    case 'NEUTRAL':
      newState = { ...state, neutral: state.neutral + 1}
      return newState
    case 'BAD':
      newState = { ...state, bad: state.bad + 1}
      return newState
    case 'ZERO': 
      newState = { good: 0, neutral: 0, bad: 0 }
      return newState
    default :
      return state
  }
}

export default reducer