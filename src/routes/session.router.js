//session.router.js
import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils.js';

const router = express.Router();

// Ruta para iniciar sesión con GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { });

// Ruta de retorno después de la autenticación de GitHub
router.get("/api/sessions/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
    if (req.isAuthenticated()) {
        const token = generateToken(req.user);
        console.log("Token generado:", token);
        req.session.user = req.user;
        // Establecer las variables de sesión según lo necesites
        req.session.nombreUsuario = req.user.nombre;
        /* req.session.apellidoUsuario = req.user.last_name; */
        req.session.email = req.user.email;
        res.redirect("/allproducts");
    } else {
        res.redirect("/login");
    }
});

export default router;
