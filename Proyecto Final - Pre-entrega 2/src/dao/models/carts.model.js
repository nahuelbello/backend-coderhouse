import { Schema, model } from "mongoose";


const cartsCollection = "carts";

const cartSchema = new Schema(
    { 
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    },
    { versionKey: false }
);

const cartsModel = model(cartsCollection, cartSchema);


export default cartsModel;