// Define una clase ProductMemory para manejar datos de productos en memoria
export default class ProductMemory {
  // Constructor de la clase
  constructor() {
    // Inicializa un array vacío para almacenar los datos de productos
    this.data = [];
  }

  // Método get que devuelve los datos de productos
  get() {
    return this.data;
  }
}
