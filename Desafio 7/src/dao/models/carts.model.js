import { Schema, model } from 'mongoose';


const cartsSchema = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'products' },
                quantity: { type: String, default: 1 }
            }
        ]
    },
    { versionKey: false }
);

cartsSchema.pre('findOne', () => {
    this.populate('products.product');
});


module.exports = model('carts', cartsSchema);