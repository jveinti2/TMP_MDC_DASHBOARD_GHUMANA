export interface IUsuario {
  cs_id_usuario: number;
  cedula: number;
  email: string;
  nombre_usuario: string;
  cargo: string;
  c_centro_operacion: string;
  d_centro_operacion: string;
  foto_usuario: string;
  iat: Date;
  exp: Date;
  array_option_access: number[];
}
