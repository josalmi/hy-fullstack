import React from 'react'

const Notification = ({ message, error = false }) => {
    if (message === null) {
        return null
    }
    return (
        <div style={{ color: error ? 'red' : 'green', background: 'lightgrey', fontSize: '20px', borderRadius: '5px', padding: '10px', marginBottom: '10px'}}>
            {message}
        </div>
    )
}

export default Notification