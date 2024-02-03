import mongoose from "mongoose";

const productsCollection = "products";

// Verifica si el modelo ya está definido
let Products;

if (mongoose.models[productsCollection]) {
    // El modelo ya está definido, no lo definas nuevamente.
    Products = mongoose.model(productsCollection);
} else {
    // Define el modelo solo si aún no está definido.
    const productsSchema = new mongoose.Schema({
        description: { type: String, max: 100 },
        image: { type: String, max: 100 },
        price: { type: Number },
        stock: { type: Number },
        category: { type: String, max: 50 },
        availability: { type: String, enum: ['in_stock', 'out_of_stock'] },
        owner: { type: String, max: 70 }
    });

    Products = mongoose.model(productsCollection, productsSchema);
}

export default Products;
