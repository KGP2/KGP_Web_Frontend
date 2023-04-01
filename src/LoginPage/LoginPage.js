import React from 'react'
import "./LoginPage.css"

class LoginPage extends React.Component {



    render() {
        return (
        <section className='LoginPage_wrapper'>
            <div className='LoginPage_isnald'>
                <div className='LoginPage_login'>
                    <h2>Login</h2>
                    <p>Jeśli posiadasz konto, możesz się zalogować</p>
                    
                    <form className='LoginPage_Loginform'>
                        <div>
                            <label>Email</label>
                            <input type='email' placeholder='Wpisz adres email'/>
                        </div>

                        <div>
                            <label>Hasło</label>
                            <input type='password' placeholder='Wpisz hasło'/>
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
                        <p>Jeśli nie posiadasz kąta ... </p>
                        <button className='LoginPage_Button_Register'>Zarejestrój się</button>
                    </div>

                </div>

                <div className='LoginPage_Register'>
                    Dupa
                </div>

                <div className='LoginPage_switcher'> TO JEST TYLKO W CELACH TESTOWYCH </div>

            </div>
        </section>
        )
    }
}

export default LoginPage;