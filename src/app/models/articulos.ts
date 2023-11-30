export interface Articulo {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    dimensiones: string;
    foto: string;
    descripcion: number;
    caracteristicas: Caracteristica[]
}
export interface Caracteristica {
    id: number;
    nombre: string;   
}