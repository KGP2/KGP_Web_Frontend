import React from 'react'
import './MenuPage.css'


class MenuPage extends React.Component
{


    render() {
        return(
            <div class="menu-page">
                <div class="menu-page-island">
                    {this.props.children}
                    <button type="button" class="btn-close" onClick={this.props.closeMenu}>
                        <span class="icon-cross"></span>
                    </button>
                </div>
            </div>
        )
    }
}

export default MenuPage;