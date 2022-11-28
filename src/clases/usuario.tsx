export default class Usuario{
    correoElectronico: string;
    nombre: string;
    password: string;
    conectado: boolean;

    constructor(correoElectronico: string, nombre: string, password: string, conectado: boolean){
        this.correoElectronico = correoElectronico;
        this.nombre = nombre;
        this.password = password;
        this.conectado = conectado !== undefined ? conectado : false;
    }
}