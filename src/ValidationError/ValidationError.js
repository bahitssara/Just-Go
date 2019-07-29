import React from 'react'


export default function ValidationError(props) {
    if(props.hasError) {
        return(
            <div className='validation-error'>
            {props.message}
            </div>
        );
    }
    return<></>
}