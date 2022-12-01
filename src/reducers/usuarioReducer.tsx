import Usuario from "../clases/usuario";

const guardarSesion = (usuario: Usuario) => {
    sessionStorage.setItem("nombre", usuario.nombre);
    sessionStorage.setItem("correoElectronico", usuario.correoElectronico);
    sessionStorage.setItem("conectado", usuario.conectado.toString());
}

const usuarioReducer = (state: Usuario, action: { type: string, correoElectronico?: string, nombre?: string, password?: string }) => {
    let usuario: Usuario;
    switch (action.type) {
        case 'registrarse':
            usuario = new Usuario(action.correoElectronico || '', action.nombre || '', action.password || '', true);
            //guardamos la sessión
            guardarSesion(usuario);
            return usuario;
        case 'conectarse':
            // Primero verificar credenciales con el endpoint de login -- Temporalemente se utilizara el localstorage
            let usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios")!);
            usuario = usuarios.filter(usuario => usuario.correoElectronico === action.correoElectronico && usuario.password === action.password)[0]
            
            //guardamos la sessión
            guardarSesion(usuario);
            return usuario;
        case 'desconectarse':
            //limpiamos la sesión
            sessionStorage.clear();
            return new Usuario("","","",false);
        case 'restaurar_sesion':
            return new Usuario(action.correoElectronico || '', action.nombre || '', action.password || '', true);
        default:
            return state
    }
}

export { usuarioReducer as default }