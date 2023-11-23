export interface Municipio {
    id?: string;
    nombre: string;
    provincia: string;
  }
  

export interface DetallePrediccion {
  id?: number;
  fecha: Date;
  nombre: string;
  valor: string;
  periodo: string;
  descripcion: string;
  hora: number;
  velocidad: number;
  direccion: string;
}
