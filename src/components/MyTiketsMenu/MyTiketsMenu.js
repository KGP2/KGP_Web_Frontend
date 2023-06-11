import React, { useEffect, useState } from 'react'
import MenuPage from './../MenuPage/MenuPage'
import './MyTiketsMenu.css'
import { getUserID, LogOut, getToken} from '../../parseToken'
import { TailSpin } from 'react-loader-spinner'

const MyTiketsMenu = ({closeMenu, setToken}) => {

    const [myTickets, setMyTickets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [detail, setDetail] = useState(null);

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
                setMyTickets(body);
            } else if (response.status === 404) {
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


    const getTicketDetails = async (eventID) => {
        
        setIsDetailLoading(true);

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            setToken(null);
            window.location.reload();   
        }   

        // Dopisać pobieranie szczegółów biletów 

        await fetch("https://kgp-ticketapp.azurewebsites.net/events/" + eventID, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }
        }).then ( async (response) => {

            if (response.status === 200) {
                const body = await response.json()
                setDetail(body);
            }
            else {
                console.log("Nie no coś poszło nie tak niestety, trudno :(");
            }
        }).catch((e) => {
            console.log("Wystąpił jakiś bardzo nie przyjemny błąd")
        })

        setIsDetailLoading(false);
    }

    const downloadPDF = ( (dupa) => {
        window.open(dupa, "_blank");
    }) 

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
                                <>
                                    {
                                        myTickets.map( (bilet) => 
                                            <div> 
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th> ID Biletu </th>
                                                            <th> {bilet.ticketId} </th>
                                                            <th> 
                                                                <button onClick={(e) => 
                                                                    {e.preventDefault(); downloadPDF(bilet.ticketPdfUrl); }}>
                                                                Pobierz bilet w PDF
                                                                </button> 
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th> ID Wydarzenia </th>
                                                            <th> {bilet.eventId} </th>
                                                            <th> 
                                                                <button onClick={(e) => 
                                                                {
                                                                    e.preventDefault();
                                                                    getTicketDetails(bilet.eventId);
                                                                }}>
                                                                    Zobacz szczegóły 
                                                                </button> 
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                
                                            </div>
                                        )
                                    }
                                </>
                                : 
                                "Ups, wygląda na to że nie posiadasz żadnego biletu, ale zawsze możesz to zmienić :)" 
                            )
                            
                        } </div>
                    <div className='Ticket-Details'> 
                        {
                            isDetailLoading ? 
                            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <TailSpin height="100" width="100" color="#5a91ff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}}  visible={true} /> 
                            </div>
                            :
                            (
                                detail ? 
                                    <div style={{display: "Flex", flexDirection: "column"}}>
                                            <div>
                                                <span>Data: </span>
                                                <span>{detail.date}</span>
                                            </div>
                                            <div>
                                                <span>Nazwa: </span>
                                                <span>{detail.name}</span>
                                            </div>
                                            <div>
                                                <span>ID organizatora: </span>
                                                <span>{detail.organizerId}</span>
                                            </div>
                                            <div>
                                                <span>Początek sprzedarzy: </span>
                                                <span>{detail.saleStartDate}</span>
                                            </div>
                                            <div>
                                                <span>Początek koniec sprzedarzy: </span>
                                                <span>{detail.saleEndDate}</span>
                                            </div>
                                            <div>
                                                <span>Miejsce: </span>
                                                <span>{detail.place}</span>
                                            </div>
                                            <div>
                                                <span>Cena: </span>
                                                <span>{detail.price}</span>
                                            </div>
                                            <div>
                                                <span>Limit Uczęstników: </span>
                                                <span>{detail.participantsLimit}</span>
                                            </div>
                                    </div>
                                    :
                                "Detale"
                            )
                        }  </div>
                </div>
            </div>
        </MenuPage> 
    )
}

export default MyTiketsMenu;