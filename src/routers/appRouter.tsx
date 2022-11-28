import { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../componentes/login';
import Registro from '../componentes/registro';
import UsuarioContext, { initialState } from '../context/usuarioContext';
import usuarioReducer from '../reducers/usuarioReducer';
//import Header from '../components/Header';
//import ErrorPage from "../error-page";

const AppRouter = () => {
    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    return (
        <UsuarioContext.Provider value={{state, dispatch}}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route element={<Login />} />
                </Routes>
            </Router>
        </UsuarioContext.Provider>
    )
};

export default AppRouter;
//<Route element={<ErrorPage />} />