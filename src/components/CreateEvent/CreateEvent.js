import React, { useEffect, useState } from 'react'
import { getToken, LogOut, getUserID } from '../../parseToken'

const CreateEvent = (props) => {

    if (!getToken()) {
        props.setToken(null);
        window.location.reload();
    }

    const [organizerData, setOrganizerData] = useState(null);

    const responseBody = {};

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const inputChangeHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.forEach((value, property) => responseBody[property] = value);
        //Form submission happens here
        const token = getToken();
        responseBody.organizerId = getUserID();
        debugger;
        responseBody.photo = await convertBase64(responseBody.photo);;

        let date = new Date(responseBody.date);

        date.setHours(responseBody.time.substr(0, 2));
        date.setMinutes(responseBody.time.substr(3, 2));

        responseBody.date = date.toISOString();
        responseBody.saleStartDate = new Date(responseBody.saleStartDate).toISOString();
        responseBody.saleEndTime = new Date(responseBody.saleEndTime).toISOString();

        responseBody.price = Number(responseBody.price);
        responseBody.participiantsLimit = Number(responseBody.participiantsLimit);

        console.log(responseBody);
        fetch("https://kgp-ticketapp.azurewebsites.net/events", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            },
            body: JSON.stringify(responseBody),
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
                        <th>Time</th><th><input name='time' type='time' required></input></th>
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
                        <th>Sale start</th><th><input name='saleStartDate' type='date' min="2023-01-01" max="2069-12-31" required></input></th>
                    </tr>
                    <tr>
                        <th>Sale end</th><th><input name='saleEndTime' type='date' min="2023-01-01" max="2069-12-31" required></input></th>
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