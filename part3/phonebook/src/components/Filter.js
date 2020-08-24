import React from 'react'

const Filter = (props) => {
    console.log(props, )
    const {newFilter,handleFilterChange} = props
    return(
        <>
            filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </>  
    )
}

export default Filter