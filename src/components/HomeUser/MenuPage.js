import React from 'react'
import './MenuPage.css'


class MenuPage extends React.Component
{


    render() {
        return(
            <div id="menu-page">
                <div id="menu-page-island">
                    {this.props.children}
                    <button type="button" id="btn-close" onClick={this.props.closeMenu}>
                        <span id="icon-cross"></span>
                    </button>
                </div>
            </div>
        )
    }
}

export default MenuPage;