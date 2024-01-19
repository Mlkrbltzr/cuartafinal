//messages.model.js
// Importa el módulo mongoose para la interacción con MongoDB
import mongoose from "mongoose";

// Define el nombre de la colección en la base de datos
const messagesCollection = "messages";

// Define el esquema del mensaje
const messageSchema = new mongoose.Schema({
  // Nombre del usuario que envía el mensaje, un texto con un máximo de 100 caracteres, es requerido
  user: { type: String, max: 100, required: true },

  // Contenido del mensaje, un texto con un máximo de 300 caracteres, no es requerido
  message: { type: String, max: 300, required: false },
});

// Crea un modelo de mongoose para la colección de mensajes utilizando el esquema definido
const messageModel = mongoose.model(messagesCollection, messageSchema);

// Exporta el modelo del mensaje para su uso en otras partes de la aplicación
export { messageModel };
