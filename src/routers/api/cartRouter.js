import express from 'express';
import CartManager from '../../dao/cartManager.js';

const router = express.Router();

router.post('/carts', async (req, res) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get('/carts/:cid', async (req, res) => {
    try {
      const { params: { cid } } = req;
      const cart = await CartManager.getCart(cid);
      res.render('cart', { cart });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

router.post('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { params: { cid, pid } } = req;
    const { quantity } = req.body;
    await CartManager.addProductToCart(cid, pid, quantity);
    res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.put('/carts/:cid', async (req, res) => {
  try {
    const { params: { cid }, body } = req;
    await CartManager.updateCart(cid, body);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.put('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { params: { cid, pid }, body } = req;
    const { quantity } = body;
    await CartManager.updateProductInCart(cid, pid, quantity);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { params: { cid, pid } } = req;
    await CartManager.deleteProductFromCart(cid, pid);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/carts/:cid', async (req, res) => {
  try {
    const { params: { cid } } = req;
    await CartManager.deleteCart(cid);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
