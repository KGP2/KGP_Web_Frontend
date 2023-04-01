import React from 'react'
import { useRef } from 'react';
import "./LoginPage.css"

const LoginPage = () => {

    const button_ref = useRef(null);

    const RegistrationClick = () => {
        console.log("DUPA");
        console.log(document.getElementById("switcher").style);

        if (button_ref != null) {
            console.log("DUPA2");
            console.log(button_ref.current.style);
            button_ref.current.style.left = '2%';
        }
    }

    return (
        <section className='LoginPage_wrapper'>
            <div className='LoginPage_isnald'>
                <div className='LoginPage_login'>
                    <h2>Login</h2>
                    <p>Jeśli posiadasz konto, możesz się zalogować</p>
                    
                    <form className='LoginPage_Loginform'>
                        <div>
                            <label>Email</label>
                            <input type='email' placeholder='adres email'/>
                        </div>

                        <div>
                            <label>Hasło</label>
                            <input type='password' placeholder='hasło'/>
                        </div>

                        <div>
                            <a>Zapomniałeś hasło?</a>
                        </div>

                        <button type="submit" className='LoginPage_LoginButton'>
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
                    Dupa
                </div>
                <div ref={button_ref} className='LoginPage_switcher' id='switcher'> 
                    TO JEST TYLKO W CELACH TESTOWYCH 
                </div>
            </div>
        </section>
    )
}

export default LoginPage;