import { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from '../componentes/inicio';
import Login from '../componentes/login';
import Registro from '../componentes/registro';
import RequireAuth from '../componentes/requireAuth';
import UsuarioContext, { initialState } from '../context/usuarioContext';
import MenuAtel from '../Navbar/menuAtel';
import usuarioReducer from '../reducers/usuarioReducer';

const AppRouter = () => {
    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    return (
        <UsuarioContext.Provider value={{ state, dispatch }}>
            <Router>
                {state.conectado ?
                    <MenuAtel />
                    : null
                }
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/ingreso" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/inicio" element={
                        <RequireAuth>
                            <Inicio />
                        </RequireAuth>
                    } />
                    <Route element={<Login />} />
                </Routes>
            </Router>
        </UsuarioContext.Provider>
    )
};

export default AppRouter;
//<Route element={<ErrorPage />} />