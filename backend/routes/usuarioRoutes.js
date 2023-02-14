import express from 'express';
const router = express.Router();

import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';

import checkAuth from '../middleware/checkAuth.js';

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar) //Crea un nuevo usuario - Registro
router.post('/login', autenticar) //Autenticación - Login
router.get('/confirmar/:token', confirmar) //Confirmar cuenta
router.post('/olvide-password', olvidePassword) //Enviar reestablecimiento de cuenta

// router.get('/olvide-password/:token', comprobarToken)
// router.post('/olvide-password/:token', nuevoPassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil', checkAuth, perfil) //Verificamos que el usuario esta autenticado para que pueda ir al siguiente middleware que es perfil

export default router;