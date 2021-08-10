import Mongoose from "mongoose";

let Schema = Mongoose.Schema;

let product = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    imagen: {
        type: String,
    },
    cantidad: {
        type: Number,
        required: [true, 'la cantidad es necesaria']
    },
    disponible: {
        type: Boolean
    }
});

export default Mongoose.model('Products', product);