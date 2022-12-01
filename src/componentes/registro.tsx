import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import usuarioContext from '../context/usuarioContext';
import { useNavigate } from 'react-router-dom';
import Usuario from '../clases/usuario';

const Registro = () => {
    const navigate = useNavigate();
    const usuario = useContext(usuarioContext);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const valoresPorDefecto = {
        nombre: '',
        correoElectronico: '',
        password: '',
        confirmarPassword: '',
        aceptaPoliticas: false
    }
    const [ingreso, setIngreso] = useState(false);

    useEffect(() => {
        if(usuario.state.conectado){
            navigate('/inicio')
        }
        setIngreso(false);
    }, [ingreso])

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: valoresPorDefecto });

    const onSubmit = async (data: any) => {
        if(data.password !== data.confirmarPassword) {
            return;
        }
        await usuario.dispatch({type: 'registrarse', correoElectronico: data.correoElectronico, nombre: data.nombre, password: data.password});
        let usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios")!) || new Array<Usuario>();
        usuarios.push(new Usuario(data.correoElectronico, data.nombre, data.password, true));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        setMostrarMensaje(true);
        reset();
        setIngreso(true);
    };

    const getFormErrorMessage = (nombre: keyof typeof errors) => {
        return errors[nombre] && <small className="p-error">{errors[nombre]?.message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setMostrarMensaje(false)} /></div>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Reglas de Contraseña</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-login">
            <Dialog visible={mostrarMensaje} onHide={() => setMostrarMensaje(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registro Exitoso!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Su cuenta está registrada a nombre <b>{usuario.state.nombre}</b> ;
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Registro de Usuario</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="nombre" control={control} rules={{ required: 'El nombre para el usuario es obligatorio.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="nombre" className={classNames({ 'p-error': errors.nombre })}>Nombre de Usuario*</label>
                            </span>
                            {getFormErrorMessage('nombre')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="correoElectronico" control={control}
                                    rules={{ required: 'El correo electrónico es obligatorio.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Ingrese un correo valido. Ejemplo: correo@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="correoElectronico" className={classNames({ 'p-error': !!errors.correoElectronico })}>Correo Electrónico*</label>
                            </span>
                            {getFormErrorMessage('correoElectronico')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'La contraseña es obligatoria.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} footer={passwordFooter} 
                                    promptLabel="Ingrese una Contraseña" weakLabel="Debil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Contraseña*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="confirmarPassword" control={control} rules={{ required: 'La confirmación de la contraseña es obligatoria.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} footer={passwordFooter} 
                                    promptLabel="Ingrese una Contraseña" weakLabel="Debil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                )} />
                                <label htmlFor="confirmarPassword" className={classNames({ 'p-error': errors.password })}>Confirmar Contraseña*</label>
                            </span>
                            {getFormErrorMessage('confirmarPassword')}
                        </div>
                        <div className="field-checkbox">
                            <Controller name="aceptaPoliticas" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="aceptaPoliticas" className={classNames({ 'p-error': errors.aceptaPoliticas })}>Estoy de acuerdo con los términos y condiciones*</label>
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                    <Button className="p-button-link" label='Ya tiene cuenta, ingrese!' onClick={() => {
                        navigate('/ingreso')
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Registro;