import React, {useState} from 'react'
import {getToken, LogOut} from './../../parseToken'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import MenuElement from './MenuElement'
import UserDataMenu from '../UserDataMenu/UserDataMenu'

import "./HomeUser.css";

const HomeUser = (props) => {
    
    if (!getToken()) {
        props.setToken(null);
        window.location.reload();   
    } 

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const [MenuNum, setMenuNum] = useState(0)
    const closeMenu = () => {
        setMenuNum(0);
    }

    const renderMenuPage = (num) => {
        switch(num) {
            case 1:
                    console.log("WCHODZĘ DO 1")
                    return <UserDataMenu closeMenu={closeMenu}/>
            default:
                return <></>
        }
    }

    // -------------------------
    //          RENDER
    // -------------------------
    return(
        <div id="wrapper">
            <div id="island">
                <div>Dupa1</div>
                <div>Dupa2</div>
                <div>
                <Popover
                    isOpen={isPopoverOpen}
                    positions={['bottom']} // preferred positions by priority
                    padding={5}
                    reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                    content={ ({ position, childRect, popoverRect }) => ( // you can also provide a render function that injects some useful stuff!
                            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                            position={position}
                            childRect={childRect}
                            popoverRect={popoverRect}
                            arrowColor={'#5a91ff'}
                            arrowSize={10}
                            arrowStyle={{ opacity: 1 }}
                            className='popover-arrow-container'
                            arrowClassName='popover-arrow'
                        >
                            <div className="propover-menu">
                                <MenuElement title={"Moje Dane"} beforeContent={"./menu/person.svg"} 
                                    onClick={() => { 
                                        setIsPopoverOpen(false)
                                        setMenuNum(1)
                                    }} 
                                />
                                <MenuElement title={"Moje bilety"} beforeContent={"./menu/ticket.svg"}
                                    onClick={() => { 
                                        setIsPopoverOpen(false)
                                        setMenuNum(2) 
                                    }}
                                />
                                <MenuElement title={"Wyloguj się"} beforeContent={"./menu/log-out.svg"}
                                    onClick={() => { 
                                        setIsPopoverOpen(false)
                                        LogOut()
                                        props.setToken(null);
                                        window.location.reload();   
                                        }} 
                                />
                            </div>
                        </ArrowContainer>
                  )}
                    >

                    <div className="propover-element" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                        <MenuElement title={"Menu"} beforeContent={"./menu/gear.svg"}/>
                    </div>
                </Popover>
                </div>
                <div>Dupa4</div>
                <div>Dupa5</div>
                <div>Dupa6</div>

                { MenuNum !== 0 ? renderMenuPage(MenuNum) : null }
            </div>
        </div>
    )
}

export default HomeUser;