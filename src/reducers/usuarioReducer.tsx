import Usuario from "../clases/usuario";

const usuarioReducer = (state: Usuario, action: { type: string, correoElectronico: string, nombre: string, password: string }) => {
    switch (action.type) {
        case 'registrarse':
            return new Usuario(action.correoElectronico, action.nombre !== undefined ? action.nombre : '', action.password !== undefined ? action.password : '', true);
        case 'conectarse':
            // Primero verificar credenciales con el endpoint de login -- Temporalemente se utilizara el localstorage
            let usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios")!);
            return usuarios.filter(usuario => usuario.correoElectronico === action.correoElectronico && usuario.password === action.password)[0]
        case 'desconectarse':
            return new Usuario("","","",false);
        default:
            return state
    }
}

export { usuarioReducer as default }