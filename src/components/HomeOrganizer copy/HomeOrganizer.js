import React, { useEffect, useState } from 'react'
import { getToken, LogOut, getUserID } from '../../parseToken'

const HomeOrganizer = (props) => {

    if (!getToken()) {
        props.setToken(null);
        window.location.reload();
    }

    const [organizerData, setOrganizerData] = useState(null);
    const [eventsData, setEventsData] = useState(null);

    const getOrganizerData = async (e) => {
        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            props.setToken(null);
            window.location.reload();
        }

        await fetch("https://kgp-ticketapp.azurewebsites.net/users/organizers/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }
        }).then(async (response) => {

            if (response.status === 200) {
                const body = await response.json()
                console.log(body);
                setOrganizerData(body);
            }
            else {
                console.log("Jakiś błąd :(");
            }

        }).catch((error) => {
            console.log("Jakiś błąd tylko gorszy :(");
        });
    };

    const getEventsData = async (e) => {
        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            props.setToken(null);
            window.location.reload();
        }

        await fetch("https://kgp-ticketapp.azurewebsites.net/eventsByOrganizer/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }
        }).then(async (response) => {

            if (response.status === 200) {
                const body = await response.json()
                console.log(body);
                setEventsData(body);
            }
            else {
                console.log("Jakiś błąd :(");
            }

        }).catch((error) => {
            console.log("Jakiś błąd tylko gorszy :(");
        });
    };

    useEffect(() => {
        getOrganizerData();
        getEventsData();
    }, []);

    const renderEventsList = () => {
        let tr = [];
        if (eventsData !== null) {
            for (let event of eventsData) {
                tr.push(<tr>{event.name}</tr>);
            }
        }
        return tr;
    }

    return (
        <>
            <h1>Hello {organizerData?.companyName}</h1>
            <h2>Your events:</h2>
            <button>Nowe wydarzenie</button>
            <table>
                {renderEventsList()}
            </table>
        </>

    )
}

export default HomeOrganizer;