import { Schema, model } from "mongoose";


const cartsCollection = "carts";

const cartsSchema = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "products" },
                quantity: { type: String, default: 1 }
            }
        ]
    },
    { versionKey: false }
);

cartsSchema.pre("findOne", function(){
    this.populate("products.product")
    
});

const cartsModel = model(cartsCollection, cartsSchema);


export default cartsModel;