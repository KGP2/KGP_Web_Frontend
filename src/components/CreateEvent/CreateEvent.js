import React, { useEffect, useState } from 'react'
import { getToken, LogOut, getUserID } from '../../parseToken'
import { json } from 'react-router-dom';

const CreateEvent = (props) => {

    if (!getToken()) {
        props.setToken(null);
        window.location.reload();
    }

    const [organizerData, setOrganizerData] = useState(null);

    const responseBody = {};

    const inputChangeHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.forEach((value, property) => responseBody[property] = value);
        //Form submission happens here
        const token = getToken();
        responseBody.organizerId = getUserID();
        responseBody.photo = "";
        responseBody.saleStartDate = Date.now();
        responseBody.saleEndDate = Date.now();
        fetch("https://kgp-ticketapp.azurewebsites.net/events", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            },
            body: responseBody,
        }).then(async (response) => {

            if (response.status === 200) {
                const body = await response.json();
                console.log(body);
                setOrganizerData(body);
            }
            else {
                console.log("Jakiś błąd :(");
            }

        }).catch((error) => {
            console.log("Jakiś błąd tylko gorszy :(");
        });
    }

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
                const body = await response.json();
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

    useEffect(() => {
        getOrganizerData();
    }, []);

    return (
        <>
            <h1>Create new event by {organizerData?.companyName}</h1>
            <form encType='application/json' onSubmit={inputChangeHandler}>
                <table>
                    <tr>
                        <th>Name</th><th><input name='name' type='text' required></input></th>
                    </tr>
                    <tr>
                        <th>Date</th><th><input name='date' type='date' min="2023-01-01" max="2069-12-31" required></input></th>
                    </tr>
                    <tr>
                        <th>Time</th><th><input name='time' type='time' value="20:00" required></input></th>
                    </tr>
                    <tr>
                        <th>Price</th><th><input name='price' type='number' required></input></th>
                    </tr>
                    <tr>
                        <th>Participants limit</th><th><input name='participiantsLimit' type='number' required></input></th>
                    </tr>
                    <tr>
                        <th>City</th><th><input name='city' type='text' required></input></th>
                    </tr>
                    <tr>
                        <th>Street</th><th><input name='street' type='text' required></input></th>
                    </tr>
                    <tr>
                        <th>Place</th><th><input name='place' type='text' required></input></th>
                    </tr>
                    <tr>
                        <th>Photo</th><th><input name='photo' type='file' accept='image/png, image/jpeg, image/jpg'></input></th>
                    </tr>
                    <tr><input type='submit'></input></tr>
                </table>
            </form>
        </>

    )
}

export default CreateEvent;