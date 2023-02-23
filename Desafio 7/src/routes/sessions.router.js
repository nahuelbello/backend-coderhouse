import passport from 'passport';
import { Router } from 'express';


const sessionsRouter = Router();


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
};


// Vista de registro.
sessionsRouter.get('/signup', (req, res) => {
    res.render('signup');
});


// Crea un usuario.
sessionsRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/api/sessions/profile',
    failureRedirect: '/signup',
    failureFlash: true
})); 


// Vista de login.
sessionsRouter.get('/login', (req, res) => {
    res.render('login');
});


// Proceso de login.
sessionsRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/realtimeproducts',
    failureRedirect: '/login',
    failureFlash: true
}));


// Vista de perfil.
sessionsRouter.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});


// Cierra la sesion.
sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(401).send(err);
        res.redirect('/');
    });
});


export default sessionsRouter;