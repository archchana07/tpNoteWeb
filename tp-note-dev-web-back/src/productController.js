//
//On importe le modèle produit 
const Product = require('./product.js')

//Fonction pour obtenir les produits 
const getProducts = ((req, res) => {
    Product.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

//Fonction pour obtenir pour obtenir un produit par son id  
const getProduct = ((req, res) => {
    Product.findOne({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Product not found'}))
})

//Fonction pour créer un produit 
const createProduct = ((req, res) => {
    Product.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

//Fonction pour mettre à jour un produit 
const updateProduct = ((req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

//Fonction pour supprimer un produit
const deleteProduct = ((req, res) => {
    Product.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

//On exporte les fonctions 
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
