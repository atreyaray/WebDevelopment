const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type){
        case 'ADD_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return ''
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
        setTimeout(() => dispatch({
            type: 'REMOVE_NOTIFICATION'
        }) , time*1000)
    }
}

export default notificationReducer
