import React from 'react'
import { connect } from 'react-redux'
import { filteringString } from '../reducers/filterReducer'

const Filter = props => {
  const { style } = props
  const handleChange = e => {
    props.filteringString(e.target.value)
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    style: state.filter.style
  }
}

const mapDispatchToProps = {
  filteringString
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter
