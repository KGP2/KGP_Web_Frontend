import React, {useEffect, useState} from 'react'
import {getToken, LogOut, getUserID} from './../../parseToken'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import MenuElement from './MenuElement'
import UserDataMenu from '../UserDataMenu/UserDataMenu'
import "./EventIsland"
import "./HomeUser.css";
import EventIsland from './EventIsland'
import FormElement from '../UserDataMenu/FormElement'
import { TailSpin } from 'react-loader-spinner'

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
                    return <UserDataMenu closeMenu={closeMenu} setToken={props.setToken}/>
            default:
                return <></>
        }
    }

    const [loadEvents, setLoadEvents] = useState(false);
    const [events, setEvents] = useState(null);
    const [searchParametrs, setSearchParametrs] = useState({
        DateFrom: "",
        DateTo: "",
        Place: ""
    });

    const GetEvents = async (e) => {

        setLoadEvents(true);

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            props.setToken(null);
            window.location.reload();   
        }         


        await fetch("https://kgp-ticketapp.azurewebsites.net/events?" + 
            "DateFrom=" + (searchParametrs.DateFrom != "" ?  searchParametrs.DateFrom + "T00:00:00.000" : "") +
            "&DateTo=" + (searchParametrs.DateTo != "" ?  searchParametrs.DateTo + "T00:00:00.000" : "") +
            "&Place=" + searchParametrs.Place
            , {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }  
        }).then(async (response) => {
            
            if (response.status == 200) {
                const body = await response.json()
                setEvents(body);
            }
            else {
                console.log("Jakiś błąd :(");
            }

        }).catch((error) => {
            console.log("Jakiś błąd tylko gorszy :(");
        });

        setLoadEvents(false);
    }


    useEffect(() => {
        console.log("Use Effect start");

        GetEvents();
    }, [])


    const searchParametrs_Form = [
        {
            id: 1,
            name: "DateFrom",
            type: "date",
            label: "Data Rozpoczęcia",
            placeholder: "",
            errorMessage: ""
        },
        {
            id:2,
            name: "DateTo",
            type: "date",
            label: "Data Zakończenia",
            placeholder: "",
            errorMessage: ""
        },
        {
            id: 3,
            name: "Place",
            type: "text",
            label: "Miejsce",
            placeholder: "miejsce przeprowadzenia",
            errorMessage: ""
        }
    ]

    const searchFormOnChange = (e) => {
        setSearchParametrs({...searchParametrs, [e.target.name]: e.target.value})
    } 

    const search = (e) => {
        e.preventDefault();

        GetEvents();
    }
    // -------------------------
    //          RENDER
    // -------------------------
    return(
        <div id="wrapper">
            <div id="island">
                <div id="SearchBar-container">
                    <input id="SearchBar" 
                            type="text" 
                            placeholder="Wyszukaj wydażenie po nazwie" 
                            name="name" 
                            onChange={(e) => {
                                /* DODAĆ TO!!!! */
                                // console.log(e.target.name) 
                                console.log(e.target.value)
                                }}/>
                    <button className='searchButton'>
                        🔍
                    </button>
                </div>
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
                <div id="scrollable_offers">
                        {
                            loadEvents || !events ?
                            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <TailSpin height="100" width="100" color="#5a91ff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}}  visible={true} /> 
                            </div> :
                            events.map((input) => (
                                <EventIsland key={input.id} {...input}/>
                            ))
                        }
                </div>         
                <div style={{width: "100%", height: "100%"}}>
                    <div>
                        <h3>Kryteria wyszukiwania</h3>
                        <form className="t-form">
                            {searchParametrs_Form.map((input) => (
                                <FormElement key={input.id} {...input} value={searchParametrs[input.name]} onChange={searchFormOnChange}/>
                            ))}
                            <button className='t-accept-button' onClick={search} >Wyszukaj</button>
                        </form>
                    </div>
                </div>

                { MenuNum !== 0 ? renderMenuPage(MenuNum) : null }
            </div>
        </div>
    )
}

export default HomeUser;