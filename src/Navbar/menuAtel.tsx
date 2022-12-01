import { useContext, useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { SlideMenu } from 'primereact/slidemenu';
import { useNavigate } from "react-router-dom";
import usuarioContext from '../context/usuarioContext';
import ItemMenu from '../clases/itemMenu';

const MenuAtel = () => {
    const navigate = useNavigate();
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [items, setItenms]: any = useState([]);
    const usuario = useContext(usuarioContext);

    useEffect(() => {
        //Aqui obtenemos los menus y submenus ejemplo se usara un arreglo
        const menus = [{ nombre: "Inicio", incluyeEnMenu: true }]
        setItenms(obtenerMenus(menus));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const obtenerMenus = (menu: Array<any>): Array<ItemMenu> => {
        return menu.length > 0 ? menu.map((item) => {
            let itemMenu: ItemMenu = new ItemMenu(item.nombre);
            if (item.items && item.items.length > 0) {
                itemMenu.items = obtenerMenus(item.items);
            }
            if (item.incluyeEnMenu) {
                itemMenu.command = () => {
                    navigate("/" + item.nombre.replace(' ', '').toLowerCase());
                    setVisibleMenu(false);
                }
            }
            return itemMenu;
        }) : new Array<ItemMenu>();
    }

    const inicio = <Button type="button" onClick={async (e) => {
        await usuario.dispatch({ type: "desconectarse" });
        navigate("/ingreso");
    }} icon="pi pi-fw pi-power-off" className="p-button-rounded p-button-secondary" style={{ marginRight: '.25em' }} />;
    const final = <Button type="button" onClick={(e) => setVisibleMenu(true)} icon="pi pi-th-large" className="p-button-rounded p-button-secondary" style={{ marginRight: '.25em' }} />;

    return (
        <div className="card">
            <Menubar start={final} end={inicio} />
            <Sidebar visible={visibleMenu} onHide={() => setVisibleMenu(false)}>
                <SlideMenu model={items} menuWidth={175} style={{ border: "none", width: "100%" }} backLabel="Regresar" baseZIndex={100}></SlideMenu>
            </Sidebar>
        </div>
    );
}

export default MenuAtel;