//Ce fichier permet de définir les routes pour le panier 
//Avec express on construit le backend 
const express = require('express');

//On importe les fonctions du controleur pour le panier 
const { 
    getCart, 
    addToCart, 
    removeFromCart, 
    getCartSummary 
} = require('./cartController.js');

//On créee une route principal à partir du quelle on peut accèder aux fonctions 
const router = express.Router();
//on précise le type des requetes et on les associe aux focntions du controleur 
router.get('/', getCart);
router.post('/add/:id', addToCart);
router.post('/remove/:id', removeFromCart);
router.get('/summary', getCartSummary);

//On exporte la route principale 
module.exports = router;