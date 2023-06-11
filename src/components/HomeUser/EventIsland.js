import React, { useState } from 'react'
import "./EventIsland.css";
import "./../UserDataMenu/FormTemplate.css"
import { TailSpin } from 'react-loader-spinner'
import {getToken, LogOut, getUserID} from './../../parseToken'

const EventIsland = (props) => {

    const {name, date, place, participantsLimit, price, saleStartDate, saleEndDate, id} = props

    const [load, setLoad] = useState(false);

    const BuyTicket = async (e) => {
        e.preventDefault();

        setLoad(true);

        const user_id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            props.setToken(null);
            window.location.reload();   
        }       
        
        await fetch("https://kgp-ticketapp.azurewebsites.net/tickets", 
        {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            } ,
            body: JSON.stringify({'eventId': id, 'userId': user_id})
        })
        .then( (res) => {
            
            if (res.status === 200) {
                alert("Bilet został pomyślnie zakupiony");
            }
            else 
            {
                alert("Ups, coś poszło nie tak, spróbuj ponownie");
            }

        })
        .catch( () => {
            console.log("NIEPRZEWIDZIANA SYTUACJA");
        })

        setLoad(false);
    }

    return (
        <div id="EventIsland">
            <div id="EventInfo-inner"> 
                <div id="EventInfo-front">
                    <div style={{margin: "5px"}}>
                        <div style={{marginBottom: "25px", fontWeight: "bold", fontSize: "20px"}}>{name}</div>
                        <div>Data: <strong>{date.substring(0, date.indexOf("T"))}</strong></div>
                        <div>Miejsce: <strong>{place}</strong></div>
                    </div>
                    <div>
                        Fotka
                    </div>
                </div>
                <div id="EventInfo-back">
                    <div>Limit miejsc: {participantsLimit}</div>
                    <div>Cena: {price} zł</div>
                    <div>Data rozpoczęcia sprzedaży: {saleStartDate.substring(0, saleStartDate.indexOf("T"))} </div>
                    <div>Data zakończenia sprzedaży: {saleEndDate.substring(0, saleEndDate.indexOf("T"))} </div>

                    { 
                        !load ?
                        <button className='t-accept-button' onClick={BuyTicket}>Kup Bilet</button>
                        :
                        <div style={{width: "100%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}> 
                            <TailSpin height="40" width="40" color="#5a91ff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}}  visible={true} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EventIsland;