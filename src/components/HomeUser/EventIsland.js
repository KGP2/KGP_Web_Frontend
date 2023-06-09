import React from 'react'
import "./EventIsland.css";
import "./../UserDataMenu/FormTemplate.css"

const EventIsland = (props) => {

    const {name, date, place, participantsLimit, price, saleStartDate, saleEndDate, ...inputProps} = props

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

                    <button className='t-accept-button'>Kup Bilet</button>
                </div>
            </div>
        </div>
    )
}

export default EventIsland;