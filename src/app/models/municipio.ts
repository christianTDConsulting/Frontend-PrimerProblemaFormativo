export interface Municipio {
    id?: number;
    nombre: string;
    provincia: string;
  }
  

  export interface DetallePrediccion {
    id?: number;
    municipio_id: string;
    fecha: Date;
    nombre: string;
    valor: string;
    periodo: string;
    descripcion: string;
    hora: number;
    velocidad: number;
    direccion: string;
  }
  