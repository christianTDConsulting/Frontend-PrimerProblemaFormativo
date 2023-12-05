export interface Mensaje{
   id_conversacion: number,
   prompt: string,
   respuesta: string,
   timestamp: Date
}

export interface Conversacion{
   id: number,
   id_usuario: number,
   fecha_inicio: Date,
   asistente: string

}