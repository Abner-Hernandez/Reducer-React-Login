import Usuario from "../clases/usuario";

const usuarioReducer = (state: Usuario, action: { type: string, correoElectronico: string, nombre: string, password: string }) => {
    switch (action.type) {
        case 'registrarse':
            state = new Usuario(action.correoElectronico, action.nombre !== undefined ? action.nombre : '', action.password !== undefined ? action.password : '', true);
            return state;
        case 'conectarse':
            // Primero verificar credenciales con el endpoint de login -- Temporalemente se utilizara el localstorage
            let usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios")!);
            state = usuarios.filter(usuario => usuario.correoElectronico === action.correoElectronico && usuario.password === action.password)[0]
            return state;
        case 'desconectarse':
            state.conectado = false;
            return state;
        case 'obtenerUsuario':
            return state;
        default:
            return state
    }
}

export { usuarioReducer as default }