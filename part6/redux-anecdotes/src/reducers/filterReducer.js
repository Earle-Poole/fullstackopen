const initialFilter = {
  string: '',
  style: {
    marginBottom: 10
  }
}

export const filteringString = string => {
  return {
    type: "FILTER",
    string: string
  }
}

const filterReducer = (state = initialFilter, action) => {
  switch ( action.type ) {
    case 'FILTER':
      return { ...state, string: action.string }
    default:
      return state
  }
}

export default filterReducer