const notificationAtStart = ['', 0]

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type){
        case 'ADD_NOTIFICATION':
            if (state[1] !== 0) clearTimeout(state[1])
            return [action.data.notification, 0]
        case 'REMOVE_NOTIFICATION':
            return ['', 0]
        case 'ADD_TIMEOUT':
            const id = action.data.id
            return [state[0], id]
        default:
            return state
    }
}

export const addNotification = (notification, time) => {
    return async dispatch => {
        await dispatch({
            type: 'ADD_NOTIFICATION',
            data : { notification }
        })
        const id = setTimeout(() => dispatch({
            type: 'REMOVE_NOTIFICATION'
        }) , time*1000)
        dispatch({
            type: 'ADD_TIMEOUT',
            data : { id }
        })
    }
}

export default notificationReducer
