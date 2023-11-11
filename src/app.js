import express from "express";
import handlebars from "express-handlebars";
import path from 'path';

import { __dirname } from './utils.js';

import productRouter from './routers/api/productRouter.js';
import cartRouter from './routers/api/cartRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    res.send('test')
})

app.use('/api', productRouter);
app.use('/api', cartRouter);

app.use((error, req, res, next) => {
    const message = `Ocurrio un error inesperado: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
})

export default app;