import { Schema, model } from "mongoose";


const cartsCollection = "carts";

const cartsSchema = new Schema(
    { 
        products: [
            { product: { type: Schema.Types.ObjectId, ref: "products" } }
        ],
        default: []
    },
    {
        versionKey: false
    }
);

const cartsModel = model(cartsCollection, cartsSchema);


export default cartsModel;