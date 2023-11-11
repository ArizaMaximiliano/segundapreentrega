import Cart from '../models/cartModel.js';
import { Exception } from '../utils.js';

export default class CartManager {
  static async createCart() {
    const newCart = await Cart.create({});
    console.log('Carrito creado correctamente.');
    return newCart;
  }

  static async getCart(cartId) {
    const cart = await Cart.findById(cartId).populate('products.product');
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }
    return cart;
  }

  static async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }

    const existingProduct = cart.products.find((product) => product.product._id.equals(productId));

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    console.log('Producto agregado al carrito correctamente.');
    return cart;
  }

  static async updateCart(cartId, updatedCart) {
    const cart = await Cart.findByIdAndUpdate(cartId, updatedCart, { new: true });
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }
    console.log('Carrito actualizado correctamente.');
    return cart;
  }

  static async updateProductInCart(cartId, productId, updatedQuantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }

    const existingProduct = cart.products.find((product) => product.product._id.equals(productId));

    if (existingProduct) {
      existingProduct.quantity = updatedQuantity;
    } else {
      throw new Exception('Producto no encontrado en el carrito', 404);
    }

    await cart.save();
    console.log('Cantidad del producto en el carrito actualizada correctamente.');
    return cart;
  }

  static async deleteProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }

    cart.products = cart.products.filter((product) => !product.product._id.equals(productId));
    await cart.save();
    console.log('Producto eliminado del carrito correctamente.');
    return cart;
  }

  static async deleteCart(cartId) {
    const cart = await Cart.findByIdAndRemove(cartId);
    if (!cart) {
      throw new Exception('Carrito no encontrado', 404);
    }
    console.log('Carrito eliminado correctamente.');
    return cart;
  }
}
