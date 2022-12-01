import { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useNavigate } from "react-router-dom";
import usuarioContext from '../context/usuarioContext';

const Login = () => {
    const navigate = useNavigate();
    const usuario = useContext(usuarioContext);
    const valoresPorDefecto = {
        correoElectronico: '',
        password: '',
    };

    useEffect(() => {
        if(usuario.state.conectado){
            navigate('/inicio')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario.state])


    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: valoresPorDefecto });

    const onSubmit = async (data: any) => {
        await usuario.dispatch({ type: 'conectarse', correoElectronico: data.correoElectronico, password: data.password });
        reset();
    };

    const getFormErrorMessage = (nombre: keyof typeof errors) => {
        return errors[nombre] && <small className="p-error">{errors[nombre]?.message}</small>
    };

    return (
        <div className="form-login">
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Registro de Usuario</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="correoElectronico" control={control}
                                    rules={{ required: 'El correo electrónico es obligatorio.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Ingrese un correo valido. Ejemplo: correo@email.com' } }}
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
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} 
                                    promptLabel="Ingrese una Contraseña"/>
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Contraseña*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                    <Button className="p-button-link" label='No tiene cuenta, Registrese!' onClick={() => {
                        navigate('/registro')
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Login;