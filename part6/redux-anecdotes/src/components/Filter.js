import React from 'react'
import { changeFilter, removeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        event.target.value !== '' ? props.changeFilter(event.target.value) : props.removeFilter()
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    changeFilter,
    removeFilter
}
const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter