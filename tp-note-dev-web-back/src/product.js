//On importe mangoose permettant d'agir avec la base de données
const mongoose = require('mongoose')

//On créee la table pour le produit avec le nom du produit, le prix et les détails
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    desc:  {type: String, require: true}
})

//On créee le modèle Porduct 
const Product = mongoose.model('Product', ProductSchema)

//On l'exporte
module.exports = Product

