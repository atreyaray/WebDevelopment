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

export const addNotification = (newNotification) => {
    return {
        type: 'ADD_NOTIFICATION',
        data: {
            notification : newNotification
        }
    }
}
export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: {
            notification: ''
        }
    }
}

export default notificationReducer
