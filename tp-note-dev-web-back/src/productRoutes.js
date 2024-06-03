//Ce fichier permet de créer les routes pour pouvoir utiliser les fonctions créer dans le controleur 
const express = require('express')

//On créee la route principal pour le produit 
const router = express.Router()

//On importe les fonctions du controleur de produit 
const  {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('./productController.js')

//On asssocie les fonction à une route en précisant le type de requête 
router.get('/', getProducts)

router.get('/:productID', getProduct)

router.post('/', createProduct)

router.put('/:productID', updateProduct)

router.delete('/:productID', deleteProduct)

//On exporte la route principale 
module.exports = router