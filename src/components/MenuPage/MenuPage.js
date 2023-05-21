import React from 'react'
import './MenuPage.css'


class MenuPage extends React.Component
{


    render() {
        return(
            <div className="menu-page">
                <div className="menu-page-island">
                    {this.props.children}
                    <button type="button" className="btn-close" onClick={this.props.closeMenu}>
                        <span className="icon-cross"></span>
                    </button>
                </div>
            </div>
        )
    }
}

export default MenuPage;