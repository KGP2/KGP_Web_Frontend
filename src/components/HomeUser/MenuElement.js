import React from 'react'
import './MenuElement.css'

const MenuElement = ({title, beforeContent, onClick}) => {

    return (
        <div className='menu-element' onClick={onClick}>
            <img src={beforeContent} alt="img" height="25" width="25"/>
            <div>{title}</div>
        </div>
    )
}

export default MenuElement;