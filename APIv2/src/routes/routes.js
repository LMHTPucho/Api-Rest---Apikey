import { Router } from 'express';
import express from 'express';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { nanoid } from 'nanoid'
import { AddUser, DeleteUser, GetUserByAuth, GetUsers, UpdateUser, UpdateUserLevel} from '../controller/user.js';

const router = express.Router();
let userProfile;

router.get('/', (req, res) => {
    res.render('pages/auth');
}); 

router.get('/success', async (req, res) => {
    let userData = await GetUserByAuth(userProfile);
    if(!userData){
        const apiKey = nanoid(10);
        const userAuthId = userProfile.id;
        const level = false;
        userData = await AddUser({userAuthId, apiKey, level});
    }

    res.render('pages/success', {user: userProfile, data: userData});
});

passport.use(new GoogleStrategy({
    clientID: '416624799089-epipe5ev08g3q3314t3biqflakqlg3kh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        userProfile = profile;
        let userId = profile.id; 
        return done(null, profile);
    } catch (error) {
        return done(error);
    }
}));

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta para manejar la respuesta de Google después de la autenticación
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Aquí puedes redirigir al usuario a una página de éxito u otra acción
        res.redirect('/success');
    }
);

router.post('/addUser', AddUser);

router.get('/getUsers', GetUsers);

router.put('/updateUser', UpdateUser);

// router.post('/updateUserLevel', UpdateUserLevel);

router.post('/updateUserLevel', async (req, res) => {
    let changes = await UpdateUserLevel(req)
    let userData = await GetUserByAuth(userProfile)
    res.json(userData)
    // res.render('pages/success', {user: userProfile, data: userData});
}); 

router.delete('/deleteUser', DeleteUser);

router.get('/getUserByAuth', GetUserByAuth);




export default router;