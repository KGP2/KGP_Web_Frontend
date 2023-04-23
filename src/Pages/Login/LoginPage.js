import React, { useState } from 'react'
import { useRef } from 'react';

// my styles
import "./LoginPage.css";

// my components
import FormInput from './FormInput';

const LoginPage = () => {

    const reg_button_ref = useRef(null);
    const [tryLogin, setTryLogin] = useState(true); 
    const [LoginAsCommonUser, setLoginAsCommonUser] = useState(true);

    const RegistrationClick = () => {
        if (reg_button_ref != null) {
            reg_button_ref.current.style.left = '0%';
            setTryLogin(false);
        }
    }

    const LogInClick = () => {
        if (reg_button_ref != null) {
            reg_button_ref.current.style.left = '50%';
            setTryLogin(true);
        }
    }

    // -------------------------
    //       LOGIN FORM
    // -------------------------

    const [Login, setLogin] = useState(
        {
            email: "",
            password: "" 
        }
    )

    const Login_inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "adres mailowy",
            label: "Email",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "hasło",
            label: "Hasło",
            required: true
        }
    ]

    const Login_inputs_OnChange = (e) => {
        setLogin({...Login, [e.target.name]: e.target.value});
    }

    const LoginUser = async (e) => {
        e.preventDefault();


        if (LoginAsCommonUser) {
            fetch("https://kgp-ticketapp.azurewebsites.net/users/clients/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Login),
            }).then( (response) => {
                console.log("JESTEM W then");
                console.log(response);
                
            }).catch( (response) => {
                console.log("JESTEM W catch");
                console.log(response);
            })  
        }
        else {
            fetch("https://kgp-ticketapp.azurewebsites.net/users/organizers/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Login),
            }).then( (response) => {
                console.log("JESTEM W then");
                console.log(response);
                
            }).catch( (response) => {
                console.log("JESTEM W catch");
                console.log(response);
            })  
        }
    }

    // -------------------------
    //    Registration Form
    // -------------------------

    const [Registration, setRegistration] = useState(
        {
            name: "",
            surname: "", 
            email: "string",
            password: "password",
            user: true,
            dateOFBirth: "",
            companyName: "" 
        }
    )

    const Registration_inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "imię",
            label: "Imię",
            required: true
        },
        {
            id: 2,
            name: "surname",
            type: "text",
            placeholder: "nazwisko",
            label: "Nazwisko",
            required: true
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "adres mailowy",
            label: "Email",
            required: true
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "hasło",
            label: "Hasło",
            required: true
        }
    ]

    const Registration_inputs_OnChange = (e) => {
        setRegistration({...Registration, [e.target.name]: e.target.value});
    } 

    const Registration_user_change = (e) => {
        setRegistration({...Registration, user: !Registration.user});
    }

    const RegisterUser = async (e) => {
        e.preventDefault();

        let body = {
            name: Registration.name,
            surname: Registration.surname,
            email: Registration.email,
            password: Registration.password
        };

        if (Registration.user) {
            // Rejestrujemy zwykłego użytkownika
            body = {...body, dateOFBirth: Registration.dateOFBirth + "T16:29:40.472Z"};

            console.log("body = ", body);
            fetch("https://kgp-ticketapp.azurewebsites.net/users/registerClient", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }).then( (response) => {
                console.log(response);
            }).catch( (response) => {
                console.log(response);
            })  
        } else {
            // Rejestrujemy Organizatora
            body = {...body, companyName: Registration.companyName};

            console.log("body = ", body);
            fetch("https://kgp-ticketapp.azurewebsites.net/users/registerOrganizer", {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                Body: JSON.stringify(body),
                Cache: 'default'
            }).then( (response) => {
                console.log(response);
            }).catch( (response) => {
                console.log(response);
            })  
        }
    }

    // -------------------------
    //          RENDER
    // -------------------------
    return (
        <section className='LoginPage_wrapper'>
            <div className='LoginPage_isnald'>
                <div className='LoginPage_login'>
                    <h2>Login</h2>
                    <p>Jeśli posiadasz konto, możesz się zalogować</p>
                    
                    <form className='LoginPage_Loginform'>

                    {Login_inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={Login_inputs[input.name]} onChange={Login_inputs_OnChange}/>
                    ))}

                        <div id='LoginPage_IsOrganizator'>
                            <input type='checkbox' value={!LoginAsCommonUser} onClick={() => {setLoginAsCommonUser(!LoginAsCommonUser)}}></input>
                            <div>Loguje się jako organizator</div>
                        </div>
                        <div id='RememberPassword'>
                            <a>Zapomniałeś hasło?</a>
                        </div>
                        <button type="submit" className='LoginPage_LoginButton' onClick={LoginUser}>
                            Zaloguj się
                        </button>
                    </form>

                    <div>
                        <hr />
                        <p > ALBO </p>
                        <hr />
                    </div>

                    <div>
                        <div>Jeśli nie posiadasz konta ... </div>
                        <button className='LoginPage_Button_Register' onClick={RegistrationClick}>Zarejestruj się</button>
                    </div>

                </div>

                <div className='LoginPage_Register'>
                    <h2>Rejestracja</h2>

                    <form className='LoginPage_Loginform'>

                        {Registration_inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={Registration_inputs[input.name]} onChange={Registration_inputs_OnChange}/>
                        ))}

                        <div>
                            <label>Rejestruję się jako</label>
                            <select value={Registration.user} onChange={Registration_user_change}>
                                <option value={true}>Zwykła osoba</option>
                                <option value={false}>Organizator</option>
                            </select>
                        </div>

                        {Registration.user ? 
                            <FormInput type="date" name="dateOFBirth" placeholder="dd/mm/rrrr" required={true} label="Data urodzenia" onChange={Registration_inputs_OnChange}/> :
                            <FormInput type="text" name="companyName" value={Registration_inputs.companyName} placeholder="Nazwa firmy" required={true} label="Nazwa przedsiębiorstwa" onChange={Registration_inputs_OnChange}/>
                        }

                        <button type="submit" className='LoginPage_LoginButton' id='LoginPage_Register' onClick={RegisterUser}>
                            Rejestruję się
                        </button>
                    </form>
                </div>


                <div ref={reg_button_ref} className='LoginPage_switcher' id='switcher'> 
                    <div>
                        TO JEST TYLKO W CELACH TESTOWYCH
                    </div>
                    {
                        !tryLogin ? 
                            <button className='LoginPage_Button_Login LoginPage_Button_Register' id='LoginPage_return_arrow' onClick={LogInClick}> &#10229; </button> 
                            :
                            null
                    }
                </div>
            </div>
        </section>
    )
}

export default LoginPage;