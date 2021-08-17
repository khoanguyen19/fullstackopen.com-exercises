import React from 'react'

const Notification = ({ message, status }) => {
    if(message === null) {
        return null
    } else {
        return (
            <div className={status}>
                {message}
            </div>
        )
    } 
}

export default Notification