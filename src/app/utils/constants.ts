export type SortDirection = 'asc' | 'desc' | '';
export const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export const isPlural = (value) => value > 1;
export const tipoArchivoPermitidoIMG = 'image/png,image/jpg,image/jpeg,image/tiff';
export const tipoArchivoPermitido = 'application/pdf';
export const tamanioMaximoCargaAdjuntoKb = 2000;
export const listaTipoPersona = [
    {
        id: 1,
        name: 'Persona natural'
    },
    {
        id: 2,
        name: 'Persona jurídica'
    }
];