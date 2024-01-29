import { Router } from 'express';
import express from 'express';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { nanoid } from 'nanoid'
import { AddUser, DeleteUser, GetUserByAuth, GetUsers, GetUserByKey, UpdateUser, UpdateUserLevel, UpdateUserKey } from '../controller/user.js';
import { GetPokemons, GetPokemon, GetPokemonByType } from '../controller/pokemon.js';
import { GetAtack, GetAtackByName, GetAtacks, GetAttacksByType } from '../controller/atacks.js';

const router = express.Router();
let userProfile;

router.get('/', (req, res) => {
    res.render('pages/auth');
});

router.get('/success', async (req, res) => {
    let userData = await GetUserByAuth(userProfile);
    if (!userData) {
        let apiKey = nanoid(10);
        const userAuthId = userProfile.id;
        const level = false;
        userData = await AddUser({ userAuthId, apiKey, level });
    }

    res.render('pages/success', { user: userProfile, data: userData });
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
    res.redirect("/success")
});

router.post('/updateUserKey', async (req, res) => {
    let apiKey = nanoid(10)
    let changes = await UpdateUserKey({ req, apiKey })
    let userData = await GetUserByAuth(userProfile)
    res.redirect("/success")
});

router.delete('/deleteUser', DeleteUser);

router.get('/getUserByAuth', GetUserByAuth);

router.get('/getPokemons', GetPokemons);

router.get('/api/:apiKey/:function/:subfunction/:param1', async (req, res) => {
    console.log(req.params.apiKey)
    let user = await GetUserByKey(req.params.apiKey)

    if (user != null) {
        if (req.params.function == "pokemon") {
            if (req.params.subfunction == "pokedex") {
                let pokemon = await GetPokemon(req.params.param1);
                if (pokemon) res.json(pokemon)
                else res.json("No existe ese pokemon")
            } else if (req.params.subfunction == "type" && user.level == 1) {
                let pokemons = await GetPokemonByType(req.params.param1);
                if(pokemons.length != 0) res.json(pokemons)
                else res.json("No existe ese tipo de pokemon")
            } else {
                res.json("No existe esa característica en pokemon o no tienes los permisos necesarios para hacer la petición")
            }
        } else if (req.params.function == "attack"){
            if(req.params.subfunction == "nombre"){
                let attack = await GetAtackByName(req.params.param1);
                if(attack) res.json(attack);
                else res.json("No existe ese ataque");
            } else if (req.params.subfunction == "type" && user.level == 1){
                let attacks = await GetAttacksByType(req.params.param1);
                if(attacks.length != 0) res.json(attacks);
                else res.json("No existe ese tipo de ataque")
            } else {
                res.json ("No existe esa carácterística de los ataques o no tienes los permisos necesarios para hacer la petición")
            }
        }
    } else {
        res.json("ApiKey no valida");
    }
});

export default router;