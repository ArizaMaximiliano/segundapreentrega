import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  products: [ProductSchema]
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
