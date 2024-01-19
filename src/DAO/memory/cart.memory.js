// Define una clase CartMemory para manejar datos de carrito en memoria
export default class CartMemory {
  // Constructor de la clase
  constructor() {
    // Inicializa un array vacío para almacenar los datos del carrito
    this.data = [];
  }

  // Método get que devuelve los datos del carrito
  get() {
    return this.data;
  }
}
