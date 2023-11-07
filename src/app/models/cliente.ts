export interface Usuario {
    id?: number,
    email: string,
    password: string,

}
export interface Cliente {
    id?: number;
    usuario?: Usuario;
    nombre: string;
    bio: string,
    nacimiento: Date
}
