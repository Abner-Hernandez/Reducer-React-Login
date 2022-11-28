import React from "react";
import Usuario from "../clases/usuario";

export const initialState = new Usuario('', '', '',false);

const UsuarioContext = React.createContext<{
    state: Usuario;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });

export { UsuarioContext as default }