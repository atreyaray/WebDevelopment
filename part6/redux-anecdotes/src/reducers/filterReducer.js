const filterAtStart = ''

export const changeFilter = (newFilter) => {
    console.log('filter changed')
     return{
         type: 'CHANGE_FILTER',
         data:{
             filter: newFilter
         }
     }
}

export const removeFilter = () => {
    return {
        type: 'REMOVE_FILTER'
    }
}

const filterReducer = (state = filterAtStart, action) => {
    switch (action.type){
        case 'CHANGE_FILTER':
            return action.data.filter
        case 'REMOVE_FILTER': 
            return ''
        default:
            return state
    }
}


export default filterReducer