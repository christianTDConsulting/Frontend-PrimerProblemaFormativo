export interface Log {
  
    id: number;
    fecha: Date;
    email: string;
    exito: boolean;
    ip_address: string;
}

export interface Bloqueo {
    id: number;
    ip_address: string;
    fecha_hasta: Date;

}
