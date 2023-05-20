import React from 'react'
import './PropoverElement.css'

const PropoverElement = ({title, beforeContent}) => {

    const style_val = "--bg-image: url(" + beforeContent + ")" 

    return (
        <div className='propover-element' data-content={beforeContent}>
            {title}
        </div>
    )
}

export default PropoverElement;