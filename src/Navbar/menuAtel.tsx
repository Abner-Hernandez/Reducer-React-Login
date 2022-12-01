import { useContext, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { SlideMenu } from 'primereact/slidemenu';
import { useNavigate } from "react-router-dom";
import usuarioContext from '../context/usuarioContext';

const MenuAtel = () => {
    const navigate = useNavigate();
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [items, setItenms]: any = useState([]);
    const usuario = useContext(usuarioContext);

    const inicio = <Button type="button" onClick={async (e) => {
        await usuario.dispatch({type: "desconectarse"});
        navigate("/ingreso");
    }} icon="pi pi-fw pi-power-off" className="p-button-rounded p-button-secondary" style={{marginRight:'.25em'}} />;
    const final = <Button type="button" onClick={(e) => setVisibleMenu(true)} icon="pi pi-th-large" className="p-button-rounded p-button-secondary" style={{marginRight:'.25em'}} />;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={final} end={inicio} />
                <Sidebar visible={visibleMenu} onHide={() => setVisibleMenu(false)}>
                    <SlideMenu model={items} menuWidth={175} style={{border: "none", width: "100%"}} backLabel="Regresar" baseZIndex={100}></SlideMenu>   
                </Sidebar>
            </div>
        </div>
    );
}

export default MenuAtel;