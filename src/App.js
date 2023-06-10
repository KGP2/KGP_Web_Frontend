import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// my components
import LoginPage from './components/Login/LoginPage';
import HomeUser from './components/HomeUser/HomeUser';
import HomeOrganizer from './components/HomeOrganizer/HomeOrganizer';
import CreateEvent from './components/CreateEvent/CreateEvent';

// my hooks
import useToken from './useToken';

function App() {

    const { token, setToken } = useToken();

    return (
        <BrowserRouter>
            <Routes>
                {!token ?
                    <>
                        <Route path="/" element={<LoginPage setToken={setToken} />} />
                        <Route path="*" element={<Navigate to='/' />} />
                    </> :
                    <>
                        isTokenClient(token) ?
                        <>
                            <Route path="/home" element={<HomeUser setToken={setToken} />} />
                            <Route path="*" element={<Navigate to='/home' />} />
                        </> :
                        <>
                            <Route path="/homeOrganizer" element={<HomeOrganizer setToken={setToken} />} />
                            <Route path="/createEvent" element={<CreateEvent setToken={setToken} />} />
                            <Route path="*" element={<Navigate to='/homeOrganizer' />} />
                        </>
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
