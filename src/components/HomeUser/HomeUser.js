import React, {useState, useRef} from 'react'
import {getToken} from './../../parseToken'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import PropoverElement from './PropoverElement'

import "./HomeUser.css";

const HomeUser = (props) => {
    
    if (!getToken()) {
        props.setToken(null);
        window.location.reload();   
    } 

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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
                            arrowColor={'blue'}
                            arrowSize={10}
                            arrowStyle={{ opacity: 0.7 }}
                            className='popover-arrow-container'
                            arrowClassName='popover-arrow'
                        >
                            <div className="propover-menu">
                                <PropoverElement title={"Moje Dane"} beforeContent={'url(./../../../public/propover/gear.svg)'}/>
                                <PropoverElement title={"Moje bilety"} beforeContent={'🔗'}/>
                                <PropoverElement title={"Wyloguj się"} beforeContent={'🔗'}/>
                                </div>
                        </ArrowContainer>
                  )}
                    >
                    <div className="propover-element" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                        Menu
                    </div>
                </Popover>
                </div>
                <div>Dupa4</div>
                <div>Dupa5</div>
                <div>Dupa6</div>
            </div>
        </div>
    )
}

export default HomeUser;