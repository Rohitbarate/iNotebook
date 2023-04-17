import React from 'react'

const messageBox = (props) => {
    const {msg,type} = props.message
    return (
        <div style={{width:'max-content',position:'absolute',top:'15vh',right:'50px'}}>
            <div className={`alert alert-${type}`} role="alert">
               {msg}
            </div>
        </div>
    )
}

export default messageBox