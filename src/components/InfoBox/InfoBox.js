import React from 'react'
import './InfoBox.css'

class InfoBox extends React.Component
{


    render() {
        return (
            <div class="InfoBox">
                <div class="InfoBox-title">{this.props.title}</div>
                <div class="InfoBox-content">{this.props.children}</div>
            </div>
        )
    }
}

export default InfoBox