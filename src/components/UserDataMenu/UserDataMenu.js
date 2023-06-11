import React, { useState, useEffect } from 'react'
import './UserDataMenu.css'
import './FormTemplate.css'

import MenuPage from './../MenuPage/MenuPage'
import { getUserID, LogOut, getToken} from '../../parseToken'
import FormElement from './FormElement'
import { TailSpin } from 'react-loader-spinner'
import InfoBox from './../InfoBox/InfoBox'

const UserDataMenu = ({closeMenu, setToken}) => {

    const [formValues, setFormValues] = useState({
        name: "",
        surname: "",
        password: "",
        email: ""
    })

    const [isInChange, setIsInChange] = useState(false)

    const form_imputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Imię",
            placeholder: "Imię",
            errorMessage: ""
        },
        {
            id:2,
            name: "surname",
            type: "text",
            label: "Nazwisko",
            placeholder: "Nazwisko",
            errorMessage: ""
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Hasło",
            placeholder: "Hasło",
            errorMessage: ""
        },
        {
            id:4,
            name: "email",
            type: "text",
            label: "Email",
            placeholder: "Email",
            errorMessage: ""
        },
    ]

    const ChangeUserData = async () => {
        
        setIsInChange(true)

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            setToken(null);
            window.location.reload();   
        }         

        await fetch( "https://kgp-ticketapp.azurewebsites.net/users/editClient/" + id, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            },
            body: JSON.stringify(formValues),
        }).then ( async (response) => {

            if (response.status === 200) {

                console.log("UDALO SIE!!!!");
            }
            else {
                console.log("NIEOBSŁUŻONY BŁĄD");
            }
        }).catch((e) => {
            console.log("UPS!")
        })

        setIsInChange(false)
    }

    const getUserData = async () => {
        
        setIsInChange(true)

        const id = getUserID();
        const token = getToken();

        if (!token || !id) {
            LogOut()
            setToken(null);
            window.location.reload();   
        }            

        await fetch("https://kgp-ticketapp.azurewebsites.net/users/clients/" + id, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.toString()
            }
        })
        .then( async (response) => {
            
            if (response.status === 200) {
                const body = await response.json()
                console.log(body);

                setFormValues({...formValues, 'name': body.name, 'surname': body.surname})
            }
            else {
                console.log("NIEOBSŁUŻONY BŁĄD");
            }
        })
        .catch((e) => {
            console.log("UPS!")
        })

        setIsInChange(false)
    }

    const FromValueChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        console.log('useEffect ran');

        getUserData();
    })

    return(
        <MenuPage closeMenu={closeMenu}>
            <div id='user-data-menu'>
                <h2>Moje Dane</h2>

                <div id='user-data-menu-form'>
                    <form className="t-form">
                        {form_imputs.map((input) => (
                            <FormElement key={input.id} {...input} value={formValues[input.name]} onChange={FromValueChange}/>
                        ))}
                        {
                            !isInChange ?
                            <button type="submit" 
                                className='t-accept-button'
                                style={{float : "right", width: "150px"}} 
                                onClick={(e) => {e.preventDefault(); ChangeUserData();} }> Zapisz </button> :
                            <TailSpin height="30" width="30" color="#5a91ff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="t-accept-button" visible={true} />
                        }
                    </form>
                    <InfoBox title="Testowy nagłówek"> 
                        <div>Zawartość</div>
                    </InfoBox>
                </div>
            </div>
        </MenuPage> 
    )
}

export default UserDataMenu;