export interface Mensaje{
   id_conversacion: string,
   prompt: string,
   respuesta: string,
   timestamp: Date
}

export interface Conversacion{
   id: string,
   id_usuario: string,
   fecha_inicio: Date,
   asistente: string

}