import React, { useState } from 'react'
import { useRef } from 'react';
import "./LoginPage.css"

const LoginPage = () => {

    const reg_button_ref = useRef(null);
    const [tryLogin, setTryLogin] = useState(true); 

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

                        <div id='RememberPassword'>
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
                    <h2>Rejestracja</h2>

                    <form className='LoginPage_Loginform'>
                        <div>
                            <label>Imię</label>
                            <input type='text' placeholder='imię'/>
                        </div>
                        <div>
                            <label>Nazwisko</label>
                            <input type='text' placeholder='nazwisko'/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type='email' placeholder='adres email'/>
                        </div>
                        <div>
                            <label>Hasło</label>
                            <input type='password' placeholder='hasło'/>
                        </div>
                        <div>
                            <label>Rejestruję się jako</label>
                            <select>
                                <option></option>
                                <option>Zwykła osoba</option>
                                <option>Organizator</option>
                            </select>
                        </div>
                        <button type="submit" className='LoginPage_LoginButton' id='LoginPage_Register'>
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