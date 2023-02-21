// Libraries - Frameworks
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';

// Routers
import chatRouter from './routes/chat.router.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';

// DAO
import { ProductManager } from './dao/dbManager.js';
import messagesModel from './dao/models/messages.model.js';
const productManager = new ProductManager();


// ENV
dotenv.config();
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9jlfml1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


// Server
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
const io = new Server(httpServer);


// Handlebars
app.set('views', './src/views/');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}));


// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'codigo-s3cr3t0',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: DB_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
}));


// Routes
app.use('/', viewsRouter);
app.use('/chat', chatRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);


// Database
mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, (err) => {
    if (err) {
        console.log('Error de conexion');
    } else {
        console.log('Conectado a la base de datos');
    }
});


// Sockets
io.on('connection', socket => {
    console.log('Cliente conectado');

    socket.on('client:addProduct', async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            console.log(products)
            io.sockets.emit('server:addProduct', products);
        } catch (err) {
            throw (err);
        }
    });

    socket.on('client:deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(id);
            const products = await productManager.getProducts();
            io.sockets.emit('server:deleteProduct', products);
        } catch (err) {
            throw (err);
        }
    });

    socket.on('client:newMessage', async (data) => {
        try {
            await messagesModel.create(data);
            const messages = await messagesModel.find().lean();
            io.sockets.emit('server:newMessage', messages);
        } catch (err) {
            throw (err);
        }
    });

    socket.on('client:newUser', async (data) => {
        try {
            socket.user = data.user;
            socket.id = data.id;
            io.sockets.emit('server:newUser', {
                user: socket.user,
                id: socket.id
            });
        } catch (err) {
            throw (err);
        }
    });
});