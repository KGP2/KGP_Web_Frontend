import React from 'react'
import {getToken} from './../../parseToken'

const HomeUser = (props) => {
    
    if (!getToken()) {
        props.setToken(null);
        window.location.reload();   
    } 

    return(
        <div>
            JESTEM W DOMU UŻYTKOWNIKA!!!!
        </div>
    )
}

export default HomeUser;