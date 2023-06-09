import React, { useEffect, useState } from 'react'
import MenuPage from './../MenuPage/MenuPage'
import './MyTiketsMenu.css'
import { getUserID, LogOut, getToken} from '../../parseToken'
import { TailSpin } from 'react-loader-spinner'

const MyTiketsMenu = ({closeMenu, setToken}) => {

    const [myTickets, setMyTickets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    const getUserTikets = async () => {

        setIsLoading(true)

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            setToken(null);
            window.location.reload();   
        }         

        await fetch("https://kgp-ticketapp.azurewebsites.net/ticketsByOwner/" + id, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }
        }).then ( async (response) => {

            if (response.status === 200) {
                const body = await response.json()
                console.log(body);
            } else if (response.status == 404) {
                // Brak biletów 
                
            } 
            else {
                console.log("Wystąpił błąd :(((")
            }
            
        }).catch((e) => {
            console.log("Wystąpił jakiś bardzo nie przyjemny błąd")
        })


        setIsLoading(false)
    }


    const getTicketDetails = (ticketID) => {
        
        setIsDetailLoading(true);

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            setToken(null);
            window.location.reload();   
        }   

        // Dopisać pobieranie szczegółów biletów 

        setIsDetailLoading(false);
    }


    useEffect(() => {
        getUserTikets();
    }, [])

    return (
        <MenuPage closeMenu={closeMenu}>
            <div style={{padding: "20px"}}>
                <h2>Moje Bilety</h2>

                <div className='tickets-grid'>
                    <div className='Ticket'> 
                        { 
                            isLoading 
                            ? 
                            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TailSpin height="100" width="100" color="#5a91ff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}}  visible={true} /> 
                            </div> 
                            :
                            ( 
                                (myTickets != null) ? 
                                "BILETY SĄ" : 
                                "Ups, wygląda na to że nie posiadasz żadnego biletu, ale zawsze możesz to zmienić :)" )
                            
                        } </div>
                    <div className='Ticket-Details'> Detale </div>
                </div>
            </div>
        </MenuPage> 
    )
}

export default MyTiketsMenu;