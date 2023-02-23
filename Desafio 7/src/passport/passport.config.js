import bcrypt from 'bcrypt';
import passport from 'passport';
import GithubStrategy from 'passport-github2';
import local from 'passport-local';
import usersModel from '../dao/models/users.model.js';


const LocalStrategy = local.Strategy;

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


const comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};


const initializePassport = () => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, age } = req.body;
            const user = await usersModel.findOne({ 'email': email });
            if (user) return done(null, false, { message: 'El email ya existe' });
            const newUser = {
                first_name,
                last_name,
                email,
                password: encryptPassword(password),
                age
            };
            await usersModel.create(newUser);
            done(null, newUser);
        } catch (err) {
            return done(err);
        }   
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await usersModel.findOne({ email: email });
            if (!user) return done(null, false, { message: 'Usuario no encontrado' });
            if (!comparePassword(user, password)) return done(null, false, { message: 'Contraseña incorrecta' });
            done(null, user);
        } catch(err) {
            return done(err);
        }
    }));
};


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


export default initializePassport;