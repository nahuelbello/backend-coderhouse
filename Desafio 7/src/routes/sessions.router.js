import { Router } from 'express';
import UsersModel from '../dao/models/users.model.js';


const sessionsRouter = Router();


// Vista de registro.
sessionsRouter.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/api/sessions/profile');
    res.render('register');
});


// Vista de login.
sessionsRouter.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/api/sessions/profile');
    res.render('login');
});


// Vista de perfil.
sessionsRouter.get('/profile', async (req, res) => {
    if (req.session.user === undefined) return res.redirect('/api/sessions/login');
    const user = await UsersModel.findOne({ email: req.session.user });
    const profile = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        admin: req.session.admin,
        rol: req.session.rol
    }
    res.render('profile', profile);
});


// Cierra la sesion.
sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(401).send(err);
        res.redirect('/api/sessions/login');
    });
});


// Crea un usuario.
sessionsRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body;
        req.session.first_name = user.first_name,
        req.session.last_name = user.last_name,
        req.session.user = email
        req.session.admin = false;
        req.session.rol = 'user';
        await UsersModel.create({ first_name, last_name, email, age, password });
        res.redirect('/api/sessions/profile');
    } catch (err) {
        res.status(500).send(err);
    }
});


// Proceso de login.
sessionsRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.first_name = 'Coder',
            req.session.last_name = 'House',
            req.session.user = email;
            req.session.admin = true;
            req.session.rol = 'admin';
            return res.redirect('/realtimeproducts');
        }
        const user = await UsersModel.findOne({ email: email, password: password });
        if (user) {
            req.session.first_name = user.first_name,
            req.session.last_name = user.last_name,
            req.session.user = email;
            req.session.admin = false;
            req.session.rol = 'user';
            return res.redirect('/realtimeproducts');
        }
        res.status(500).send(err);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default sessionsRouter;