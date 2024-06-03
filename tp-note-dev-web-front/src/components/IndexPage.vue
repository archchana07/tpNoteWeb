<template>
    
    
    <div class="IndexPage">
        <br>
        <div class="row">
            
            <div class="jumbotron custom-banner">
                <h1 class="display-4">VueJS Shopping App</h1>
            </div>

            <!-- Formulaire pour ajouter des produits -->
            <div class="col-md-12">
                <div class="p-3 border bg-light">
                    <h5>Ajouter un nouveau produit</h5>
                    <form @submit.prevent="addNewProduct">
                        <div class="mb-3">
                            <label for="productName" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="productName" v-model="newProduct.name" required>
                        </div>
                        <div class="mb-3">
                            <label for="productDesc" class="form-label">Description</label>
                            <input type="text" class="form-control" id="productDesc" v-model="newProduct.desc" required>
                        </div>
                        <div class="mb-3">
                            <label for="productPrice" class="form-label">Prix</label>
                            <input type="number" class="form-control" id="productPrice" v-model="newProduct.price" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </form>
                </div>
            </div>

            <!--La liste des produits -->
            <div class="col-md-9">
                <div class="row gx-4 gy-4 row-cols-3">
                    <div class="col" v-for="(product, id) in products" :key="id">
                        <div class="p-3 border bg-light">
                            <h5>{{ product.name }}</h5>
                            <p>{{ product.desc }}</p>
                            <p>{{ product.price }} </p>
                            <button type="button" class="btn btn-success btn-sm" @click="add_to_cart(product._id)"> Ajouter au panier </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Panier -->
            <div class="col-6 col-md-3">
                <div class="col">
                    <div class="p-3 border bg-success">
                        <h5>Cart </h5>
                    </div>
                </div>
                <div class="row gx-4 row-cols-1">
                    <div class="col" v-for="(value, id) in list_cart" :key="id">
                        <div class="p-3 border bg-light">
                            <h5>{{value.product.name}}</h5>
                            <h6>Quantity : {{value.quantity}}</h6>
                            <button type="button" class="btn btn-danger btn-sm" @click="remove_from_cart(value.product._id)"> Supprimer </button>
                        </div>
                    </div>
                    <!-- Montant total  -->
                    <div class="col">
                        <div class="p-3 border bg-success">
                            <h5>Total : {{total_price}} </h5>
                            <h6>Nombre de produits : {{nbr_product}} </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'IndexPage',
    props: {
        msg: String
    },
    data() {
        return {
            products: [],
            list_cart: [],
            total_price: 0,
            nbr_product: 0,
            error: null,
            newProduct: {
                name: '',
                desc: '',
                price: 0
            }
        };
    },
    created() {
        this.fetchProducts();
        this.fetchCart();
    },
    methods: {
        //Fonction permettant de récupérer ou ajouter des éléments via le server
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3004/api/products/');
                this.products = response.data.result;
                console.log(this.products);
            } catch (error) {
                this.error = 'Failed to fetch products.';
            }
        },

        async fetchCart() {
            try {
                const response = await axios.get('http://localhost:3004/api/carts/');
                this.list_cart = response.data.cart.products;
                await this.update_total();
            } catch (error) {
                this.error = 'Failed to fetch cart.';
            }
        },

        async add_to_cart(id) {
            try {
                const response = await axios.post(`http://localhost:3004/api/carts/add/${id}`);
                this.list_cart = response.data.cart.products;
                await this.update_total();
            } catch (error) {
                this.error = 'Failed to add to cart.';
            }
        },

        async update_total() {
            try {
                const response = await axios.get('http://localhost:3004/api/carts/summary');
                this.total_price = response.data.total_price;
                this.nbr_product = response.data.nbr_product;
            } catch (error) {
                this.error = 'Failed to update cart total.';
            }
        },

        async remove_from_cart(id) {
            try {
                const response = await axios.post(`http://localhost:3004/api/carts/remove/${id}`);
                this.list_cart = response.data.cart.products;
                await this.update_total();
            } catch (error) {
                this.error = 'Failed to remove from cart.';
            }
        },

        async addNewProduct() {
            try {
                const response = await axios.post('http://localhost:3004/api/products', this.newProduct);
                this.products.push(response.data.result);
                this.newProduct = { name: '', desc: '', price: 0 }; // Reset form fields
            } catch (error) {
                this.error = 'Failed to add new product.';
            }
        }
    }
};
</script>

<style scoped>
.custom-banner {
    background-color: #f2f2f2;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
}
</style>
