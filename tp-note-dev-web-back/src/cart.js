//Ce fichier permet de créer le modèle pour le panier 
//On utilise mangoose pour se connecter à la base de données
const mongoose = require('mongoose')

//On ajoute l'entité CartSchema qui représente le panier, il contient une liste de produits et leur quantité  
const CartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

//On nomme le modèle Cart
const Cart = mongoose.model('Cart', CartSchema)

//On ajoute ce modèle à la base de données 
module.exports = Cart