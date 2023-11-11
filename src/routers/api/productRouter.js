import express from 'express';
import ProductManager from '../../dao/productManager.js';

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 10, category, availability, sort, query } = req.query;
        const criteria = {};

        if (query) {
            criteria.$text = { $search: query };
        } else {
            if (category) {
                criteria.category = category;
            }
            if (availability !== undefined) {
                criteria.availability = availability;
            }
        }

        const options = { page, limit, sort: { price: sort === 'desc' ? -1 : 1 } };
        const result = await ProductManager.getProductsPaginated(criteria, options);

        res.render('products', buildResponse(result, req));
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

const buildResponse = (data, req) => {
    const { page, limit, category, availability, sort } = req.query;
    return {
      status: 'success',
      payload: data.docs.map(product => product.toJSON()),
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.hasPrevPage
        ? `http://localhost:8080/products?limit=${limit}&page=${data.prevPage}${category ? `&category=${category}` : ''}${availability !== undefined ? `&availability=${availability}` : ''}${sort ? `&sort=${sort}` : ''}`
        : null,
      nextLink: data.hasNextPage
        ? `http://localhost:8080/products?limit=${limit}&page=${data.nextPage}${category ? `&category=${category}` : ''}${availability !== undefined ? `&availability=${availability}` : ''}${sort ? `&sort=${sort}` : ''}`
        : null,
    };
  };

router.get('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        const product = await ProductManager.getProductByID(pid);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.post('/products', async (req, res) => {
    try {
        const product = req.body;
        const addedProduct = await ProductManager.addProduct(product);
        res.status(201).json({ message: 'Producto agregado correctamente', product: addedProduct });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.put('/products/:pid', async (req, res) => {
    try {
        const { params: { pid }, body } = req;
        await ProductManager.updateProduct(pid, body);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.delete('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        await ProductManager.deleteProduct(pid);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default router;
