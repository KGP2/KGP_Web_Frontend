import React from 'react'
import {getToken} from './../../parseToken'

import "./HomeUser.css";

const HomeUser = (props) => {
    
    if (!getToken()) {
        props.setToken(null);
        window.location.reload();   
    } 



    // -------------------------
    //          RENDER
    // -------------------------
    return(
        <div className="wrapper">
            JESTEM W DOMU UŻYTKOWNIKA!!!!
        </div>
    )
}

export default HomeUser;